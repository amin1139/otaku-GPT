import { Outlet } from 'react-router';
import Header from './Header'

const Body = () => {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  );
};

export default Body;