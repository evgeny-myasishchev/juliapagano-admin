import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { logout } from '../redux/modules/auth';
import AuthenticatedNavbar from '../components/AuthenticatedNavbar';

const BootstrapNavLink = ({ label, to }) => (
  <li>
    <Link to={to}>{label}</Link>
  </li>
);

BootstrapNavLink.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export function App({ signedIn, children, actions, idToken }) {
  function signOut() {
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
            { signedIn && <AuthenticatedNavbar onSignOut={signOut} userName={idToken.payload.name} /> }
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
  idToken: PropTypes.shape({
    payload: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }),
  signedIn: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    logout: PropTypes.function,
  }).isRequired,
};

App.defaultProps = {
  idToken: null,
};

export default connect(
    (state, ownProps) =>  // mapStateToProps
       ({
         children: ownProps.children,
         idToken: state.auth.idToken,
         signedIn: state.auth.signedIn,
       }),
    dispatch => ({
      actions: bindActionCreators({
        logout,
      }, dispatch),
    }),

)(App);
