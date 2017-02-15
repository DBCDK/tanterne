/**
 * @file
 * Search results are collected and rendered here
 */

import React, {Component, PropTypes} from 'react';
import request from 'superagent';

import {SearchFieldComponent} from '../SearchField/SearchField.component';
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
    const {limit = 10, offset = 0, q = null, sort = 'relevance', spell = 'dictionary'} = props.params;
    const searchUrl = encodeURI(`/api/search?q=${q}&limit=${limit}&offset=${offset}&sort=${sort}&spell=${spell}`);

    if (q && !searchResults[searchUrl]) {
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

  renderCategoryTile(categoryIndex, category) {
    const styles = {
      backgroundImage: `url(${category.backgroundImage})`
    };

    return (
      <a style={styles} href={category.href} className='category-tile--container'>
        <div className='category-tile--gradient'>
          <div className='category-tile--text-container'>
            <span className='category-tile--label'>{category.label}</span>
            <span className='category-tile--index'>{categoryIndex}</span>
          </div>
        </div>
      </a>
    );
  }

  renderCategoryTiles(categories, searchField) {
    const tiles = Object.keys(categories)
      .map(categoryIndex => this.renderCategoryTile(categoryIndex, categories[categoryIndex]));

    return (
      <div className='category-tiles--container'>
        {searchField}

        <div className='category-tiles--title'>
          <h2>Eller vælg her</h2>
        </div>

        <div className='category-tiles'>
        {tiles}
        </div>
      </div>
    );
  }

  render() {
    const params = this.props.params || {};
    const searchField = (
      <SearchFieldComponent
        search={this.props.search}
        suggest={this.props.suggest}
        params={params}
      />
    );

    const results = (this.state.searchResults[this.state.query] || []).map(entry => {
      return (
        <div key={entry.dk5.index}>
          <Link to={`/hierarchy/${entry.dk5.index}`}>
          {entry.title}
          </Link>
        </div>
      );
    });

    if (!params.q) {
      return this.renderCategoryTiles(this.props.search.categories, searchField);
    }

    if (results.length < 1) {
      return (
        <div>
          {searchField}

          Searching!
        </div>
      );
    }

    return (
      <div>
        {searchField}
        {results}
      </div>
    );
  }
}

SearchResultsContainerComponent.displayName = 'SearchResults';
SearchResultsContainerComponent.propTypes = {
  params: PropTypes.object,
  search: PropTypes.object,
  suggest: PropTypes.object
};
