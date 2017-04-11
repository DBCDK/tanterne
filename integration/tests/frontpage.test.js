/* eslint-disable no-undef */
const {assert} = require('chai');
const {getBaseUrl} = require('../utils/browser.util');

describe('Testing frontpage', () => {
  beforeEach(() => {
    browser.url('/');
    browser.pause(200);
  });

  it('Should render frontpage', () => {
    const text = browser.getText('body');
    const expected = 'Find en bog';
    assert.include(text, expected);
  });

  it('Should render pro frontpage', () => {
    browser.url(`${getBaseUrl(true)}/`);
    browser.pause(200);

    const text = browser.getText('body');
    const expected = 'DK5 PRO';

    assert.include(text, expected);
  });
});
