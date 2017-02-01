/**
 * @file
 * Add methods for handling the state object
 */

const {log} = require('dbc-node-logger');

/**
 * Adds the get- and setState methods to the context object
 *
 * @param {object} ctx
 * @param {function} next
 */
async function errorMiddleware(ctx, next) {
  try {
    await next();

    if (ctx.status === 404) {
      ctx.throw(404);
    }
  }
  catch (err) {
    ctx.status = err.status || 500;

    let error = 'Der er sket en fejl.';
    if (ctx.status === 404) {
      error = 'Siden, du forsøger at tilgå, findes ikke';
    }

    log.error('An error has happened', {error: err.message, stack: err.stack, url: ctx.url});
    ctx.body = `Error: ${error}`;
  }
}

module.exports = {
  errorMiddleware
};
