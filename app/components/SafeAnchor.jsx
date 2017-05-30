import PropTypes from 'prop-types';
import React from 'react';

export default function SafeAnchor({ onClick, ...rest }) {
  const handleClick = (e) => {
    e.preventDefault();
    return onClick(e);
  };
  return <a href="#" onClick={handleClick} {...rest} />; // eslint-disable-line jsx-a11y/anchor-has-content,jsx-a11y/href-no-hash
}

SafeAnchor.propTypes = {
  onClick: PropTypes.func,
};

SafeAnchor.defaultProps = {
  onClick: () => {},
};
