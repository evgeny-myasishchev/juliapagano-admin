import React from 'react';

import AuthService from '../auth/AuthService';

import './Login.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    // this.auth = props.auth;
  }

  componentDidMount() {
    // this.auth.lock.show();
  }

  componentWillUnmount() {
    // this.auth.lock.hide();
  }

  render() {
    return (
      <div className="row" id="auth-container">Loading...</div>
    );
  }
}
