/**
 * @file
 * Link component for react enroute
 */

import React from 'react';

export default function Link({to, children}, {navigate}) {
  function click(e) {
    e.preventDefault();
    navigate(`#!${to}`);
  }

  return (
    <a href={`#!${to}`} onClick={click}>
      {children}
    </a>
  );
}

