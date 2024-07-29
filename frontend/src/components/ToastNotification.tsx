import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import moment from "moment";
interface ToastNotificationProps {
  message: Record<string, string> | null;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ message }) => {
  useEffect(() => {
    if (message) {
      toast(`Flight Number: ${message["flight_number"]}\n
        Status: ${message["status"]}\n
        Update Time: ${moment(message["update_time"]).format("lll")}\n
        Details: ${message["details"]}
      `);
    }
  }, [message]);

  return null;
};

export default ToastNotification;
