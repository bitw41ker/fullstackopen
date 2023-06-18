import { useState } from 'react';
import Blogs from './components/Blogs';
import loginService from './services/loginService';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import CreateBlogForm from './components/CreateBlogForm';
import Notification from './components/Notification';
import { useNotificationDispatch } from './contexts/NotificationContext';
import useBlogs from './hooks/useBlogs';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const { blogs } = useBlogs();
  const notificationDispatch = useNotificationDispatch();

  if (!user) {
    const bloglistUser = window.localStorage.getItem('bloglistUser');
    if (bloglistUser) {
      const user = JSON.parse(bloglistUser);
      setUser(user);
    }
  }

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem('bloglistUser', JSON.stringify(user));
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error);

      notificationDispatch({
        type: 'set',
        notification: 'Wrong username or password',
      });
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('bloglistUser');
    setUser(null);
  };

  if (user) {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification />
        {`${user.name} logged in`}
        <button id="logout-btn" onClick={handleLogout}>
          Logout
        </button>
        <br />
        <br />
        Create new
        <br />
        <CreateBlogForm user={user} />
        {blogs ? <Blogs user={user} blogs={blogs} /> : <div>Loading...</div>}
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
