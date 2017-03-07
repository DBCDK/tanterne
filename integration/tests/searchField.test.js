/* eslint-disable no-undef */
const chai = require('chai');
const assert = chai.assert;
chai.should();

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
    const bUrl = browser.url().value;
    browser.element('.search-field').setValue(searchValue);
    browser.element('.search-field--container').submitForm();

    const aUrl = browser.url().value;
    aUrl.should.not.equal(bUrl);
    aUrl.should.contain(searchValue);
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

  it('should redirect on suggestion click', () => {
    const bUrl = browser.url().value;
    const searchValue = 'geografi';
    browser.element('.search-field').setValue(searchValue);
    browser.pause();

    browser.$('.suggestions--suggestion').click();
    const aUrl = browser.url().value;
    aUrl.should.not.equal(bUrl);
    aUrl.should.contain(searchValue);
  });

  it('should respond to arrow keys', () => {
    const bUrl = browser.url().value;
    const searchValue = 'geografi';
    const suggestValue = 'geografisk'
    browser.element('.search-field').setValue(searchValue);
    browser.pause();

    // Press down twice, then press enter
    browser.keys('\uE015\uE015\uE007');
    const aUrl = browser.url().value;
    aUrl.should.not.equal(bUrl);
    aUrl.should.contain(suggestValue);
  });
});
