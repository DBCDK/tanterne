/* eslint-disable no-undef */
const chai = require('chai');
const assert = chai.assert;
const should = chai.should();

describe('Testing searchField', () => {
  beforeEach(() => {
    browser.url('/');
    browser.pause(200);
  });

  it('Should render searchField', () => {
    const text = browser.getAttribute('.search-field', 'placeholder');
    assert.equal(text, 'Skriv emne', 'Element has placeholder');
  });

  it('should change url when searching', () => {
    const searchValue = 'geografi';
    const bUrl = browser.url().value
    browser.element('.search-field').setValue(searchValue);
    browser.element('.search-field--container').submitForm();

    const aUrl = browser.url().value;
    aUrl.should.not.equal(bUrl);
    aUrl.should.contain(searchValue)
  });

  it('should display suggestions', () => {
    const searchValue = 'geografi';
    browser.element('.search-field').setValue(searchValue);
    browser.pause();

    const labels = browser.getText('.suggestions--suggestion');
    labels.should.contain('geografi');
    labels.should.contain('geografisk');
    labels.should.contain('geografiundervisning');
  });
});
