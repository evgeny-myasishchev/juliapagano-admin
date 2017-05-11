/* eslint-disable import/no-named-as-default*/

import 'bootstrap/dist/css/bootstrap.css';

import './index.css';

import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { render } from 'react-dom';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import React from 'react';
import thunkMiddleware from 'redux-thunk';

import App from './containers/App';
import EnsureAuthenticated from './containers/EnsureAuthenticated';
import Home from './containers/Home';
import Login from './containers/Login';
import Pages from './containers/Pages';
import reducer from './redux/modules/reducer';

const store = createStore(reducer, applyMiddleware(
    thunkMiddleware,
    routerMiddleware(browserHistory),
  ),
);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route component={EnsureAuthenticated}>
          <Route path="/pages" component={Pages} />
        </Route>
        <Route path="/login" component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
