/**
 * @file
 * Middleware for setting values in the responseheader
 */

const {VERSION} = require('../utils/version.util');

/**
 * Sets the version of the API in the header on theresponses
 *
 * @param {object} ctx
 * @param {function} next
 */
async function SetVersionHeader(ctx, next) {
  await next();
  ctx.set('X-API-Version', VERSION);
}

module.exports = {
  SetVersionHeader
};
