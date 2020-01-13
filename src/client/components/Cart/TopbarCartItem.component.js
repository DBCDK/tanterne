import React from 'react';

export function TopbarCartItem({cart}) {
  const cartLength = Object.keys(cart.contents).length;
  const pointer = cartLength ? 'top-bar--cart--pointer' : '';
  return (
    <span className="top-bar--cart" onClick={cart.toggleCart}>
      <img alt="Tøm kurv" src="/cart.svg"/>
      <span className={`top-bar--cart--count ${pointer}`} onClick={cart.clearCart}>{cartLength}</span>
    </span>
  );
}
