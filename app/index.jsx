import 'bootstrap/dist/css/bootstrap.css';

import './index.css';

import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import React from 'react';

import App from './containers/App';
import Home from './containers/Home';
import Login from './containers/Login';
import Pages from './containers/Pages';
import reducer from './redux/modules/reducer';

const store = createStore(reducer);

const history = syncHistoryWithStore(browserHistory, store);

function requireAuth() {
  console.log('== hello require auth ==');
  console.log(arguments);
}

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/pages" component={Pages} onEnter={requireAuth} />
        <Route path="/login" component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
