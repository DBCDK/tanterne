/**
 * @file
 * Search Field is defined here
 */

// Libraries
import React, {Component} from 'react';

// Components
import Link from '../Link';

export class SearchFieldComponent extends Component {
  constructor() {
    super();

    this.state = {
      query: ''
    }

    this.onTextEntered = this.onTextEntered.bind(this);
    this.queryWasSubmitted = this.queryWasSubmitted.bind(this);
  }

  onTextEntered(evt) {
    const query = `/search/${encodeURIComponent(evt.target.value)}/10/0/relevance/dictionary`;
    this.setState({
      query
    });
  }

  queryWasSubmitted(evt) {
    evt.preventDefault();
    this.context.navigate(`#!${this.state.query}`);
  }

  render() {
    return (
      <form className="search-field--container" onSubmit={this.queryWasSubmitted}>
        <input type="text" onChange={this.onTextEntered} />
        <Link to={this.state.query}>Søg!</Link>
      </form>
    );
  }
}

SearchFieldComponent.displayName = 'Search';

