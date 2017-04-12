import React from 'react';

import AuthService from '../auth/AuthService';

export default function Login({ auth }) {
  console.log(auth);
  auth.login();
  return <h1>Hello #Login</h1>;
}

Login.propTypes = {
  auth: React.PropTypes.instanceOf(AuthService).isRequired,
};
