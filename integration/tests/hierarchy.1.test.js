/* eslint-disable no-undef */
const chai = require('chai');
const assert = chai.assert;
chai.should();

describe('Testing Hierarchy 1', () => {
  it('Should render hierarchy', () => {
    browser.url('/#!/hierarchy/40-49');
    browser.pause(200);

    const text = browser.getText('.selected .dk5')[0];
    assert.equal(text, '40-49', 'title is present');

    const level = browser.getText('.selected .hierarchy-level')[0];
    assert.include(level, 'Geografi og rejser i alm.', 'sublevel is present');
  });
});
