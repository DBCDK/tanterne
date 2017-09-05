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

  it('Click on sublevel', () => {
    browser.url('/#!/hierarchy/40-49');
    browser.pause(500);
    browser.click('[href="#!/hierarchy/40"]');
    browser.pause(500);

    const sel = browser.getText('.selected');
    console.log('sel', sel);
    const h2 = browser.getText('.h2');
    console.log('h2', h2);
    const dk5 = browser.getText('.dk5');
    console.log('dk5', dk5);
    const text2 = browser.getText('.selected h2 .dk5');
    console.log('text2', text2);
    const text = browser.getText('.selected h2 .dk5')[0];
    console.log('text', text);
    assert.equal(text, '40', 'title is present');

    const topics = browser.getText('.selected .hierarchy-topics');
    assert.include(topics[0], 'Flyveulykker', 'first topic is present');
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
    assert.equal(browser.getText('.selected .dk5'), '40.6', '3. level is selected');

    browser.click('[href="#!/hierarchy/40-49"]');
    browser.pause(200);
    assert.equal(browser.getText('.selected .dk5')[0], '40-49', 'toplevel is selected');
  });

  it('Should display the first five aspects only', () => {
    browser.url('/#!/hierarchy/40');

    const topics = browser.getText('.selected .hierarchy-topics');

    assert.include(topics[0], 'Atlanterhavet\nBjerge\nFlyveulykker\nGeografi\nHave');
    assert.lengthOf(topics[0].split('\n'), 5);
    assert.notInclude(topics[0], 'Lande');
  });

  it('Should display all aspects when "Vis Flere" is clicked', () => {
    browser.url('/#!/hierarchy/40');

    let topics = browser.getText('.selected .hierarchy-topics');
    assert.lengthOf(topics[0].split('\n'), 5);
    assert.lengthOf(browser.getText('.selected .hidden .hierarchy-topics'), 0);

    browser.click('.toggle-button');

    topics = browser.getText('.selected .hierarchy-topics');
    assert.lengthOf(topics[0].split('\n'), 5);
    assert.lengthOf(topics[1].split('\n'), 12);
    assert.isTrue(browser.isExisting('.selected .show .hierarchy-topics'));
  });

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
