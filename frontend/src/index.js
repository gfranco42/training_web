import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import "./style/styles.scss";

// REDUX
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { initStore } from './reducers/index'
// import rootReducer from './reducers/rootReducer'
// import { getUser } from './reducers/users'

const store = createStore(
  initStore,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);