import React from 'react';
import PropTypes from 'prop-types';

import {Plus} from '../svg/svg.container';

/**
 * Generates a button that when clicked will ensure the given index is added/remove to/from the cart
 *
 * @param {string }index
 * @param {Object} cart
 * @return {XML}
 * @constructor
 */
export function CartButton({index, cart, color}) {
  if (!index || !cart) {
    return null;
  }

  const inCart = Object.keys(cart.contents).includes(index);
  const tooltip = inCart ? `Fjern ${index} fra kurv` : `Tilføj ${index} til kurv`;
  const inCartClass = inCart ? ' in-cart' : '';

  return (
    <div
      className={` cart-button-container add-or-remove-item${inCartClass}`}
      id={`cart-button-${index.replace('.', '-')}`}
      onClick={cart.addOrRemoveContent.bind(this, {index: index})}
      title={tooltip}>
      <Plus color={color} title={inCart ? 'fjern' : 'tilføj'} />
    </div>
  );
}

CartButton.propTypes = {
  index: PropTypes.string.isRequired,
  cart: PropTypes.object.isRequired
};
