/**
 * @file
 * Search results are collected and rendered here
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import request from 'superagent';

import {SearchFieldComponent} from '../SearchField/SearchField.component';
import Link from '../Link';
import {Spinner} from '../General/spinner.component';
import {CartButton} from '../Cart/CartButton.component';

function parseSearchResult(result) {
  return result.map(level => {
    const {title, items, decommissioned, index, parent} = level;
    const subLevel = items && items.length && parseSearchResult(items) || [];
    return {
      title,
      dk5: index && {index, title} || null,
      decommissioned: decommissioned || false,
      items: subLevel,
      parent: parent && parent.title
    };
  });
}

const SearchResultSingle = ({title, dk5, parent, pro, cart, decommissioned}) => {
  const infoDecommissioned = decommissioned ? 'decommissioned' : '';
  return (
    <div className={`result-element ${infoDecommissioned}`}>
      <h2>
        <span className="result-element-title">{title},&nbsp;</span>
        <span className="result-element-link">se <Link to={`/hierarchy/${dk5.index}`}>{dk5.index}</Link> {parent}</span>
        {pro && <CartButton index={dk5.index} cart={cart}/>}
      </h2>
    </div>
  );
};

const SearchResultGroup = ({title, items, pro, cart}) => {
  return (
    <div className="result-group">
      <h2><span className="name">{title}</span></h2>
      <ul className="result-list">
        {items.map(el => <li key={el.dk5.index}><SearchResultSingle pro={pro} cart={cart} {...el}/></li>)}
      </ul>
    </div>
  );
};

export class SearchResultsContainerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      corrections: {},
      searchResults: {},
      query: '',
      suggestions: {}, // As in spelling suggestions
      pendingSearch: false,
      error: ''
    };
  }

  componentDidMount() {
    this.searchWasTriggered(this.props);
  }

  componentDidUpdate() {
    this.searchWasTriggered(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location === '/') {
      this.setState({query: ''});
    }
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

      setTimeout(() => {
        this.setState({pendingSearch: true});
      }, 100);

      request
        .get(searchUrl)
        .set('Accept', 'application/json')
        .end((err, res) => {
          let error = '';

          if (err) {
            console.error(err); // eslint-disable-line no-console
          }

          if (res.body.isIndex) {
            window.location = `/#!/hierarchy/${res.body.parameters.query}`;
          }

          try {
            const bd = JSON.parse(res.text);
            searchResults[searchUrl] = parseSearchResult(bd.result || []);
            const corrections = this.state.corrections;
            const suggestions = this.state.suggestions;

            if (bd.correction && bd.correction.q) {
              corrections[searchUrl] = bd.correction;
            }

            if (bd.correction && bd.correction.suggestions) {
              suggestions[searchUrl] = bd.correction.suggestions;
            }

            this.setState({
              corrections,
              suggestions,
              searchResults: searchResults
            });

          }
          catch (e) {
            error = 'Der skete desværre en fejl. Prøv evt. at ændre din søgning en smule og søg igen';
          }

          this.setState({
            query: searchUrl,
            pendingSearch: false,
            error: error
          });
        });
    }
    else if (q && this.state.query !== searchUrl) {
      this.setState({
        query: searchUrl
      });
    }
  }

  renderCategoryTile(categoryIndex, category) {
    const styles = {
      backgroundImage: `url(${category.backgroundImage})`
    };

    return (
      <a style={styles} href={`#!/hierarchy/${category.index}`} className='category-tile--container' id={`category-tile--container--${category.index}`}>
        <div className='category-tile--gradient'>
          <div className='category-tile--text-container'>
            <span className='category-tile--label'>{category.label}</span>
            <span className='category-tile--index'>{categoryIndex}</span>
          </div>
        </div>
      </a>
    );
  }

  renderCategoryTiles(categories) {
    const tiles = Object.keys(categories)
      .map(categoryIndex => this.renderCategoryTile(categoryIndex, categories[categoryIndex]));

    return (
      <div className='category-tiles--container'>
        <div className='category-tiles--title'>
          <h2>Eller vælg her</h2>
        </div>
        <div className='category-tiles'>
          {tiles}
        </div>
      </div>
    );
  }

  renderSpellingError(correction) {
    return (
      <div className="spelling-error">
        <span>
          Din søgning gav ikke nogle resultater, vi har i stedet søgt på <span className="spelling-error--correction">{correction.q}</span>.
          Hvis du vil prøve din søgning alligevel <Link to={correction.href}>klik her!</Link>
        </span>
      </div>
    );
  }

  renderNoResults() {
    let message = '';
    let suggestions = '';

    if (this.state.pendingSearch) {
      message = 'Søger efter emner...';
    }
    else if (this.state.error.length) {
      message = this.state.error;
    }
    else if (this.state.suggestions[this.state.query] && this.state.suggestions[this.state.query].length) {
      message = 'Vi fandt ikke nogen resultater denne gang, prøv med nogle af disse søgninger!';
      suggestions = this.state.suggestions[this.state.query].map(sug => {
        return (
          <div key={sug.href} className="spelling-suggestion">
            <Link to={sug.href} key={sug.match}>{sug.match}</Link>
          </div>
        );
      });
    }

    return (
      <div className="search-result--messages">
        <div className="search-result--spinner">
          {this.state.pendingSearch && <Spinner size="medium"/>}
        </div>
        {message}
        {suggestions}
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
        pro={false}
      />
    );

    const results = (this.state.searchResults[this.state.query] || []).map(entry => {
      if (!entry.dk5) {
        return null;
      }
      if (entry.items.length <= 1) {
        return (
          <div className="result-group">
            <SearchResultSingle key={entry.dk5.index} cart={this.props.cart} {...entry} />
          </div>
        );
      }

      return (<SearchResultGroup key={entry.title} pro={this.props.pro} cart={this.props.cart} {...entry} />);
    });

    return (
      <div className={`container ${Object.keys(this.props.cart.contents).length ? 'show-cart' : ''}`}>
        {searchField}
        {this.state.corrections[this.state.query] && this.renderSpellingError(this.state.corrections[this.state.query])}
        {results.length && results || !this.state.query && this.renderCategoryTiles(this.props.search.categories) || this.renderNoResults()}
      </div>
    );
  }
}

SearchResultsContainerComponent.displayName = 'SearchResults';
SearchResultsContainerComponent.propTypes = {
  cart: PropTypes.object.isRequired,
  params: PropTypes.object,
  search: PropTypes.object,
  suggest: PropTypes.object
};
