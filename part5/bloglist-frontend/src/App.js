import { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import loginService from './services/loginService';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  if (!user) {
    const bloglistUser = window.localStorage.getItem('bloglistUser');
    if (bloglistUser) {
      const user = JSON.parse(bloglistUser);
      setUser(user);
    }
  }
  console.log('render');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('bloglistUser');
    setUser(null);
  };

  return (
    <>
      {user ? (
        <>
          <h1>Blogs</h1>
          {`${user.name} logged in`}
          <button onClick={handleLogout}>Logout</button>
          <br />
          <br />
          <Blogs blogs={blogs} />
        </>
      ) : (
        <LoginForm
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
    </>
  );
};

export default App;
