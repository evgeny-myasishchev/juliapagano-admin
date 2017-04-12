import React from 'react';

import AuthService from '../auth/AuthService';

export default function Login({ auth }) {
  // auth.login();
  return (
    <div>
      <h1>Hello #Login</h1>
      <button onClick={() => auth.login()}>Login</button>
    </div>
  );
}

Login.propTypes = {
  auth: React.PropTypes.instanceOf(AuthService).isRequired,
};
