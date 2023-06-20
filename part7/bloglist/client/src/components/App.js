import { Outlet } from 'react-router-dom';
import Notification from './Notification';
import Navbar from './Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <h1>Blogs</h1>
      <Notification />
      <br />
      <Outlet />
    </>
  );
};

export default App;
