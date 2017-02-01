/**
 * @file
 * Search results are collected and rendered here
 */

import React, {Component, PropTypes} from 'react';

export class SearchResultsContainerComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    console.log(this.props)
  }

  render() {
    return (
      <div>
        Searching!
      </div>
    );
  }
}

SearchResultsContainerComponent.displayName = 'SearchResults';
SearchResultsContainerComponent.propTypes = {

};
