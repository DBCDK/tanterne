import React from 'react';
import {CartButton} from '../Cart/CartButton.component';

/**
 *
 * @param {Object} data
 * @param {React.ComponentElement} cartButton
 * @return {React.ComponentElement | null}
 * @constructor
 */
function CamparerItem({data, cartButton}) {
  if (!data) {
    return null;
  }

  return (
    <div className="comparer--item">
      <span>{data.index}</span>
      <span>{data.title}</span>
      <span>{data.note}</span>
      <span>{cartButton}</span>
    </div>
  );
}

export default class ComparerContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = Object.keys(this.props.cart.contents).map((index) => {
      const data = this.props.cart.contents[index].data;
      const cartButton = <CartButton index={index} cart={this.props.cart}/>;
      return <CamparerItem data={data} cartButton={cartButton} />;
    });

    return (
      <div id="comparer" className={items.length ? 'show-cart' : 'show-cart'}>
        <div className="comparer--content">
          <span className="comparer--content--headline">Sammenlign poster</span>
          <div className="comparer--content--items-container">{items}</div>
        </div>
      </div>
    );
  }
}

ComparerContainer.propTypes = {
  cart: React.PropTypes.object.isRequired
};
