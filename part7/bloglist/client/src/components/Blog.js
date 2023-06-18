import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog, user }) => {
  const [showDetails, setShowDetails] = useState(false);

  let viewButtonLabel = 'View';
  if (showDetails) {
    viewButtonLabel = 'Hide';
  }
  const sameUser = user.username === blog.user.username;

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ blog }) => blogService.update(blog.id, blog),
    // When mutate is called
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['blogs'] });
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id, token }) => blogService.remove(id, token),
    // When mutate is called
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['blogs'] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  function handleLike(blog) {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    updateMutation.mutate({ blog: updatedBlog });
  }

  function handleDelete(blog) {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteMutation.mutate({ id: blog.id, token: user.token });
    }
  }

  return (
    <div>
      <div className="blog" style={blogStyle}>
        <span>
          {blog.title} {blog.author}{' '}
        </span>
        <button onClick={() => setShowDetails(!showDetails)}>
          {viewButtonLabel}
        </button>
        {showDetails && (
          <div>
            <div>{blog.url}</div>
            <div>
              <span>{blog.likes} </span>
              <button
                onClick={() => handleLike(blog)}
                disabled={updateMutation.isLoading}
              >
                Like
              </button>
            </div>
            <div>{blog.author}</div>
            {sameUser && (
              <button onClick={() => handleDelete(blog)}>Delete</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
