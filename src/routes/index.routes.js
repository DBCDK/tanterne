/**
 * @file
 * Define the base routes
 */

// Libraries
const Router = require('koa-router');
const newrelic = require('newrelic');
import {CONFIG} from '../utils/config.util';

// Init router
const router = new Router();

// Routes
router.get('/', ctx => {
  const proClass = ctx.pro ? 'main pro' : 'main';

  const newrelicHeader = CONFIG.app.env === 'production' ? newrelic.getBrowserTimingHeader() : null;

  ctx.body = `
    <!DOCTYPE html>
    <html>
      <head>
        ${newrelicHeader}
        <title>Tanterne</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="/css/main.css"/>
      </head>
      <body>
        <div class="${proClass}">
          <div id="content"></div>
          <script>window.PRO = ${ctx.pro}</script>
          <script>window.TEST = ${ctx.test}</script>
          <script src="/js/main.js"></script>
        </div>
      </body>
    </html>
  `;
});

module.exports = {
  router
};
