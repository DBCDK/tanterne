/**
 * @file
 * Root container component
 */

import React, {Component} from 'react';

export class RootContainerComponent extends Component {
  constructor() {
    super();

    this.state = {
      something: 'bob'
    };
  }

  render() {
    return (
      <div>
        <h1>Tanterne</h1>
      </div>
    );
  }
}
