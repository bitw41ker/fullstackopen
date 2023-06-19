import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  });

  return user ? children : null;
};

export default ProtectedRoute;
