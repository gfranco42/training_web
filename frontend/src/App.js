import React from 'react';
import Router from './route.js';

import "./style/global/_app.scss";

// TOAST
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();



const App = () =>(
  <div className="app">
    <Router />
  </div> 
)


export default App;
