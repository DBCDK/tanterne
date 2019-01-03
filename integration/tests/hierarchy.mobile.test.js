/* eslint-disable no-undef */
const chai = require('chai');
const assert = chai.assert;
chai.should();

describe('Testing Hierarchy in mobile view', () => {

  beforeEach(() => {
    browser.setViewportSize({
      width: 320,
      height: 568
    }, true);

    browser.url('/');
    browser.pause(200);
  });

  it('It should do nothing', () => {
    // bugfix beforeEach does not set viewPortSize the first time
  });

  it('Should navigagte to frontpage', () => {
    browser.click('.category-tile--container');
    browser.waitForVisible('.hierarchy--navbar--href', 1000);
    browser.click('.hierarchy--navbar--href');
    browser.waitForVisible('.search-field--button--text', 1000);
    assert.equal(browser.getUrl(), 'http://localhost:4013/');
  });

  it('Should navigate back to the frontpage', () => {
    browser.url('/#!/hierarchy/00.109');
    browser.waitForVisible('.hierarchy--navbar--title', 1000);
    assert.isTrue(browser.getAttribute('.hierarchy--navbar--href', 'href').includes('/#!/hierarchy/00.1'));

    browser.click('.hierarchy--navbar--href');
    browser.pause(200);
    assert.isTrue(browser.getAttribute('.hierarchy--navbar--href', 'href').includes('/#!/hierarchy/00'));

    browser.click('.hierarchy--navbar--href');
    browser.pause(200);
    assert.isTrue(browser.getAttribute('.hierarchy--navbar--href', 'href').includes('/#!/hierarchy/00-07'));

    browser.click('.hierarchy--navbar--href');
    browser.pause(200);
    assert.isTrue(browser.getAttribute('.hierarchy--navbar--href', 'href').includes('/'));

    browser.click('.hierarchy--navbar--href');
    browser.pause(200);
    assert.isFalse(browser.isVisible('.hierarchy--navbar'));
  });
});
