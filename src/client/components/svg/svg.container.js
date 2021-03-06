/* eslint-disable */

import React from 'react';

export const Arrow = ({ className = '' }) => {
  return (
    <svg className={`arrow ${className}`} height="32px" viewBox="0 0 32 32" width="32px">
      <title>Pil ned</title>
      <path
        d="M24.285,11.284L16,19.571l-8.285-8.288c-0.395-0.395-1.034-0.395-1.429,0  c-0.394,0.395-0.394,1.035,0,1.43l8.999,9.002l0,0l0,0c0.394,0.395,1.034,0.395,1.428,0l8.999-9.002  c0.394-0.395,0.394-1.036,0-1.431C25.319,10.889,24.679,10.889,24.285,11.284z"
      />
    </svg>
  );
};

export const Plus = ({ className = '', color = 'black', title = 'tilføj' }) => {
  return (
    <svg className={`plus ${className}`} viewBox="0 0 56 56" fill={color}>
      <title>{title}</title>
      <path d="M28,.5a28,28,0,1,0,28,28A28,28,0,0,0,28,.5ZM28,53A24.5,24.5,0,1,1,52.5,28.5,24.53,24.53,0,0,1,28,53Z" />
      <path d="M42,26.75H29.75V14.5a1.75,1.75,0,0,0-3.5,0V26.75H14a1.75,1.75,0,0,0,0,3.5H26.25V42.5a1.75,1.75,0,0,0,3.5,0V30.25H42a1.75,1.75,0,0,0,0-3.5Z" />
    </svg>
  );
};
