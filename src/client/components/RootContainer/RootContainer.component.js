/**
 * @file
 * Root container component
 */

// Libraries
import React, {Component} from 'react';
import {Router, Route} from 'react-enroute';

// Components
import {SearchFieldComponent} from '../SearchField/SearchField.component';
import {HierarchyContainerComponent} from '../HierarchyContainer/HierarchyContainer.component';
import {SearchResultsContainerComponent} from '../SearchResultsContainer/SearchResultsContainer.component';
import Link from '../Link';

// Helper function
function getHash(hash) {
  if (typeof hash === 'string' && hash.length > 0) {
    if (hash.substring(0, 2) === '#!') {
      return hash.substring(2);
    }

    return hash;
  }

  return '/';
}

// Global state object
const state = {
  location: getHash(window.location.hash),
  search: {},
  hierarchy: {},
  suggest: {}
};

export class RootContainerComponent extends Component {
  constructor() {
    super();
    this.state = state;
  }

  componentDidMount() {
    window.addEventListener('popstate', () => {
      this.setState({
        location: getHash(window.location.hash)
      });
    });
  }

  getChildContext() {
    return {
      navigate: path => {
        window.location.hash = path;
        this.setState({
          location: getHash(path)
        });
      },
    };
  }

  render() {
    return (
      <div>
        <Link to="/">
          <h1>Tanterne</h1>
        </Link>

        <SearchFieldComponent />

        <Router {...this.state}>
          <Route path="/" component={HierarchyContainerComponent} />
          <Route path="/hierarchy/:id" component={HierarchyContainerComponent} />
          <Route path="/search/:q/:limit/:offset/:sort/:spell?" component={SearchResultsContainerComponent} />
        </Router>
      </div>
    );
  }
}

RootContainerComponent.displayName = 'RootContainer';
