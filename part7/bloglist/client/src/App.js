import { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import loginService from './services/loginService';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import CreateBlogForm from './components/CreateBlogForm';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);

  async function onLikeClick(blog) {
    const updatedBlog = {
      ...blog,
      user: blog.user,
      likes: blog.likes + 1,
    };

    blogService.update(blog.id, updatedBlog);

    const updatedBlogs = blogs.map((b) =>
      b.id === blog.id ? updatedBlog : { ...b, user: b.user }
    );

    setBlogs(updatedBlogs);
  }

  async function onDeleteClick(blog) {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.remove(blog.id, user.token);
      const updatedBlogs = blogs
        .filter((b) => b.id !== blog.id)
        .map((b) => ({ ...b, user: b.user }));

      setBlogs(updatedBlogs);
    }
  }

  async function handleFormSubmit({ title, author, url }) {
    if (title !== '' && author !== '' && url !== '') {
      const blog = {
        title,
        author,
        url,
        likes: 0,
      };

      await blogService.post(blog, user.token);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
      setMessage(`A new blog ${title} by ${author} added`);

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  }

  if (!user) {
    const bloglistUser = window.localStorage.getItem('bloglistUser');
    if (bloglistUser) {
      const user = JSON.parse(bloglistUser);
      setUser(user);
    }
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

  return (
    <>
      {user ? (
        <>
          <h1>Blogs</h1>
          {message && <p>{message}</p>}
          {`${user.name} logged in`}
          <button id="logout-btn" onClick={handleLogout}>
            Logout
          </button>
          <br />
          <br />
          Create new
          <br />
          <CreateBlogForm onFormSubmit={handleFormSubmit} />
          <Blogs
            user={user}
            blogs={blogs}
            onLikeClick={onLikeClick}
            onDeleteClick={onDeleteClick}
          />
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
