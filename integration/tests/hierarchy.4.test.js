/* eslint-disable no-undef */
const chai = require('chai');
const assert = chai.assert;
chai.should();

describe('Testing Hierarchy 4', () => {
  it('Should display the first five aspects only', () => {
    browser.url('/#!/hierarchy/40');

    const topics = browser.getText('.selected .hierarchy-topics');

    assert.include(topics[0], 'Lokalhistorie');
    assert.lengthOf(topics[0].split('\n'), 5);
    assert.notInclude(topics[0], 'Topografi');
  });
});
