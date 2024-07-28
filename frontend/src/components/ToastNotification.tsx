import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface ToastNotificationProps {
    message: string | null;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ message }) => {
    useEffect(() => {
        if (message) {
            toast(message);
        }
    }, [message]);

    return null;
};

export default ToastNotification;
