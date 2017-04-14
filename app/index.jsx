import 'bootstrap/dist/css/bootstrap.css';

import './index.css';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from 'react-dom';
import React from 'react';

import MainLayout from './containers/MainLayout';
import auth from './redux/modules/auth';

const store = createStore(auth);

render(
  <Provider store={store}>
    <MainLayout />
  </Provider>,
  document.getElementById('root'),
);
