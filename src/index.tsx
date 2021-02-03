import React from 'react';
import ReactDOM from 'react-dom';
// import reportWebVitals from './reportWebVitals';

import { Router } from 'react-router-dom'
import { createBrowserHistory } from "history";

import { Provider } from 'react-redux'
import configureStore from './store/redux';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';


const hist = createBrowserHistory();
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Router history={hist}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// reportWebVitals(console.log);
