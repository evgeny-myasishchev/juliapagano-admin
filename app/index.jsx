/* eslint-disable import/no-named-as-default*/

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';

import './index.css';

import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
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

const composeEnhancers = process.env.BUILD_DEVTOOLS ? composeWithDevTools({}) : compose;

const store = createStore(reducer,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(browserHistory),
    ),
  ),
);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route component={EnsureAuthenticated}>
          <IndexRoute component={Home} />
          <Route path="/pages" component={Pages} />
        </Route>
        <Route path="/login" component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
