import './Login.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Auth0Lock from 'auth0-lock';
import PropTypes from 'prop-types';
import React from 'react';

import { loginCompleted, loginLoad, loginSuccess } from '../redux/modules/auth';

function createAuth0Lock() {
  return new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, {
    container: 'auth-container',
    auth: {
      redirectUrl: `${window.location.origin}/login`,
      responseType: 'token',
      params: {
        scope: 'openid name email',
      },
    },
  });
}

export class Login extends React.Component {
  constructor(props) {
    super(props);

    const { actions } = this.props;

    this.lock = this.props.createAuth0Lock();
    this.lock.on('authenticated', (authResult) => {
      let returnUrl = '/';
      if (authResult.state) {
        const stateObject = JSON.parse(new Buffer(authResult.state, 'base64').toString('ascii'));
        returnUrl = stateObject.origin || returnUrl;
      }
      actions.loginSuccess(authResult.idToken, authResult.idTokenPayload);
      actions.push(returnUrl);
    });
  }

  componentDidMount() {
    const { origin } = this.props;
    this.lock.show({
      auth: {
        params: {
          state: new Buffer(JSON.stringify({ origin })).toString('base64'),
        },
      },
    });
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
  createAuth0Lock,
};

export default connect(
    () => ({}),
    dispatch => ({
      actions: bindActionCreators({
        push,
        loginSuccess,
        loginCompleted,
        loginLoad,
      }, dispatch),
    }),

)(Login);
