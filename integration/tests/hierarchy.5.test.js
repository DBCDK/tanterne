/* eslint-disable no-undef */
const chai = require('chai');
const assert = chai.assert;
chai.should();

describe('Testing Hierarchy 5', () => {
  it('Should display all aspects when "Vis Flere" is clicked', () => {
    browser.url('/#!/hierarchy/40');

    let topics = browser.getText('.selected .hierarchy-topics');
    assert.lengthOf(topics[0].split('\n'), 5);
    assert.lengthOf(browser.getText('.selected .hidden .hierarchy-topics'), 0);

    browser.click('.toggle-button');

    topics = browser.getText('.selected .hierarchy-topics');
    assert.lengthOf(topics[0].split('\n'), 5);
    assert.lengthOf(topics[1].split('\n'), 6);
    assert.isTrue(browser.isExisting('.selected .show .hierarchy-topics'));
  });
});
