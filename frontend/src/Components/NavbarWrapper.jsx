import React from 'react';
import Navbar from './Navbar';

const NavbarWrapper = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default NavbarWrapper
