/* eslint-disable no-undef */
const {assert} = require('chai');
const {getBaseUrl} = require('../utils/browser.util');

describe('Testing reset-to-frontpage functionality', () => {
  beforeEach(() => {
    browser.url('/');
    browser.pause(200);
  });

  it('infobox should be visbible after 5 seconds', () => {
    browser.url(`${getBaseUrl(false)}/#!/hierarchy/10-19`);
    assert.isFalse(browser.isVisible('.reset-to-frontpage--container'));
    browser.pause(7000);
    assert.isTrue(browser.isVisible('.reset-to-frontpage--container'));
  });

  it('infobox should be hidden on frontpage - also after 5 seconds', () => {
    assert.isFalse(browser.isVisible('.reset-to-frontpage--container'));
    browser.pause(7000);
    assert.isFalse(browser.isVisible('.reset-to-frontpage--container'));
  });

  it('should redirect to frontpage after 5 seconds', () => {
    browser.url(`${getBaseUrl(false)}/#!/hierarchy/10-19`);
    assert.isFalse(browser.isVisible('.reset-to-frontpage--container'));
    browser.pause(10000);
    assert.isTrue(browser.isVisible('.reset-to-frontpage--container'));
    browser.pause(7000);
    assert.isFalse(browser.getUrl().includes('/#!/hierarchy/10-19'));
    assert.equal(`${getBaseUrl(false)}/`, browser.getUrl());
  });
});
