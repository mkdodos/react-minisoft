import { Outlet } from 'react-router-dom';

import React from 'react';

import Header from './Header';
import { Container } from 'semantic-ui-react';

// Outlet 代表每個子元件會出現的位置
const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
