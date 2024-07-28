import { useEffect, useRef, useState } from "react";

const useWebSocket = (url: string) => {
  const [data, setData] = useState(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log("WebSocket connected:", url);
    };

    ws.current.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected:", url);
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);
  console.log(data, "line26");
  return data;
};

export default useWebSocket;
