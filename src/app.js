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

const app = new Koa();
app.name = 'tanterne';

app.startServer = function startServer() {
  // Prepare to start
  validateConfig();
  Logger.setInfo({name: 'Tanterne', version: VERSION});
  sanityCheck();

  // Set constants
  const PORT = CONFIG.app.port;

  // Trust proxy
  app.proxy = true;

  // Setup middlewares
  app.use(convert(serve('./public')));
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

module.exports = {
  app
};
