package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
	_ "github.com/lib/pq"
	"github.com/segmentio/kafka-go"
)

// FlightStatus represents the structure of flight status data
type FlightStatus struct {
	FlightNumber string `json:"flight_number"`
	Status       string `json:"status"`
	UpdateTime   string `json:"update_time"`
	Details      string `json:"details"`
}

// Upgrader configuration for websocket
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true // Allow connections from any origin
	},
}

// Kafka consumer function
func kafkaConsumer(ctx context.Context, messages chan<- string) {
	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers:   []string{"localhost:9092"}, // Adjust the broker address as needed
		GroupID:   "websocket-consumer-group",
		Topic:     "dbserver1.inventory.flight_updates",
		Partition: 0,
		MinBytes:  10e3, // 10KB
		MaxBytes:  10e6, // 10MB
	})
	defer r.Close()

	for {
		m, err := r.ReadMessage(ctx)
		if err != nil {
			log.Println("Error reading message:", err)
			close(messages)
			return
		}
		messages <- string(m.Value)
	}
}

// WebSocket handler for Kafka consumer
func wsKafkaHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Error upgrading to websocket:", err)
		return
	}
	defer conn.Close()

	messages := make(chan string)
	ctx := context.Background()

	go kafkaConsumer(ctx, messages)

	for msg := range messages {
		err = conn.WriteMessage(websocket.TextMessage, []byte(msg))
		if err != nil {
			log.Println("Error writing to websocket:", err)
			return
		}
	}
}

// Database connection function
func connectDB() (*sql.DB, error) {
	connStr := "user=postgres password=postgres dbname=postgres sslmode=disable host=localhost port=8001"
	return sql.Open("postgres", connStr)
}

// Fetch flight statuses from database
func fetchFlightStatuses(db *sql.DB) ([]FlightStatus, error) {
	rows, err := db.Query("SELECT flight_number, status, update_time, details FROM inventory.flight_updates")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var statuses []FlightStatus
	for rows.Next() {
		var status FlightStatus
		var updateTime time.Time
		err := rows.Scan(&status.FlightNumber, &status.Status, &updateTime, &status.Details)
		if err != nil {
			return nil, err
		}
		status.UpdateTime = updateTime.Format("2006-01-02 15:04:05")
		statuses = append(statuses, status)
	}
	return statuses, nil
}

// WebSocket handler for database queries
func wsDBHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Println("Error upgrading to websocket:", err)
			return
		}
		defer conn.Close()

		ticker := time.NewTicker(10 * time.Second)
		defer ticker.Stop()

		for {
			select {
			case <-ticker.C:
				statuses, err := fetchFlightStatuses(db)
				if err != nil {
					log.Println("Error fetching flight statuses:", err)
					continue
				}

				msgJSON, err := json.Marshal(statuses)
				if err != nil {
					log.Println("Error marshalling message to JSON:", err)
					continue
				}

				err = conn.WriteMessage(websocket.TextMessage, msgJSON)
				if err != nil {
					log.Println("Error writing to websocket:", err)
					return
				}
			}
		}
	}
}

func main() {
	// Database connection
	db, err := connectDB()
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}
	defer db.Close()

	// HTTP server with WebSocket handlers
	http.HandleFunc("/ws/kafka", wsKafkaHandler)
	http.HandleFunc("/ws/db", wsDBHandler(db))

	log.Println("Server started at :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
