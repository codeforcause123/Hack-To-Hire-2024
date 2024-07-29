import React, { useState, useEffect } from "react";
import useWebSocket from "./hooks/hook";
import FlightTable from "./components/FlightTable";
import ToastNotification from "./components/ToastNotification";
import "./App.css";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  const [kafkaMessage, setKafkaMessage] = useState<string | null>(null);
  const dbData = useWebSocket("ws://localhost:8080/ws/db");
  const kafkaData = useWebSocket("ws://localhost:8080/ws/kafka");

  useEffect(() => {
    if (kafkaData) {
      setKafkaMessage(`Kafka Update: ${JSON.stringify(kafkaData)}`);
    }
  }, [kafkaData]);

  return (
    <div className="App">
      <h1>Flight Status Updates</h1>
      <FlightTable data={dbData} />
      <ToastNotification message={kafkaMessage} />
      <Toaster />
    </div>
  );
};

export default App;
