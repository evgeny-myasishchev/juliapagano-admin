import './Login.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { PropTypes } from 'react';

import { loginCompleted, loginLoad } from '../redux/modules/auth';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    // this.auth = props.auth;
  }

  componentDidMount() {
    this.props.actions.loginLoad();
  }

  componentWillUnmount() {
    this.props.actions.loginCompleted();
  }

  render() {
    return (
      <div className="row" id="auth-container">Loading...</div>
    );
  }
}

Login.propTypes = {
  actions: PropTypes.shape({
    loginLoad: PropTypes.function,
    loginCompleted: PropTypes.function,
  }).isRequired,
};

export default connect(
    () => ({}),
    dispatch => ({
      actions: bindActionCreators({
        loginCompleted, loginLoad,
      }, dispatch),
    }),

)(Login);
