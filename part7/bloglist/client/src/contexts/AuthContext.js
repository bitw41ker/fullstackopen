import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext(null);
const AuthDispatchContext = createContext(null);

const authReducer = (auth, action) => {
  switch (action.type) {
    case 'login': {
      window.localStorage.setItem('bloglistUser', JSON.stringify(action.user));
      return action.user;
    }

    case 'logout': {
      window.localStorage.removeItem('bloglistUser');
      return null;
    }

    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
};

export const AuthProvider = ({ children }) => {
  const bloglistUser = window.localStorage.getItem('bloglistUser');
  const [auth, dispatch] = useReducer(authReducer, JSON.parse(bloglistUser));

  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useAuthDispatch = () => {
  return useContext(AuthDispatchContext);
};
