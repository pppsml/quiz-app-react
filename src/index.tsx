import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from './App';
import store from './redux/store';

ReactDOM.render(
  <HashRouter>
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
  </HashRouter>,
  document.getElementById('root')
);