import React from 'react';
import ReactDOM from 'react-dom';
// import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import configureStore from './store/redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';


const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// reportWebVitals(console.log);
