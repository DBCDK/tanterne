/* eslint-disable no-undef */
const chai = require('chai');
const assert = chai.assert;
chai.should();

describe('Testing Hierarchy', () => {

  it('Should render hierarchy', () => {
    browser.url('/');
    browser.waitForExist('.category-tiles');
    browser.click('[href="#!/hierarchy/40-49"]');
    browser.waitForExist('.selected .dk5');

    const text = browser.customSynchronouslyGetTexts('.selected .dk5')[0];
    assert.equal(text, '40-49', 'title is present');

    const level = browser.customSynchronouslyGetTexts('.selected .hierarchy-level')[0];
    assert.include(level, 'Geografi og rejser i alm.', 'sublevel is present');
  });

  it('Click on sublevel', () => {
    browser.url('/#!/hierarchy/40');
    browser.waitForExist('.selected .dk5');
    const text = browser.customSynchronouslyGetTexts('.selected .hierarchy-level--header .dk5');
    assert.equal(text, '40', 'title is present');

    const topics = browser.customSynchronouslyGetTexts('.selected .hierarchy-topics');
    assert.include(topics[0], 'Flyveulykker', 'first topic is present');
  });

  it('Click between levels', async () => {
    browser.url('/');
    browser.waitForExist('.category-tiles');
    browser.click('[href="#!/hierarchy/40-49"]');
    assert.equal(browser.customSynchronouslyGetTexts('.level-1 > .selected .dk5:first-child')[0], '40-49', 'toplevel is selected');

    browser.click('[href="#!/hierarchy/40"]');
    browser.waitForExist('.level-2 > .selected');
    assert.equal(browser.customSynchronouslyGetTexts('.level-2 > .selected .dk5')[0], '40', '2. level is selected');

    browser.click('[href="#!/hierarchy/40.6"]');
    browser.waitForExist('.level-3 > .selected');

    browser.click('[href="#!/hierarchy/40-49"]');
    browser.waitForExist('.level-1 > .selected');

    assert.equal(browser.customSynchronouslyGetTexts('.selected .dk5')[0], '40-49', 'toplevel is selected');
  });

  it('Should display the first five aspects only', () => {
    browser.url('/#!/hierarchy/40');
    browser.waitForExist('.selected');
    const topics = browser.customSynchronouslyGetTexts('.selected .hierarchy-topics');
    assert.include(topics[0], 'Atlanterhavet\nBjerge\nFlyveulykker\nGeografi\nHave');
    assert.lengthOf(topics[0].split('\n'), 5);
    assert.notInclude(topics[0], 'Lande');
  });

  it('Should display all aspects when "Vis Flere" is clicked', () => {
    browser.url('/#!/hierarchy/40');

    let topics = browser.customSynchronouslyGetTexts('.selected .hierarchy-topics');
    assert.lengthOf(topics[0].split('\n'), 5);
    assert.lengthOf(browser.getText('.selected .hidden .hierarchy-topics'), 0);

    browser.click('.toggle-button');

    topics = browser.customSynchronouslyGetTexts('.selected .hierarchy-topics');
    assert.lengthOf(topics[0].split('\n'), 5);
    assert.lengthOf(topics[1].split('\n'), 12);
    assert.isTrue(browser.isExisting('.selected .show .hierarchy-topics'));
    browser.click('.toggle-button');
  });

  it('Should hide all but 5 aspects when "Vis Flere" is clicked twice', () => {
    browser.url('/#!/hierarchy/40');

    browser.click('.toggle-button');

    let topics = browser.customSynchronouslyGetTexts('.selected .hierarchy-topics');
    assert.lengthOf(topics[0].split('\n'), 5);
    assert.lengthOf(topics[1].split('\n'), 12);
    assert.isTrue(browser.isExisting('.selected .show .hierarchy-topics'));

    browser.click('.toggle-button');

    topics = browser.customSynchronouslyGetTexts('.selected .hierarchy-topics');
    assert.lengthOf(topics[0].split('\n'), 5);
  });
});
