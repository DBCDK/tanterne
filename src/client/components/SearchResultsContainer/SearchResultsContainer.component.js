/**
 * @file
 * Search results are collected and rendered here
 */

import React, {Component, PropTypes} from 'react';
import request from 'superagent';

import Link from '../Link';

export class SearchResultsContainerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: {},
      query: ''
    };
  }

  componentDidMount() {
    this.searchWasTriggered(this.props);
  }

  componentDidUpdate() {
    this.searchWasTriggered(this.props);
  }

  searchWasTriggered(props) {
    const searchResults = this.state.searchResults;
    const {limit = 10, offset = 0, q = '', sort = 'relevance', spell = 'dictionary'} = props.params;
    const searchUrl = encodeURI(`/api/search?q=${q}&limit=${limit}&offset=${offset}&sort=${sort}&spell=${spell}`);

    if (!searchResults[searchUrl]) {
      searchResults[searchUrl] = [];
      this.setState({
        searchResults: searchResults,
        query: searchUrl
      });

      request
        .get(searchUrl)
        .set('Accept', 'application/json')
        .end((err, res) => {
          const bd = JSON.parse(res.text);
          searchResults[searchUrl] = bd.response || [];

          this.setState({
            searchResults: searchResults,
            query: searchUrl
          });
        });
    }
  }

  render() {
    const results = (this.state.searchResults[this.state.query] || []).map(entry => {
      return (
        <div key={entry.dk5.index}>
          <Link to={`/hierarchy/${entry.dk5.index}`}>
          {entry.title}
          </Link>
        </div>
      );
    });

    if (results.length < 1) {
      return (
        <div>
          Searching!
        </div>
      );
    }

    return (
      <div>
        {results}
      </div>
    );
  }
}

SearchResultsContainerComponent.displayName = 'SearchResults';
SearchResultsContainerComponent.propTypes = {
  params: PropTypes.object
};
