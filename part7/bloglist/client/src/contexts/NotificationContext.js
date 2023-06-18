import { createContext, useContext, useReducer } from 'react';

const NotificationContext = createContext(null);
const NotificationDispatchContext = createContext(null);

const notificationReducer = (notification, action) => {
  switch (action.type) {
    case 'set': {
      return action.notification;
    }

    case 'cleared': {
      return null;
    }

    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
};

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={notification}>
      <NotificationDispatchContext.Provider value={dispatch}>
        {children}
      </NotificationDispatchContext.Provider>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
export const useNotificationDispatch = () => {
  return useContext(NotificationDispatchContext);
};
