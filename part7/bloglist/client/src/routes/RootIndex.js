import Blogs from '../components/Blogs';
import CreateBlogForm from '../components/CreateBlogForm';
import useBlogs from '../hooks/useBlogs';

const RootIndex = () => {
  const { blogs } = useBlogs();

  return (
    <div>
      <CreateBlogForm />
      <br />
      {blogs ? <Blogs blogs={blogs} /> : <div>Loading...</div>}
    </div>
  );
};

export default RootIndex;
