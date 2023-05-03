import { useState } from 'react';
import blogService from '../services/blogs';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [blogState, setBlogState] = useState(blog);

  let viewButtonLabel = 'View';
  if (showDetails) {
    viewButtonLabel = 'Hide';
  }

  async function handleLikeClick() {
    const updatedBlog = {
      ...blogState,
      likes: blogState.likes + 1,
    };

    const returnedBlog = await blogService.update(blog.id, updatedBlog);
    setBlogState(returnedBlog);
  }

  return (
    <div>
      <div style={blogStyle}>
        <span>
          {blogState.title} {blogState.author}{' '}
        </span>
        <button onClick={() => setShowDetails(!showDetails)}>
          {viewButtonLabel}
        </button>
        {showDetails && (
          <div>
            <div>{blogState.url}</div>
            <div>
              <span>{blogState.likes} </span>
              <button onClick={handleLikeClick}>Like</button>
            </div>
            <div>{blogState.author}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
