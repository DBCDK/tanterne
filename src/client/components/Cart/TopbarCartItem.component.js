import React from 'react';

export function TopbarCartItem({cart}) {
  return (
    <span className="top-bar--cart" onClick={cart.toggleCart}>
      <img src="/cart.svg"/>
      <span className='top-bar--cart--count'>{Object.keys(cart.contents).length}</span>
    </span>
  );
}
