import PropTypes from 'prop-types';
import Blog from './Blog';
import { useAuth } from '../contexts/AuthContext';

export default function Blogs({ blogs }) {
  const user = useAuth();
  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </div>
  );
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
};
