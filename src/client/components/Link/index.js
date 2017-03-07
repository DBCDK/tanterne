/**
 * @file
 * Link component for react enroute
 */

import React, {PropTypes} from 'react';

export default function Link({to, children}, {navigate}) {
  function click(e) {
    e.preventDefault();
    navigate(`#!${to}`);
  }

  if (to.indexOf('#!') === 0) {
    to = to.substring(2);
  }

  return (
    <a href={`#!${to}`} onClick={click}>
      {children}
    </a>
  );
}

Link.displayName = 'Link';
Link.propTypes = {
  to: PropTypes.string,
  children: PropTypes.any
};

