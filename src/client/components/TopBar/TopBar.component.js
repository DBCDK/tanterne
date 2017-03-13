/**
 * @file
 * The top bar, which is displayed globally, is defined here.
 */

// Libraries
import React, {Component} from 'react';

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
        <a className="top-bar--link" href="/#!/help">
          <img className="top-bar--question" src="/question.png"/>
        </a>
      </div>
    );
  }
}

TopBarComponent.displayName = 'TopBar';

