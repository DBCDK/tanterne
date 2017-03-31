/* eslint-disable no-undef */
const chai = require('chai');
const assert = chai.assert;
chai.should();

describe('Testing Hierarchy', () => {
  it('Should render hierarchy', () => {
    browser.url('/#!/hierarchy/65.2');
    browser.pause(200);

    const text = browser.getText('.selected .dk5');
    assert.equal(text, '65.2', 'title is present');

    const topics = browser.getText('.selected .hierarchy-topics');
    assert.contains(topics, 'Administrativ IT', 'first topic is present');

    const levels = browser.getText('.selected .hierarchy-level');
    assert.contains(levels, 'Bogføring. Bogholderi', 'sublevel is present');
  });

  it('Click on sublevel', () => {
    browser.url('/#!/hierarchy/65.2');
    browser.pause(200);
    browser.click('.selected .hierarchy-level a');
    browser.pause(200);

    const text = browser.getText('.selected .dk5');
    assert.equal(text, '65.21', 'title is present');

    const topics = browser.getText('.selected .hierarchy-topics');
    assert.contains(topics, 'Bogføring  - Enkelte fags bogføring må søges under emnet', 'first topic + note is present');
  });

  it('Click on toplevel', () => {
    browser.url('/#!/hierarchy/65.2');
    browser.pause(200);
    browser.click('.level-1 a');
  });
});
