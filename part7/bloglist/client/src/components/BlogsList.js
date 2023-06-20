import PropTypes from 'prop-types';
import BlogLink from './BlogLink';
import { useAuth } from '../contexts/AuthContext';

export default function BlogList({ blogs }) {
  const user = useAuth();
  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <BlogLink key={blog.id} blog={blog} user={user} />
        ))}
    </div>
  );
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
};
