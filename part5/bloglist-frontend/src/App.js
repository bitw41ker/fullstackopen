import { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import loginService from './services/loginService';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import axios from 'axios';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);

  if (!user) {
    const bloglistUser = window.localStorage.getItem('bloglistUser');
    if (bloglistUser) {
      const user = JSON.parse(bloglistUser);
      setUser(user);
    }
  }

  function toggleShowForm() {
    setShowForm(!showForm);
  }

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
      setMessage('Wrong username or password');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('bloglistUser');
    setUser(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;
    const url = e.target.url.value;

    if (title !== '' && author !== '' && url !== '') {
      e.target.reset();
      axios
        .post(
          'api/blogs',
          {
            title,
            author,
            url,
            likes: 0,
          },
          { headers: { Authorization: `Bearer ${user.token}` } }
        )
        .then(() => blogService.getAll())
        .then((blogs) => {
          setBlogs(blogs);
          setMessage(`A new blog ${title} by ${author} added`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          toggleShowForm();
        });
    }
  };

  return (
    <>
      {user ? (
        <>
          <h1>Blogs</h1>
          {message && <p>{message}</p>}
          {`${user.name} logged in`}
          <button onClick={handleLogout}>Logout</button>
          <br />
          <br />
          Create new
          <br />
          {showForm && (
            <form onSubmit={handleFormSubmit}>
              <label>
                Title:
                <input type="text" name="title" />
              </label>
              <br />

              <label>
                Author:
                <input type="text" name="author" />
              </label>
              <br />

              <label>
                URL:
                <input type="text" name="url" />
                <br />
              </label>
              <button>Create</button>
            </form>
          )}
          <br />
          {!showForm && <button onClick={toggleShowForm}>New note</button>}
          {showForm && <button onClick={toggleShowForm}>Cancel</button>}
          <Blogs blogs={blogs} />
        </>
      ) : (
        <>
          {message && <p>{message}</p>}

          <LoginForm
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </>
      )}
    </>
  );
};

export default App;
