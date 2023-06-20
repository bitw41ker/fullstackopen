import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

const BlogLink = ({ blog }) => {
  return (
    <div className="blog" style={blogStyle}>
      <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  );
};

export default BlogLink;

BlogLink.propTypes = {
  blog: PropTypes.object.isRequired,
};
