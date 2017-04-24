import {assert} from 'chai';
const {getBaseUrl} = require('../utils/browser.util');

describe('Testing the serchresultspage on normal version', () => {
  beforeEach(() => {
    browser.url(`${getBaseUrl(false)}/#!/search/geologi/10/0/relevance/dictionary`);
    browser.pause(200);
  });

  it('No CartButtons items should be visible', () => {
    assert.isFalse(browser.isVisible('#cart-button-55-1'));

    const allCartButtons = browser.elements('.cart-button-container').value;
    assert.equal(allCartButtons.length, 0);
  });

  it('Should not display the comparer', () => {
    assert.isFalse(browser.isVisible('.comparer--content'));
    assert.isFalse(browser.isVisible('#comparer--content'));
  });
});
