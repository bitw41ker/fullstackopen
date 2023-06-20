import { useAuthDispatch } from '../contexts/AuthContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = useAuth();
  const authDispatch = useAuthDispatch();

  const handleLogout = () => {
    authDispatch({ type: 'logout' });
  };

  return (
    <div>
      <Link to="/">Blogs</Link> <Link to="/users">Users</Link>
      <span>{user.name} logged in</span>
      <button id="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
