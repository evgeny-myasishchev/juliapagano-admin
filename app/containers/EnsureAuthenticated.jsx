import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push, replace } from 'react-router-redux';
import React, { Component, PropTypes } from 'react';

class EnsureAuthenticated extends Component {
  componentDidMount() {
    const { user, actions } = this.props;
    if (!user) {
      actions.push('/login');
    }
  }

  render() {
    const { user, children } = this.props;
    if (!user) return null;
    return (<div>
      <h1>Hello, {user.name}</h1>
      { children }
    </div>);
  }
}

EnsureAuthenticated.propTypes = {
  user: PropTypes.shape({ name: PropTypes.string }),
  actions: PropTypes.shape({ replace: PropTypes.function }).isRequired,
  children: PropTypes.element.isRequired,
};

EnsureAuthenticated.defaultProps = {
  user: null,
};

export default connect(
    (state, ownProps) =>  // mapStateToProps
       ({
         children: ownProps.children,
       }),
    dispatch => ({
      actions: bindActionCreators({
        replace,
        push,
      }, dispatch),
    }),

)(EnsureAuthenticated);
