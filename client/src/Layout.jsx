import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <NavBar />
      <div className="mt-5">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
