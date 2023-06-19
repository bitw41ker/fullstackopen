import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthDispatch, useAuth } from '../contexts/AuthContext';
import loginService from '../services/loginService';
import LoginForm from '../components/LoginForm';
import Notification from '../components/Notification';
import { useNotificationDispatch } from '../contexts/NotificationContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useAuth();
  const authDispatch = useAuthDispatch();
  const notificationDispatch = useNotificationDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      authDispatch({ type: 'login', user });
      navigate('/');
    } catch (error) {
      console.log(error);
      notificationDispatch({
        type: 'set',
        notification: 'Wrong username or password',
      });
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  });

  if (user) {
    return null;
  }

  return (
    <div>
      <Notification />
      <LoginForm
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    </div>
  );
};

export default Login;
