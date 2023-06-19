import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <>
      <h1>Blogs</h1>
      <Outlet />
    </>
  );
};

export default Root;
