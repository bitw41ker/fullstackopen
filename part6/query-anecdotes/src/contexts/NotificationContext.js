import { createContext, useReducer, useContext } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }

  return context;
};

let notificationTimer = null;
const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null);
  const setNotification = (message, seconds) => {
    if (notificationTimer) {
      clearTimeout(notificationTimer);
    }

    dispatch({ type: 'SET_NOTIFICATION', payload: message });

    notificationTimer = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
      notificationTimer = null;
    }, seconds * 1000);
  };

  const clearNotification = () => {
    dispatch({ type: 'CLEAR_NOTIFICATION' });
  };

  return (
    <NotificationContext.Provider
      value={{ notification, setNotification, clearNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider };
