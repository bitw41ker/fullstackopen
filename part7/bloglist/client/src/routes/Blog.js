import {
  useLoaderData,
  Form,
  useNavigation,
  redirect,
  json,
} from 'react-router-dom';
import blogService from '../services/blogs';
import { useAuth } from '../contexts/AuthContext';

const Blog = () => {
  const blog = useLoaderData();
  const user = useAuth();
  const navigation = useNavigation();

  const sameUser = user.username === blog.user.username;

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <Form method="post">
          <span>{blog.likes} </span>
          <input type="hidden" name="token" value={user.token} />
          <button
            type="submit"
            name="intent"
            value="like"
            disabled={
              navigation.state === 'submitting' ||
              navigation.state === 'loading'
            }
          >
            Like
          </button>
        </Form>
        <div>added by {blog.author}</div>
        {sameUser && (
          <Form method="post">
            <input type="hidden" name="token" value={user.token} />
            <input type="hidden" name="title" value={blog.title} />
            <input type="hidden" name="author" value={blog.author} />
            <button type="submit" name="intent" value="delete">
              Delete
            </button>
          </Form>
        )}
      </div>
    </div>
  );
};

export const loader = async ({ params }) => {
  return await blogService.getById(params.blogId);
};

export const action = async ({ request, params }) => {
  const data = await request.formData();
  const intent = data.get('intent');

  if (intent === 'like') {
    await blogService.like(params.blogId, data.get('token'));
    return null;
  }

  if (intent === 'delete') {
    if (
      window.confirm(
        `Remove blog ${data.get('title')} by ${data.get('author')}?`
      )
    ) {
      await blogService.remove(params.blogId, data.get('token'));
      return redirect('/');
    }
    return null;
  }

  throw json({ message: 'Invalid intent' }, { status: 400 });
};

export default Blog;
