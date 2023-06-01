import React from 'react';
import { RouterProvider } from 'react-router-dom';
import Notebook from './pages/NoteBook';
import Spending from './pages/Spending';
import PrivateRoutes from './routes/PrivateRoutes';
import Login from './pages/Login';

import { AuthProvider } from './contexts/AuthContext';

import Protected from './routes/Protected';
// import router from './routes';

// import Normal from './routes'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

export default function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Header/>
          <Routes>
            {/* <Route element={<PrivateRoutes />}>
              <Route element={<Spending />} path="/spending" />
            </Route> */}

            {/* <Route element={<Notebook />} path="/notebook" /> */}
            <Route element={<Protected Component={Spending} />} path="/spending" />

            <Route element={<Protected Component={Notebook} />} path="/notebook" />
            <Route element={<Login />} path="/login" />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
  // return <RouterProvider router={router} />;
}
