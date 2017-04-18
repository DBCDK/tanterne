import React from 'react';

export default class ComparerContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="comparer" className={Object.keys(this.props.cart.contents).length ? 'show-cart' : ''}>
        <h2>Hest</h2>
      </div>
    );
  }
}

ComparerContainer.propTypes = {
  cart: React.PropTypes.object.isRequired
};
