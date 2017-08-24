/* eslint-disable no-undef */
const chai = require('chai');
const assert = chai.assert;
chai.should();

describe('Testing Hierarchy 2', () => {
  it('Click on sublevel', () => {
    browser.url('/#!/hierarchy/40-49');
    browser.pause(200);
    browser.click('[href="#!/hierarchy/40"]');
    browser.pause(200);

    const text = browser.getText('.selected h2 .dk5')[0];
    assert.equal(text, '40', 'title is present');

    const topics = browser.getText('.selected .hierarchy-topics');
    assert.include(topics[0], 'Flyveulykker', 'first topic is present');
  });
});
