import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import { Router } from 'react-router-dom'
import { createBrowserHistory } from "history";

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';


const hist = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={hist}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// reportWebVitals(console.log);
