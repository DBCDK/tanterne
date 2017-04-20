import React from 'react';

export function TopbarCart({cart}) {
  return (
    <span className="top-bar--cart" onClick={cart.toggleCart}>
        <img src="/cart.svg"/>
        <span className='top-bar--cart--count'>{Object.keys(cart.contents).length}</span>
      </span>
  );
}

TopbarCart.propTypes = {};
