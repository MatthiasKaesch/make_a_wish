import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import './index.css';
import App from './App.js';
import GoogleFont from './components/Font';
import { AuthContextProvider } from './store/auth-context';

ReactDOM.render(
  <AuthContextProvider>
    <React.StrictMode>
      <GoogleFont />
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  </AuthContextProvider>,
  document.getElementById('root')
);
