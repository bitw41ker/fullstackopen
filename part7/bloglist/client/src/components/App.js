import { Outlet } from 'react-router-dom';
import Notification from './Notification';
import Navbar from './Navbar';

const App = () => {
  return (
    <>
      <h1>Blogs</h1>
      <Notification />
      <br />
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
