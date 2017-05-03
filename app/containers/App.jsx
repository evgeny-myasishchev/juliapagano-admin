import { Link } from 'react-router';
import { connect } from 'react-redux';
import React from 'react';

const BootstrapNavLink = ({ label, to }) => (
  <li>
    <Link to={to}>{label}</Link>
  </li>
);

BootstrapNavLink.propTypes = {
  label: React.PropTypes.string.isRequired,
  to: React.PropTypes.string.isRequired,
};

function App({ children }) {
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
  children: React.PropTypes.element.isRequired,
};

export default connect(
    (state, ownProps) =>  // mapStateToProps
       ({
         children: ownProps.children,
       }),
)(App);
