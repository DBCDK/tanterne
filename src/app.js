/**
 * @file
 * Configure application and export start.
 */

// Libraries
const Koa = require('koa');
const convert = require('koa-convert');
const serve = require('koa-static');

// Middleware and routes
const {errorMiddleware} = require('./middleware/error.middleware');
const {SetVersionHeader} = require('./middleware/headers.middleware');
const {LoggerMiddleware} = require('./middleware/logger.middleware');
const indexRouter = require('./routes/index.routes').router;
const {APIRouter} = require('./routes/api.routes');

// Utils
const Logger = require('dbc-node-logger');
const {CONFIG, validateConfig} = require('./utils/config.util');
const {sanityCheck} = require('./utils/sanityCheck.util');
const {VERSION} = require('./utils/version.util');

function createApp(pro) {
  const app = new Koa();
  app.name = 'tanterne';

  const test = CONFIG.app.env === 'test';

  // Set a pro key and a test key on context object.
  Object.defineProperty(app.context, 'pro', {__proto__: null, value: pro});
  Object.defineProperty(app.context, 'test', {__proto__: null, value: test});

  let PORT = CONFIG.app.port;
  let loggerName = 'Tanterne';

  if (pro) {
    PORT = CONFIG.pro.port;
    app.name = 'tanterne-pro';
    loggerName = 'Tanterne-PRO';
  }

  app.startServer = function startServer() {
    // Prepare to start
    validateConfig();
    Logger.setInfo({name: loggerName, version: VERSION});
    sanityCheck();

    // Trust proxy
    app.proxy = true;

    // Setup middlewares
    app.use(convert(serve('./static', {maxage: 864000}))); // 10 days
    app.use(convert(serve('./public'), {maxage: 86400})); // 1 day
    app.use(SetVersionHeader);
    app.use(LoggerMiddleware);

    // Setup routes
    app.use(indexRouter.routes());
    app.use(APIRouter.routes());

    // Setup error middleware
    app.use(errorMiddleware);

    // Finally start listening
    app.listen(PORT, () => {
      Logger.log.debug(`Server is now running on http://localhost:${PORT}`);
    });
  };

  return app;
}

module.exports = {
  createApp
};
