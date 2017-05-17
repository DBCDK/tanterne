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

  it('Should navigagte to frontpage', () => {
    browser.click('#category-tile--container--00-07');
    browser.waitForVisible('.hierarchy--navbar--href', 1000);
    browser.click('.hierarchy--navbar--href');
    browser.waitForVisible('.search-field--button--text', 1000);
    assert.equal(browser.getUrl(), 'http://localhost:4013/');
  });
});
