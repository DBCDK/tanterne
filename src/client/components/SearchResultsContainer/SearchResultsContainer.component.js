/**
 * @file
 * Search results are collected and rendered here
 */

import React, {Component, PropTypes} from 'react';
import request from 'superagent';

import {SearchFieldComponent} from '../SearchField/SearchField.component';
import Link from '../Link';

function parseSearchResult(result) {
  return result.map(level => {
    const {title, items, index, parent} = level;
    const subLevel = items && items.length && parseSearchResult(items) || [];
    return {
      title,
      dk5: index && {index, title} || null,
      items: subLevel,
      parent: parent && parent.title
    };
  });
}

const SearchResultSingle = ({title, dk5, parent}) => {
  return (
    <div className="result-element">
      <h2>
        {title}
        <span className="result-element-link">, se <Link to={`/hierarchy/${dk5.index}`}>{dk5.index}</Link> {parent}</span>
      </h2>
    </div>
  );
};
const SearchResultGroup = ({title, items}) => {

  return (
    <div className="result-group">
      <h2><span className="name">{title}</span></h2>
      <ul className="result-list">
        {items.map(el => <li key={el.dk5.index}><SearchResultSingle {...el}/></li>)}
      </ul>
    </div>
  );
};

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
          searchResults[searchUrl] = parseSearchResult(bd.result || []);
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
      if (entry.dk5) {
        return (<SearchResultSingle key={entry.dk5.index} {...entry} />);
      }
      return (<SearchResultGroup key={entry.title} {...entry} />);
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
