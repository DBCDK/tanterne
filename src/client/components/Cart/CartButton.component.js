import React from 'react';

import {Plus} from '../svg/svg.container';

export function CartButton({index, cart}) {
  const inCart = Object.keys(cart.contents).includes(index);
  const tooltip = inCart ? 'Fjern fra kurv' : 'Tilføj til kurv';
  const inCartClass = inCart ? ' in-cart' : '';

  return (
    <span
      className={`add-or-remove-item${inCartClass}`}
      id={`cart-button-${index}`}
      onClick={cart.addOrRemoveContent.bind(this, {index: index})}
      title={tooltip}>
      <Plus />
    </span>
  );
}

CartButton.propTypes = {
  index: React.PropTypes.string.isRequired,
  cart: React.PropTypes.object.isRequired
};
