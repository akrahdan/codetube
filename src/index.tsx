import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Portal from './portal'
import { store } from 'store'
// import { Router } from 'react-router'

import { BrowserRouter as Router} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { Provider } from 'react-redux'
import { AlertMessage } from 'portal/scenes/AlertMessage';
import reportWebVitals from './reportWebVitals';
const history = createBrowserHistory()
const options = {
  timeout: 5000,
  position: positions.TOP_CENTER,
  transition: transitions.FADE
  
};
ReactDOM.render(
  <Router forceRefresh >
    <Provider store={store}>
      <AlertProvider template={AlertMessage} {...options}>
       <Portal />
      </AlertProvider>
     
    </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
