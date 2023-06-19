import userService from '../services/users';
import { useLoaderData, Link } from 'react-router-dom';

const Users = () => {
  const { users } = useLoaderData();

  return (
    <div>
      <h2>Users</h2>
      <br />
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={user.id}>{user.name}</Link>
              </td>
              <td>{user.blogsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const loader = async () => {
  const usersData = await userService.getAll();

  const users = usersData?.map((user) => {
    const name = user.name;
    const id = user.id;
    const blogsCount = user.notes.length;
    return { id, name, blogsCount };
  });

  return { users };
};

export default Users;
