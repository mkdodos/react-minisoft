import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React from 'react'

import Notebook from './pages/NoteBook';
import Spending from './pages/Spending';
import PrivateRoutes from './routes/PrivateRoutes';
import Login from './pages/Login';


export default function Normal() {
  return (
    <Router>
        <Routes>
          {/* 保護路由 */}
          <Route element={<PrivateRoutes />}>
            <Route element={<Spending />} path="/spending" />
            <Route element={<Notebook />} path="/notebook" />
          </Route>
          {/* 正常路由 */}
          <Route element={<Login />} path="/login" />         
        </Routes>
      </Router>
  )
}
