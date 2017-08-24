/* eslint-disable no-undef */
const chai = require('chai');
const assert = chai.assert;
chai.should();

describe('Testing Hierarchy 3', () => {
  it('Click between levels', () => {
    browser.url('/#!/hierarchy/40-49');
    browser.pause(200);
    assert.equal(browser.getText('.selected .dk5')[0], '40-49', 'toplevel is selected');

    browser.click('[href="#!/hierarchy/40"]');
    browser.pause(200);
    assert.equal(browser.getText('.selected .dk5')[0], '40', '2. level is selected');

    browser.click('[href="#!/hierarchy/40.6"]');
    browser.pause(200);
    assert.equal(browser.getText('.selected .dk5'), '40.6', '3. level is selected');

    browser.click('[href="#!/hierarchy/40-49"]');
    browser.pause(200);
    assert.equal(browser.getText('.selected .dk5')[0], '40-49', 'toplevel is selected');
  });
});
