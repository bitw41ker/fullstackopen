import BlogsList from '../components/BlogsList';
import CreateBlogForm from '../components/CreateBlogForm';
import useBlogs from '../hooks/useBlogs';

const RootIndex = () => {
  const { blogs } = useBlogs();

  return (
    <div>
      <CreateBlogForm />
      <br />
      {blogs ? <BlogsList blogs={blogs} /> : <div>Loading...</div>}
    </div>
  );
};

export default RootIndex;
