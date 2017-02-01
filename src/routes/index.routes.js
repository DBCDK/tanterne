/**
 * @file
 * Define the base routes
 */

// Libraries
const Router = require('koa-router');

// Init router
const router = new Router();

// Routes
router.get('/', ctx => {
  ctx.body = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Tanterne</title>
        <link rel="stylesheet" type="text/css" href="/css/index.css"/>
      </head>
      <body>
        <div class="main">
          <div id="content"></div>
          <script src="/js/index.js"></script>
        </div>
      </body>
    </html>
  `;
});

module.exports = {
  router
};
