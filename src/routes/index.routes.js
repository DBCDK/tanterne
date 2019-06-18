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
  const matomoScript = `<!--Matomo -->
<script type="text/javascript">
  var _paq = window._paq || [];
  _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="https://stats.dbc.dk/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '${ctx.pro ? '28' : '27'}']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src='js/matomo.js'; s.parentNode.insertBefore(g,s);
  })();
  </script>
<!-- End Matomo -->`;

  const newrelicHeader = CONFIG.app.env === 'production' ? newrelic.getBrowserTimingHeader() : '';

  ctx.body = `
    <!DOCTYPE html>
    <html>
      <head>
        ${newrelicHeader}
        <title>DK5</title>
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
        ${ctx.test ? '' : matomoScript}
      </body>
    </html>
  `;
});

module.exports = {
  router
};
