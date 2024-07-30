import React, { useState, useEffect } from "react";
import useWebSocket from "./hooks/hook";
import FlightTable from "./components/FlightTable";
import ToastNotification from "./components/ToastNotification";
import "./App.css";
import { Toaster } from "react-hot-toast";

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
      <h2 className="bg-blue-950 text-white text-center mb-4">⚔️⚔️ Indigo Hack-to-Hire 2024 ⚔️⚔️</h2>
      <h1 className="text-5xl bg-blue-700 text-white py-4 mx-48 rounded-full text-center">
        Indigo Flight Status Updates
      </h1>
      <FlightTable data={dbData} />
      <ToastNotification message={kafkaMessage} />
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
