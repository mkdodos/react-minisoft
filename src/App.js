import React from 'react';
import { RouterProvider } from 'react-router-dom';
import Notebook from './pages/NoteBook';
import Spending from './pages/Spending';
import Balance from './pages/Balances/Balance';
import Cates from './pages/Cates';
import CatesNote from './pages/CatesNote';
import Notes from './pages/Notes';
import Credits from './pages/Credits';
import Section from './pages/Credits/components/Section';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Accounts from './pages/Accounts';

import AccountsOrg from './pages/AccountsOrg';
import Babys from './pages/Babys';
import Salary from './pages/Salary';

import { AuthProvider } from './contexts/AuthContext';

import Protected from './routes/Protected';
// import router from './routes';

// import Normal from './routes'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { Container } from 'semantic-ui-react';

import Explore from './app/features/witcher/Explore';
import PostList from './app/features/posts/PostList';
import SectionsList from './app/features/sections/SectionsList';
import Balances from './app/features/balances/Balances';
import WorksList from './app/features/works/WorksList';
import Mortgages from './app/features/mortgages/Mortgages';

export default function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Header />
          <Container>
            <Routes>
            <Route element={<Mortgages />} path="/mortgages" />
              <Route element={<WorksList />} path="/works" />
              <Route element={<Balances />} path="/balances" />

              <Route element={<SectionsList />} path="/sections" />

              <Route element={<PostList />} path="/posts" />

              <Route element={<Explore />} path="/explore" />

              <Route element={<Salary />} path="/salary" />

              <Route element={<Salary />} path="/salary" />
              <Route element={<Babys />} path="/babys" />
              <Route element={<AccountsOrg />} path="/accounts-org" />
              <Route
                element={<Protected Component={Accounts} />}
                path="/accounts"
              />
              <Route
                element={<Protected Component={Dashboard} />}
                path="/dashboard"
              />
              <Route
                element={<Protected Component={Balance} />}
                path="/balance"
              />

              <Route
                element={<Protected Component={Credits} />}
                path="/credits"
              />

              <Route
                element={<Protected Component={Section} />}
                path="/credits-section"
              />

              <Route element={<Protected Component={Cates} />} path="/cates" />

              <Route
                element={<Protected Component={CatesNote} />}
                path="/cates-note"
              />
              <Route element={<Protected Component={Notes} />} path="/notes" />

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
