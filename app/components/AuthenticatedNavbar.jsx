import { Link } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';

import SafeAnchor from './SafeAnchor';

const BootstrapNavLink = ({ label, to }) => (
  <li>
    <Link to={to}>{label}</Link>
  </li>
);

BootstrapNavLink.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default function AuthenticatedNavbar({ onSignOut, userName }) {
  return (
    <div>
      <ul className="nav navbar-nav">
        <BootstrapNavLink to="/" label="Home" />
        <BootstrapNavLink to="/pages" label="Pages" />
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <a name="user-name" href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            { userName } <span className="caret" />
          </a>
          <ul className="dropdown-menu">
            <li role="separator" className="divider" />
            <li><SafeAnchor name="sign-out" onClick={e => onSignOut(e)}>Sign Out</SafeAnchor></li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

AuthenticatedNavbar.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};
