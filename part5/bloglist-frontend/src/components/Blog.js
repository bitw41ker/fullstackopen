import { useState } from 'react';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ onLikeClick, onDeleteClick, blog, user }) => {
  const [showDetails, setShowDetails] = useState(false);

  let viewButtonLabel = 'View';
  if (showDetails) {
    viewButtonLabel = 'Hide';
  }
  const sameUser = user.username === blog.user.username;

  return (
    <div>
      <div style={blogStyle}>
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
              <button onClick={() => onLikeClick(blog)}>Like</button>
            </div>
            <div>{blog.author}</div>
            {sameUser && (
              <button onClick={() => onDeleteClick(blog)}>Delete</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
