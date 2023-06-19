import { useAuthDispatch } from '../contexts/AuthContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const user = useAuth();
  const authDispatch = useAuthDispatch();

  const handleLogout = () => {
    authDispatch({ type: 'logout' });
  };

  return (
    <div>
      {`${user.name} logged in`}
      <button id="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
