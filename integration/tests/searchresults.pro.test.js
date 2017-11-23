/* eslint-disable no-undef */
import {assert} from 'chai';
const {getBaseUrl} = require('../utils/browser.util');

describe('Testing the serchresultspage on pro version', () => {
  beforeEach(() => {
    browser.url(`${getBaseUrl(true)}/#!/search/geologi/10/0/relevance/dictionary`);
    browser.pause(200);
  });

  it('CartButton on items should be visble', () => {
    assert.isTrue(browser.isVisible('#cart-button-55-1'));
    const allCartButtons = browser.elements('.cart-button-container').value;
    assert.equal(allCartButtons.length, 4);
  });

  it('Should display the comparer when adding an item', () => {
    assert.isFalse(browser.isVisible('.comparer--content'));

    browser.click('#cart-button-55-1');
    browser.pause(500);
    assert.isTrue(browser.isVisible('.comparer--content'));
  });
});
