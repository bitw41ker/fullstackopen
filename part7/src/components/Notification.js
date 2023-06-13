import { useState, useEffect } from 'react';

const Notification = ({ message }) => {
  const [display, setDisplay] = useState(!!message);

  useEffect(() => {
    if (message) {
      setDisplay(true);

      const timer = setTimeout(() => {
        setDisplay(false);
      }, 5 * 1000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return display && <div>{message}</div>;
};

export default Notification;
