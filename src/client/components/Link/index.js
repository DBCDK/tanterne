/**
 * @file
 * Link component for react enroute
 */

import React from 'react';
import PropTypes from 'prop-types';

export default function Link({to, children, style, className, title, onFocus, onBlur}, {navigate}) {
  function click(e) {
    e.preventDefault();
    navigate(`#!${to}`);
  }

  if (to.indexOf('#!') === 0) {
    to = to.substring(2);
  }

  return (
    <a href={`#!${to}`} title={title} onClick={click} style={style} className={className} onFocus={onFocus} onBlur={onBlur} >
      {children}
    </a>
  );
}

Link.displayName = 'Link';
Link.propTypes = {
  to: PropTypes.string,
  children: PropTypes.any
};

