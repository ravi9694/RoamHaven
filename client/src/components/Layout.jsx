import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './Header';

const Layout = () => {
    const MyStyle = {
      backgroundColor: 'black',
      color: 'white',
    };
  return (
    <>
      <Header />
      <div className="flex flex-col mx-auto min-h-screen max-w-screen-xl" style={MyStyle}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
