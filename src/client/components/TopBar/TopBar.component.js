/**
 * @file
 * The top bar, which is displayed globally, is defined here.
 */

// Libraries
import React, {Component} from 'react';
import Link from '../Link';

export class TopBarComponent extends Component {
  render() {
    return (
      <div className="top-bar--container">
        <a className="unlink" href="/">
          <img className="top-bar--logo" src="/DK5logo_blue.png"/>
        <span className="top-bar--caption">
          Find en bog med DK5
        </span>
        </a>
        <img className="top-bar--question" src="/question.png"/>
      </div>
    );
  }
}

TopBarComponent.displayName = 'TopBar';

