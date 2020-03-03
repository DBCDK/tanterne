/**
 * @file
 * The top bar, which is displayed globally, is defined here.
 */

// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from '../Link';

import {TopbarCartItem} from '../Cart/TopbarCartItem.component';

export class TopBarComponent extends Component {
  clearCart() {
    location.reload();
  }

  render() {
    const cart = this.props.pro ? <TopbarCartItem cart={this.props.cart} /> : null;

    let topBarCaption = 'DK5';
    if (this.props.pro) {
      topBarCaption = 'DK5 PRO';
    }

    return (
      <div className="top-bar--container">
        {Object.keys(this.props.cart.contents).length > 0 && <a accessKey="T" onClick={this.clearCart.bind(this)} />}
        <a title="" accessKey="H" className="unlink" href="/">
          <img alt="" className="top-bar--logo" src="/DK5logo_blue.png" />
          <span className="top-bar--caption">
            {topBarCaption}
          </span>
        </a>
        {cart}
        <Link title="Hjælp" className="top-bar--link" to="#!/help">
          <img alt="Hjælp" className="top-bar--question" src="/question.png" />
        </Link>
      </div>
    );
  }
}

TopBarComponent.displayName = 'TopBar';
TopBarComponent.propTypes = {
  cart: PropTypes.object.isRequired,
  pro: PropTypes.bool.isRequired
};

