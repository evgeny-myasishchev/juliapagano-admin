import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { logout } from '../redux/modules/auth';

const BootstrapNavLink = ({ label, to }) => (
  <li>
    <Link to={to}>{label}</Link>
  </li>
);

BootstrapNavLink.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

function App({ children, actions }) {
  function signOut(e) {
    e.preventDefault();
    actions.logout();
  }
  return (
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
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  User <span className="caret" />
                </a>
                <ul className="dropdown-menu">
                  <li role="separator" className="divider" />
                  <li><a href="#" onClick={e => signOut(e)}>Sign Out</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        {children}
      </div>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  actions: PropTypes.shape({
    logout: PropTypes.function,
  }).isRequired,
};

export default connect(
    (state, ownProps) =>  // mapStateToProps
       ({
         children: ownProps.children,
       }),
    dispatch => ({
      actions: bindActionCreators({
        logout,
      }, dispatch),
    }),

)(App);
