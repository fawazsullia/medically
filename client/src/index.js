import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import LoadingSpinner from "./components/LoadingSpinner";


ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<LoadingSpinner/>}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </React.Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);


