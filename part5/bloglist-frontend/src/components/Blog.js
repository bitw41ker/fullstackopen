import { useState, useEffect } from 'react';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  let viewButtonLabel = 'View';
  if (showDetails) {
    viewButtonLabel = 'Hide';
  }

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
              <button>Like</button>
            </div>
            <div>{blog.author}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
