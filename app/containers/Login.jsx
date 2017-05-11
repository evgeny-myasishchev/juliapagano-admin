import './Login.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Auth0Lock from 'auth0-lock';
import React, { PropTypes } from 'react';

import { loginCompleted, loginLoad, loginSuccess } from '../redux/modules/auth';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    const { origin, actions } = this.props;

    this.lock = new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, {
      container: 'auth-container',
      auth: {
        redirectUrl: `${window.location.origin}/login`,
        responseType: 'token',
        params: {
          scope: 'openid name email',
          state: new Buffer(JSON.stringify({ origin })).toString('base64'),
        },
      },
    });
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
  actions: PropTypes.shape({
    push: PropTypes.function,
    loginLoad: PropTypes.function,
    loginSuccess: PropTypes.function,
    loginCompleted: PropTypes.function,
  }).isRequired,
};

Login.defaultProps = {
  origin: '/',
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
