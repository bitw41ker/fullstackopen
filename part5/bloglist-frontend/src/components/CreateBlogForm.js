import { useState } from 'react';
import blogService from '../services/blogs';
import axios from 'axios';

export default function CreateBlogForm({ setMessage, setBlogs, user }) {
  const [showForm, setShowForm] = useState(false);

  function toggleShowForm() {
    setShowForm(!showForm);
  }

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
    <div>
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
    </div>
  );
}
