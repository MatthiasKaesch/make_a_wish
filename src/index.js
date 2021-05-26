import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App.js';
import GoogleFont from './components/Font';
import { AuthContextProvider } from './store/auth-context';

ReactDOM.render(
  <AuthContextProvider>
    <React.StrictMode>
      <GoogleFont />
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </AuthContextProvider>,
  document.getElementById('root')
);
