import React from 'react';

import {Plus} from '../svg/svg.container';

/**
 * Generates a button that when clicked will ensure the given index is added/remove to/from the cart
 *
 * @param {string }index
 * @param {Object} cart
 * @return {XML}
 * @constructor
 */
export function CartButton({index, cart}) {
  const inCart = Object.keys(cart.contents).includes(index);
  const tooltip = inCart ? `Fjern ${index} fra kurv` : `Tilføj ${index} til kurv`;
  const inCartClass = inCart ? ' in-cart' : '';

  return (
    <div className='cart-button-container'>
      <span
        className={`add-or-remove-item${inCartClass}`}
        id={`cart-button-${index.replace('.', '-')}`}
        onClick={cart.addOrRemoveContent.bind(this, {index: index})}
        title={tooltip}>
      <Plus />
    </span>
    </div>
  );
}

CartButton.propTypes = {
  index: React.PropTypes.string.isRequired,
  cart: React.PropTypes.object.isRequired
};
