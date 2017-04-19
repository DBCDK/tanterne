/**
 * @file
 * The top bar, which is displayed globally, is defined here.
 */

// Libraries
import React, {Component} from 'react';

export class TopBarComponent extends Component {
  constructor(props) {
    super(props);
  }

  getCart() {
    return (
      <span className="top-bar--cart" onClick={this.props.cart.toggleCart}>
        <img src="/cart.svg"/>
        <span className='top-bar--cart--count'>{Object.keys(this.props.cart.contents).length}</span>
      </span>
    );
  }

  render() {
    const cart = this.props.pro ? this.getCart() : null;

    let topBarCaption = 'Find en bog med DK5';
    if (this.props.pro) {
      topBarCaption = 'DK5 PRO';
    }

    return (
      <div className="top-bar--container">
        <a className="unlink" href="/">
          <img className="top-bar--logo" src="/DK5logo_blue.png"/>
          <span className="top-bar--caption">
            {topBarCaption}
          </span>
        </a>
        {cart}
        <a className="top-bar--link" href="/#!/help">
          <img className="top-bar--question" src="/question.png"/>
        </a>
      </div>
    );
  }
}

TopBarComponent.displayName = 'TopBar';
TopBarComponent.propTypes = {
  cart: React.PropTypes.object.isRequired,
  pro: React.PropTypes.bool.isRequired
};

