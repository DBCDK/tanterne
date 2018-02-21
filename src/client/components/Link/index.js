/**
 * @file
 * Link component for react enroute
 */

import React from 'react';
import PropTypes from 'prop-types';

export default function Link({to, children, style, className}, {navigate}) {
  function click(e) {
    e.preventDefault();
    navigate(`#!${to}`);
  }

  if (to.indexOf('#!') === 0) {
    to = to.substring(2);
  }

  return (
    <a href={`#!${to}`} onClick={click} style={style} className={className}>
      {children}
    </a>
  );
}

Link.displayName = 'Link';
Link.propTypes = {
  to: PropTypes.string,
  children: PropTypes.any
};

