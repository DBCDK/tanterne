/* eslint-disable no-undef */
const chai = require('chai');
const assert = chai.assert;
chai.should();

describe('Testing Hierarchy', () => {
  it('Should render hierarchy', () => {
    browser.url('/#!/hierarchy/40-49');
    browser.pause(200);

    const text = browser.getText('.selected .dk5')[0];
    assert.equal(text, '40-49', 'title is present');

    const level = browser.getText('.selected .hierarchy-level')[0];
    assert.include(level, 'Andre verdensdele', 'sublevel is present');
  });

  it('Click on sublevel', () => {
    browser.url('/#!/hierarchy/40-49');
    browser.pause(200);
    browser.click('[href="#!/hierarchy/40"]');
    browser.pause(20000);

    const text = browser.getText('.selected h2 .dk5')[0];
    assert.equal(text, '40', 'title is present');

    const topics = browser.getText('.selected .hierarchy-topics')[0];
    assert.include(topics, 'Flyveulykker', 'first topic is present');
  });

  it('Click between levels', () => {
    browser.url('/#!/hierarchy/40-49');
    browser.pause(200);
    assert.equal(browser.getText('.selected .dk5')[0], '40-49', 'toplevel is selected');

    browser.click('[href="#!/hierarchy/40"]');
    browser.pause(200);
    assert.equal(browser.getText('.selected .dk5')[0], '40', '2. level is selected');

    browser.click('[href="#!/hierarchy/40.6"]');
    browser.pause(200);
    assert.equal(browser.getText('.selected .dk5')[0], '40.6', '3. level is selected');

    browser.click('[href="#!/hierarchy/40-46"]');
    browser.pause(200);
    assert.equal(browser.getText('.selected .dk5')[0], '40-46', 'toplevel is selected');

  });
});
