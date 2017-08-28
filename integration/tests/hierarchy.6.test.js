/* eslint-disable no-undef */
const chai = require('chai');
const assert = chai.assert;
chai.should();

describe('Testing Hierarchy 6', () => {
  it('Should hide all but 5 aspects when "Vis Flere" is clicked twice', () => {
    browser.url('/#!/hierarchy/40');

    browser.click('.toggle-button');

    let topics = browser.getText('.selected .hierarchy-topics');
    assert.lengthOf(topics[0].split('\n'), 5);
    assert.lengthOf(topics[1].split('\n'), 12);
    assert.isTrue(browser.isExisting('.selected .show .hierarchy-topics'));

    browser.click('.toggle-button');

    topics = browser.getText('.selected .hierarchy-topics');
    assert.lengthOf(topics[0].split('\n'), 5);
    assert.lengthOf(browser.getText('.selected .hidden .hierarchy-topics'), 0);
  });
});
