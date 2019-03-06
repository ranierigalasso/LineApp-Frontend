import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import 'bootstrap/dist/css/bootstrap.css';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //Extension to connect to Redux Chrome Debugger
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
, document.getElementById('root'));