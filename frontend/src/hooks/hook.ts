import { useEffect, useRef, useState } from "react";

const useWebSocket = (url: string) => {
  const [data, setData] = useState(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connect = () => {
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        console.log("WebSocket connected:", url);
      };

      ws.current.onmessage = (event) => {
        setData(JSON.parse(event.data));
      };

      ws.current.onclose = () => {
        console.log("WebSocket disconnected:", url);
        setTimeout(() => {
          console.log("Reconnecting...");
          connect();
        }, 5000); // Reconnect after 5 seconds
      };

      ws.current.onerror = (error) => {
        console.log("WebSocket error:", error);
        ws.current?.close();
      };
    };

    connect();

    return () => {
      ws.current?.close();
    };
  }, [url]);

  return data;
};

export default useWebSocket;
