import { useLoaderData } from 'react-router-dom';
import userService from '../services/users';

const User = () => {
  const { user } = useLoaderData();
  return (
    <div>
      <h2>{user?.name}</h2>
      <b>added blogs</b>
      <br />
      <ul>
        {user?.notes.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export const loader = async ({ params }) => {
  const { userId } = params;
  const user = await userService.getById(userId);

  return { user };
};

export default User;
