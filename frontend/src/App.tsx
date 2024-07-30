import React, { useState, useEffect } from "react";
import useWebSocket from "./hooks/hook";
import FlightTable from "./components/FlightTable";
import ToastNotification from "./components/ToastNotification";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";
const App: React.FC = () => {
  const [kafkaMessage, setKafkaMessage] = useState<Record<
    string,
    string
  > | null>(null);
  const dbData = useWebSocket("ws://localhost:8080/ws/db");
  const kafkaData = useWebSocket("ws://localhost:8080/ws/kafka");

  useEffect(() => {
    if (kafkaData) {
      setKafkaMessage(kafkaData["payload"]["after"]);
    }
  }, [kafkaData]);

  return (
    <div className="App">
      <Header />
      <FlightTable data={dbData} />
      <Footer />
      <ToastNotification message={kafkaMessage} />
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
