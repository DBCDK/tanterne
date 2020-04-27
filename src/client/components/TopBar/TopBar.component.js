/**
 * @file
 * The top bar, which is displayed globally, is defined here.
 */

// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from '../Link';

import {TopbarCartItem} from '../Cart/TopbarCartItem.component';
const blueHelpIcon = '/question-blue.png';
const greyHelpIIcon = '/question-grey.png';

export class TopBarComponent extends Component {
  constructor() {
    super();
    this.state = {
      helpIcon: greyHelpIIcon
    };
  }

  clearCart() {
    location.reload();
  }

  render() {
    const isSmallScreen = window.innerWidth < 768;
    const inHeirachy = window.location.href.includes('hierarchy');
    const cart = this.props.pro ? <TopbarCartItem cart={this.props.cart} /> : null;

    let topBarCaption = 'DK5';
    if (this.props.pro) {
      topBarCaption = 'DK5 PRO';
    }
    if (isSmallScreen && inHeirachy) {
      return;
    }
    return (
      <div className={'top-bar--container' + (isSmallScreen && inHeirachy ? ' hide-element' : '')}>
        {Object.keys(this.props.cart.contents).length > 0 && <a accessKey="T" onClick={this.clearCart.bind(this)} />}
        <a title="" accessKey="H" className="unlink" href="/" >
          <img alt="DK5 logo" className="top-bar--logo" src="/DK5logo_blue.png" />
          <h1 className="top-bar--caption">
            {topBarCaption}
          </h1>
        </a>
        {cart}
        <Link title="Hjælp" className="top-bar--link" to="#!/help"
          onFocus={() => this.setState({helpIcon: blueHelpIcon})}
          onBlur={() => this.setState({helpIcon: greyHelpIIcon})}
        >
          <img alt="Hjælp" className="top-bar--question"
            src={this.state.helpIcon}
            onMouseOver={() => this.setState({helpIcon: blueHelpIcon})}
            onMouseOut={() => this.setState({helpIcon: greyHelpIIcon})}
          />
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

