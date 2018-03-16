/* eslint-disable no-undef */

/**
 * Browser utils
 */

export function getBaseUrl(pro) {
  if (pro) {
    return `${process.env.HOST}:${process.env.PRO_PORT}`;
  }

  return `${process.env.HOST}:${process.env.PORT}`;
}

browser.addCommand('customSynchronouslyGetTexts', selector => $$(selector).map(el => el.getText()));
