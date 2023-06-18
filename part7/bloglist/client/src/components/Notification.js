import { useEffect } from 'react';

import {
  useNotification,
  useNotificationDispatch,
} from '../contexts/NotificationContext';

const Notification = ({ duration }) => {
  duration = duration ?? 5000;
  const notification = useNotification();
  const notificationDispatch = useNotificationDispatch();

  useEffect(() => {
    if (notification) {
      const timeoutId = setTimeout(() => {
        notificationDispatch({ type: 'cleared' });
      }, duration);

      return () => clearTimeout(timeoutId);
    }
  }, [notification, notificationDispatch, duration]);

  if (!notification) return null;

  return <div>{notification}</div>;
};

export default Notification;
