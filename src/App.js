import React from 'react';
import { RouterProvider } from 'react-router-dom';
import Notebook from './pages/NoteBook';
import Spending from './pages/Spending';
import Balance from './pages/Balances/Balance';

import Login from './pages/Login';

import { AuthProvider } from './contexts/AuthContext';

import Protected from './routes/Protected';
// import router from './routes';

// import Normal from './routes'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { Container } from 'semantic-ui-react';

export default function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Header />
          <Container>
            <Routes>
              {/* <Route element={<PrivateRoutes />}>
              <Route element={<Spending />} path="/spending" />
            </Route> */}

              {/* <Route element={<Notebook />} path="/notebook" /> */}
              
              <Route
                element={<Protected Component={Balance} />}
                path="/balance"
              />
              
              <Route
                element={<Protected Component={Spending} />}
                path="/spending"
              />

              <Route
                element={<Protected Component={Notebook} />}
                path="/notebook"
              />
              <Route element={<Login />} path="/login" />
              <Route element={<Balance />} path="/balance" />
            </Routes>
          </Container>
        </Router>
      </AuthProvider>
    </div>
  );
  // return <RouterProvider router={router} />;
}
