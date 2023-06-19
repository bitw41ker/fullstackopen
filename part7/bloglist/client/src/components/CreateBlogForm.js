import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs';
import { useNotificationDispatch } from '../contexts/NotificationContext';
import { useAuth } from '../contexts/AuthContext';

export default function CreateBlogForm() {
  const [showForm, setShowForm] = useState(false);
  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const user = useAuth();

  const mutation = useMutation({
    mutationFn: ({ blog, token }) => blogService.post(blog, token),
    // When mutate is called
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['blogs'] });

      const previousBlogs = queryClient.getQueryData(['blogs']);

      // Return a context object with the snapshotted value
      return { previousBlogs };
    },
    onSuccess: ({ title, author }) => {
      toggleShowForm();
      notificationDispatch({
        type: 'set',
        notification: `A new blog ${title} by ${author} added`,
      });
    },
    onError: (err, { blog }, context) => {
      notificationDispatch({
        type: 'set',
        notification: `Failed to add blog ${blog.title} by ${blog.author}`,
      });
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  function toggleShowForm() {
    setShowForm(!showForm);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const title = e.target.elements.title.value;
    const author = e.target.elements.author.value;
    const url = e.target.elements.url.value;

    if (title === '' || author === '' || url === '') return;

    const blog = {
      title,
      author,
      url,
      likes: 0,
    };

    mutation.mutate({ blog, token: user.token });
  }

  return (
    <div>
      Create new
      <br />
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
          <button id="create-note-btn" disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Posting...' : 'Create'}
          </button>
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
