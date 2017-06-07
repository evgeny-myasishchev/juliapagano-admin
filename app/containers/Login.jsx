import './Login.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { loginCompleted, loginLoad, loginSuccess } from '../redux/modules/auth';
import auth0LockFactory from '../lib/auth0LockFactory';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    const { actions, origin } = this.props;

    this.lock = this.props.createAuth0Lock({
      auth: {
        params: {
          state: new Buffer(JSON.stringify({ origin })).toString('base64'),
        },
      },
    });
    this.lock.on('authenticated', (authResult) => {
      let returnUrl = origin || '/';
      if (authResult.state) {
        const stateObject = JSON.parse(new Buffer(authResult.state, 'base64').toString('ascii'));
        returnUrl = stateObject.origin || returnUrl;
      }
      actions.loginSuccess(authResult.rawIdToken, authResult.idTokenPayload);
      actions.push(returnUrl);
    });
  }

  componentDidMount() {
    this.lock.show();
  }

  componentWillUnmount() {
    this.lock.hide();
  }

  render() {
    return (
      <div className="row" id="auth-container">Loading...</div>
    );
  }
}

Login.propTypes = {
  origin: PropTypes.string,
  createAuth0Lock: PropTypes.func,
  actions: PropTypes.shape({
    push: PropTypes.func,
    loginLoad: PropTypes.func,
    loginSuccess: PropTypes.func,
    loginCompleted: PropTypes.func,
  }).isRequired,
};

Login.defaultProps = {
  origin: '/',
  createAuth0Lock: auth0LockFactory,
};

export default connect(
    state => ({
      origin: state.auth.origin,
    }),
    dispatch => ({
      actions: bindActionCreators({
        push,
        loginSuccess,
        loginCompleted,
        loginLoad,
      }, dispatch),
    }),

)(Login);
