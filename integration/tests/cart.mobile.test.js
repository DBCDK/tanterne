/* eslint-disable no-undef */
const {assert} = require('chai');
const {getBaseUrl} = require('../utils/browser.util');

describe('Testing cart on pro site (small screen)', () => {
  beforeEach(() => {
    browser.setViewportSize({
      width: 320,
      height: 568
    }, true);

    browser.url(`${getBaseUrl(true)}/`);
    browser.pause(200);
  });

  it('It should add item to cart', () => {
    browser.url(`${getBaseUrl(true)}/#!/hierarchy/40-49`);
    browser.pause(200);

    let cartCount = browser.getText('.hierarchy--navbar--cart .top-bar--cart--count');
    assert.equal(cartCount, 0);
    browser.click('#cart-button-48');

    cartCount = browser.getText('.hierarchy--navbar--cart .top-bar--cart--count');
    assert.equal(cartCount, 1);
  });

  it('It should add two items to cart and remove the first one', () => {
    browser.url(`${getBaseUrl(true)}/#!/hierarchy/40-49`);
    browser.pause(200);

    let cartCount = browser.getText('.hierarchy--navbar--cart .top-bar--cart--count');
    assert.equal(cartCount, 0);
    browser.click('#cart-button-48');

    cartCount = browser.getText('.hierarchy--navbar--cart .top-bar--cart--count');
    assert.equal(cartCount, 1);

    browser.click('#cart-button-41');

    cartCount = browser.getText('.hierarchy--navbar--cart .top-bar--cart--count');
    assert.equal(cartCount, 2);

    browser.click('#cart-button-48');
    cartCount = browser.getText('.hierarchy--navbar--cart .top-bar--cart--count');
    assert.equal(cartCount, 1);
  });

  it('It should display the comparer overlay when the cart is clicked', () => {
    browser.url(`${getBaseUrl(true)}/#!/hierarchy/40-49`);

    assert.isFalse(browser.isVisible('#comparer'));
    browser.click('.hierarchy--navbar--cart .top-bar--cart');
    assert.isTrue(browser.isVisible('#comparer'));
  });

  it('It should display the selected item in the comparer', () => {
    browser.url(`${getBaseUrl(true)}/#!/hierarchy/40-49`);

    browser.waitForVisible('#cart-button-48');
    browser.click('#cart-button-48');
    assert.isFalse(browser.isVisible('#item-index-48'));

    browser.click('.hierarchy--navbar--cart .top-bar--cart');
    assert.isTrue(browser.isVisible('#item-index-48'));
  });

  it('It should remove the item from cart', () => {
    browser.url(`${getBaseUrl(true)}/#!/hierarchy/40-49`);

    // add item to cart
    browser.click('#cart-button-48');

    // open cart
    browser.click('.hierarchy--navbar--cart .top-bar--cart');

    // remove item from cart
    browser.click('#item-index-48 #cart-button-48');

    assert.isFalse(browser.isVisible('#item-index-48'));
  });
});
