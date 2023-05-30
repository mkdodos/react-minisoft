import React from 'react';
import { RouterProvider } from 'react-router-dom';
import Notebook from './pages/NoteBook';
import Spending from './pages/Spending';
import PrivateRoutes from './routes/PrivateRoutes';
import Login from './pages/Login';

// import router from './routes';

// import Normal from './routes'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Spending />} path="/spending" />
            
          </Route>

          <Route element={<Notebook />} path="/notebook" />
          <Route element={<Login />} path="/login" />
        </Routes>
      </Router>
    </div>
  );
  // return <RouterProvider router={router} />;
}
