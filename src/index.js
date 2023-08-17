import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'semantic-ui-css/semantic.min.css';

// import 'bootstrap/dist/css/bootstrap.css';

import { store } from './app/store';
import { Provider } from 'react-redux';

import { fetchUsers } from './app/features/users/usersSlice';

store.dispatch(fetchUsers());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
