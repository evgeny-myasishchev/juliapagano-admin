import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

import Home from '../components/Home';
import Pages from '../components/Pages';

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

export default function App() {
  return (<Router>
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
        <Route path="/pages" component={Pages} />
      </div>
    </div>
  </Router>);
}
