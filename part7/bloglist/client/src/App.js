import { useState } from 'react';
import Blogs from './components/Blogs';
import loginService from './services/loginService';
import LoginForm from './components/LoginForm';
import CreateBlogForm from './components/CreateBlogForm';
import Notification from './components/Notification';
import { useNotificationDispatch } from './contexts/NotificationContext';
import { useAuthDispatch, useAuth } from './contexts/AuthContext';
import useBlogs from './hooks/useBlogs';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useAuth();
  const { blogs } = useBlogs();
  const notificationDispatch = useNotificationDispatch();
  const authDispatch = useAuthDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      authDispatch({ type: 'login', user });
    } catch (error) {
      console.log(error);
      notificationDispatch({
        type: 'set',
        notification: 'Wrong username or password',
      });
    }
  };

  const handleLogout = () => {
    authDispatch({ type: 'logout' });
  };

  if (user) {
    return (
      <div>
        <Notification />
        {`${user.name} logged in`}
        <button id="logout-btn" onClick={handleLogout}>
          Logout
        </button>
        <br />
        <br />
        Create new
        <br />
        <CreateBlogForm />
        {blogs ? <Blogs blogs={blogs} /> : <div>Loading...</div>}
      </div>
    );
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

export default App;
