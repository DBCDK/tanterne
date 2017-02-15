/**
 * @file
 * Search Field is defined here
 */

// Libraries
import React, {Component, PropTypes} from 'react';
import request from 'superagent';

// Components
import Link from '../Link';
import {SuggestionsComponent} from '../Suggestions/Suggestions.component';

function deferExecution(func, timeout) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(func, timeout, ...arguments);
  };
}

export class SearchFieldComponent extends Component {
  constructor() {
    super();

    this.state = {
      queryUrl: '',
      query: '',
      suggestions: {},
      suggestActive: false,
      selectedSuggestion: -1
    };

    this.onTextEntered = this.onTextEntered.bind(this);
    this.queryWasSubmitted = this.queryWasSubmitted.bind(this);
    this.onSearchBlurred = this.onSearchBlurred.bind(this);
    this.onSearchKeyUp = this.onSearchKeyUp.bind(this);
    this.selectPreviousSuggestion = this.selectPreviousSuggestion.bind(this);
    this.selectNextSuggestion = this.selectNextSuggestion.bind(this);
    this.getSuggestions = deferExecution(this.getSuggestions.bind(this), 200);
  }

  componentDidMount() {
    if (this.props.params.q) {
      this.onTextEntered({
        target: {
          value: this.props.params.q
        },
        noSuggest: true
      });
    }
  }

  getSuggestions(query) {
    const suggestions = this.state.suggestions;
    suggestions[query] = query;
    this.setState({suggestions});

    const suggestUrl = encodeURI(`/api/suggest?q=${query}&limit=10`);
    request
      .get(suggestUrl)
      .set('Accept', 'application/json')
      .end((err, res) => {
        const bd = JSON.parse(res.text);
        const newSuggestions = Object.assign({}, this.state.suggestions);
        newSuggestions[query] = bd.response;
        this.setState({suggestions: newSuggestions});
      });
  }

  onTextEntered(evt) {
    const query = evt.target.value;
    const queryUrl = `/search/${encodeURIComponent(query)}/10/0/relevance/dictionary`;
    this.setState({
      queryUrl,
      query,
      suggestActive: true,
      selectedSuggestion: -1
    });

    // Get suggestions if relevant.
    if (!evt.noSuggest && query.length >= 2 && !this.state.suggestions[query]) {
      this.getSuggestions(query);
    }
  }

  queryWasSubmitted(evt) {
    evt.preventDefault();
    const s = this.state;
    if (s.selectedSuggestion >= 0 && s.suggestions[s.query] && s.suggestions[s.query][s.selectedSuggestion]) {
      return this.context.navigate(s.suggestions[s.query][s.selectedSuggestion].href);
    }

    return this.context.navigate(`#!${this.state.queryUrl}`);
  }

  selectPreviousSuggestion() {
    this.setState({
      selectedSuggestion: this.state.selectedSuggestion - 1
    });
  }

  selectNextSuggestion() {
    this.setState({
      selectedSuggestion: this.state.selectedSuggestion + 1
    });
  }

  onSearchBlurred() {
    this.setState({suggestActive: false});
  }

  onSearchKeyUp(evt) {
    switch (evt.key) {
      case 'Escape': {
        return this.onSearchBlurred();
      }
      case 'ArrowUp': {
        return this.selectPreviousSuggestion();
      }
      case 'ArrowDown': {
        return this.selectNextSuggestion();
      }
      default: {
        return null;
      }
    }
  }

  render() {
    return (
      <form className="search-field--container" onSubmit={this.queryWasSubmitted}>
        <div className="search-field--title">
          <h2>Hvor står bøgerne om...?</h2>
        </div>

        <div className="search-field--suggestions">
          <span className="search-field--query-area">
            <input
              type="text"
              onChange={this.onTextEntered}
              onBlur={this.onSearchBlurred}
              onKeyUp={this.onSearchKeyUp}
              className="search-field"
              placeholder="Skriv emne"
              value={this.state.query}
            />

            <Link to={this.state.queryUrl}>
              <span className="search-field--button">
                <img src="/icon-search.svg" /> SØG
              </span>
            </Link>
          </span>

          <SuggestionsComponent
            query={this.state.query}
            suggestions={this.state.suggestions}
            active={this.state.suggestActive}
            selectedSuggestion={this.state.selectedSuggestion}
          />
        </div>
      </form>
    );
  }
}

SearchFieldComponent.displayName = 'Search';

SearchFieldComponent.propTypes = {
  search: PropTypes.object,
  suggest: PropTypes.object,
  params: PropTypes.object
};

SearchFieldComponent.defaultProps = {
  search: {},
  suggest: {},
  params: {}
};
