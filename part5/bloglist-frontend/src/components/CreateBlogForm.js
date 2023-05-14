import { useState } from 'react';
import PropTypes from 'prop-types';

export default function CreateBlogForm({ onFormSubmit }) {
  const [showForm, setShowForm] = useState(false);

  function toggleShowForm() {
    setShowForm(!showForm);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    await onFormSubmit({
      title: e.target.elements.title.value,
      author: e.target.elements.author.value,
      url: e.target.elements.url.value,
    });

    e.target.reset();
    toggleShowForm();
  }

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

CreateBlogForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
