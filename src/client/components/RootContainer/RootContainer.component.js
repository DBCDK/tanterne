/**
 * @file
 * Root container component
 */

// Libraries
import React, {Component} from 'react';
import {Router, Route} from 'react-enroute';

// Components
import {HierarchyContainerComponent} from '../HierarchyContainer/HierarchyContainer.component';
import {SearchResultsContainerComponent} from '../SearchResultsContainer/SearchResultsContainer.component';
import {TopBarComponent} from '../TopBar/TopBar.component';

// Helper function
function getHash(hash) {
  if (typeof hash === 'string' && hash.length > 0) {
    if (hash.substring(0, 2) === '#!') {
      return hash.substring(2).length === 0 ? '/' : hash.substring(2);
    }

    return hash;
  }

  return '/';
}

// Global state object
const state = {
  location: getHash(window.location.hash),
  search: {
    categories: {
      '00 - 07': {
        label: 'Bogvæsen. Biblioteker. Museer. Medier. Leksika og blandede værker',
        href: '',
        backgroundImage: '/categories/bogvaesen.jpg'
      },
      '10 - 19': {
        label: 'Filosofi. Psykologi. Videnskab og forskning. Kommunikation og IT',
        href: '',
        backgroundImage: '/categories/filosofi.jpg'
      },
      '20 - 29': {
        label: 'Religion',
        href: '',
        backgroundImage: '/categories/religion.jpg'
      },
      '30 - 39': {
        label: 'Samfundsfag. Pædagogik. Forsorg. Folkekultur',
        href: '',
        backgroundImage: '/categories/samfundsfag.jpg'
      },
      '40 - 49': {
        label: 'Geografi og rejser. Lokalhistorie.',
        href: '',
        backgroundImage: '/categories/geografi.jpg'
      },
      '50 - 59': {
        label: 'Naturvidenskab. Matematik. Antropologi og etnografi.',
        href: '',
        backgroundImage: '/categories/naturvidenskab.jpg'
      },
      '60 - 69': {
        label: 'Teknik. Sygdom og sundhed. Erhverv. Hus og hjem.',
        href: '',
        backgroundImage: '/categories/teknik.jpg'
      },
      '70 - 79': {
        label: 'Kultur. Kunstarter. Sport',
        href: '',
        backgroundImage: '/categories/kultur.jpg'
      },
      '80 - 89': {
        label: 'Litteratur. Sprog',
        href: '',
        backgroundImage: '/categories/litteratur.jpg'
      },
      '90 - 99': {
        label: 'Historie. Biografier og erindringer',
        href: '',
        backgroundImage: '/categories/historie.jpg'
      }
    }
  },
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
      }
    };
  }

  render() {
    return (
      <div>
        <TopBarComponent />

        <Router {...this.state}>
          <Route path="/" component={SearchResultsContainerComponent} />
          <Route path="/hierarchy/:id" component={HierarchyContainerComponent} />
          <Route path="/search/:q/:limit/:offset/:sort/:spell?" component={SearchResultsContainerComponent} />
        </Router>
      </div>
    );
  }
}

RootContainerComponent.displayName = 'RootContainer';
