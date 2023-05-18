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
            <input id="note-title" type="text" name="title" />
          </label>
          <br />

          <label>
            Author:
            <input id="note-author" type="text" name="author" />
          </label>
          <br />

          <label>
            URL:
            <input id="note-url" type="text" name="url" />
            <br />
          </label>
          <button id="create-note-btn">Create</button>
        </form>
      )}
      <br />
      {!showForm && (
        <button id="new-note-btn" onClick={toggleShowForm}>
          New note
        </button>
      )}
      {showForm && (
        <button id="new-note-cancel-btn" onClick={toggleShowForm}>
          Cancel
        </button>
      )}
    </div>
  );
}

CreateBlogForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
