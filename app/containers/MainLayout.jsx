import { Link, Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

import AuthService from '../auth/AuthService';
import Home from '../components/Home';
import Login from '../components/Login';
import Pages from '../components/Pages';

const auth = new AuthService('Nx0izLzYRVQ0zOSaeXw4ttStmg7jvmyQ', 'infora-soft.eu.auth0.com');

const BootstrapNavLink = ({ label, to }) => (
  <Route
    path={to} exact children={({ match }) => ( // eslint-disable-line react/no-children-prop
      <li className={match ? 'active' : ''}>
        <Link to={to}>{label}</Link>
      </li>
    )}
  />
);

BootstrapNavLink.propTypes = {
  label: React.PropTypes.string.isRequired,
  to: React.PropTypes.string.isRequired,
};

const PrivateRoute = ({ component, ...rest }) => (
  <Route
    {...rest} render={props => (
    auth.loggedIn() ? (
      React.createElement(component, props)
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location }, // eslint-disable-line react/prop-types
        }}
      />
    )
  )}
  />
);

PrivateRoute.propTypes = {
  component: React.PropTypes.func.isRequired,
};

export default function App() {
  return (<Router auth={auth}>
    <div>
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
              aria-expanded="false" aria-controls="navbar"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link className="navbar-brand" to="/">Juliapagano Admin</Link>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <BootstrapNavLink to="/" label="Home" />
              <BootstrapNavLink to="/pages" label="Pages" />
            </ul>
          </div>
        </div>
      </nav>


      <div className="container">
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/pages" component={Pages} />
        <Route path="/login" component={() => <Login auth={auth} />} auth={auth} />
      </div>
    </div>
  </Router>);
}
