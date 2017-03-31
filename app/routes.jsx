import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import React from 'react';

import App from './containers/App';

export default () => (
  <Router>
    <div>
      <Route exact path="/" component={App} />
    </div>
  </Router>
);
