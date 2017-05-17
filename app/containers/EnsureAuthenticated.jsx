import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import React, { Component, PropTypes } from 'react';

import { login } from '../redux/modules/auth';

class EnsureAuthenticated extends Component {
  componentDidMount() {
    const { idToken, actions, routing } = this.props;
    if (!idToken) {
      actions.login(routing.locationBeforeTransitions.pathname);
    }
  }

  render() {
    const { idToken, children } = this.props;
    if (!idToken) return null;
    return (<div>
      { children }
    </div>);
  }
}

EnsureAuthenticated.propTypes = {
  idToken: PropTypes.shape({ raw: PropTypes.string }),
  actions: PropTypes.shape({ replace: PropTypes.function }).isRequired,
  children: PropTypes.element.isRequired,
  routing: PropTypes.shape({
    locationBeforeTransitions: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

EnsureAuthenticated.defaultProps = {
  idToken: null,
};

export default connect(
    (state, ownProps) =>  // mapStateToProps
       ({
         idToken: state.auth.idToken,
         children: ownProps.children,
         routing: state.routing,
       }),
    dispatch => ({
      actions: bindActionCreators({
        replace,
        login,
      }, dispatch),
    }),

)(EnsureAuthenticated);
