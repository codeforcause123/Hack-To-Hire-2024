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
      <h1 className="mt-2 text-5xl bg-blue-700 text-white py-4 mx-16 rounded-md">
        Flight Status Updates
      </h1>
      <FlightTable data={dbData} />
      <ToastNotification message={kafkaMessage} />
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
