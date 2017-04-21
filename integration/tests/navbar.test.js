/* eslint-disable no-undef */
const {assert} = require('chai');
const {getBaseUrl} = require('../utils/browser.util');

describe('Testing the navbar (small screen)', () => {
  beforeEach(() => {
    browser.setViewportSize({
      width: 320,
      height: 568
    }, true);
  });

  it('It should not display cart on enduser site', () => {
    browser.url(`${getBaseUrl(false)}/#!/hierarchy/40-49`);
    assert.isFalse(browser.isVisible('.hierarchy--navbar--cart'));
    assert.isFalse(browser.isVisible('.hierarchy--navbar--cart .top-bar--cart--count'));
  });

  it('It should display cart on pro site', () => {
    browser.url(`${getBaseUrl(true)}/#!/hierarchy/40-49`);
    assert.isTrue(browser.isVisible('.hierarchy--navbar--cart'));
    assert.isTrue(browser.isVisible('.hierarchy--navbar--cart .top-bar--cart--count'));
  });
});
