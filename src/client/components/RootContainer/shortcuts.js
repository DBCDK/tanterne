/**
 * @file: Define all shortcuts here, this avoids overlap and confusion.
 */

import {bind} from 'mousetrap';

function goHome() {
  window.location.hash = '!/';
  this.setState({
    location: '/'
  });
}

function emptyBasket() {
  this.setState({
    contents: {},
    isToggled: false
  });
}

function goSearch() {
  // goHome.bind(this)();
  const searchFieldList = document.getElementsByClassName('search-field');
  if (searchFieldList.length) {
    searchFieldList[0].focus();
  }
}

function hierarchyTopLevel() {
  window.location.hash = '!/hierarchy/00-07';
  this.setState({
    location: '/hierarchy/00-07'
  });
}

/**
 * Entrypoint, go over all the shortcuts.
 */
export function defineShortcuts(root) {
  [
    {sc: 'g h', func: goHome},
    {sc: 'g s', func: goSearch},
    {sc: 't k', func: emptyBasket},
    {sc: 't n', func: hierarchyTopLevel}
  ].map(shortcut => {
    bind(shortcut.sc, shortcut.func.bind(root), shortcut.on || 'keyup');
  });
}
