/**
 * @file
 * The top bar, which is displayed globally, is defined here.
 */

// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {TopbarCartItem} from '../Cart/TopbarCartItem.component';

export class TopBarComponent extends Component {
  clearCart() {
    location.reload();
  }

  render() {
    const cart = this.props.pro ? <TopbarCartItem cart={this.props.cart}/> : null;

    let topBarCaption = 'Find en bog med DK5';
    if (this.props.pro) {
      topBarCaption = 'DK5 PRO';
    }

    return (
      <div className="top-bar--container">
       {Object.keys(this.props.cart.contents).length > 0 && <a accessKey="T" onClick={this.clearCart.bind(this)}/>}
        <a accessKey="H" className="unlink" href="/">
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
  cart: PropTypes.object.isRequired,
  pro: PropTypes.bool.isRequired
};

