/* eslint-disable no-undef */
const {assert} = require('chai');
const {getBaseUrl} = require('../utils/browser.util');

describe('Testing cart on pro site (desktop)', () => {
  beforeEach(() => {
    browser.setViewportSize({
      width: 1000,
      height: 700
    }, true);

    browser.url(`${getBaseUrl(true)}/`);
    browser.pause(200);
  });

  it('It should display cart', () => {
    browser.isVisible('.top-bar--container .top-bar--cart');
    browser.isVisible('.top-bar--container .top-bar--cart--count');
  });

  it('It should add item to cart', () => {
    browser.url(`${getBaseUrl(true)}/#!/hierarchy/40-49`);
    browser.pause(200);

    let cartCount = browser.getText('.top-bar--container .top-bar--cart--count');
    assert.equal(cartCount, 0);
    browser.click('#cart-button-48');

    cartCount = browser.getText('.top-bar--container .top-bar--cart--count');
    assert.equal(cartCount, 1);
  });

  it('It should add two items to cart and remove the first one', () => {
    browser.url(`${getBaseUrl(true)}/#!/hierarchy/40-49`);
    browser.pause(200);

    let cartCount = browser.getText('.top-bar--container .top-bar--cart--count');
    assert.equal(cartCount, 0);
    browser.click('#cart-button-48');

    cartCount = browser.getText('.top-bar--container .top-bar--cart--count');
    assert.equal(cartCount, 1);

    browser.click('#cart-button-41');

    cartCount = browser.getText('.top-bar--container .top-bar--cart--count');
    assert.equal(cartCount, 2);

    browser.click('#cart-button-48');
    cartCount = browser.getText('.top-bar--container .top-bar--cart--count');
    assert.equal(cartCount, 1);
  });

  it('It should display the selected item in the comparer', () => {
    browser.url(`${getBaseUrl(true)}/#!/hierarchy/40-49`);

    browser.click('#cart-button-48');
    browser.waitForVisible('#item-index-48');
    assert.isTrue(browser.isVisible('#item-index-48'));
  });

  it('It should remove the item from cart', () => {
    browser.url(`${getBaseUrl(true)}/#!/hierarchy/40-49`);

    // add item to cart
    browser.click('#cart-button-48');
    browser.waitForVisible('#item-index-48');

    // remove item from cart
    browser.click('#item-index-48 #cart-button-48');

    assert.isFalse(browser.isVisible('#item-index-48'));
  });
});
