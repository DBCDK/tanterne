/**
 * @file
 * Define the API
 */

import ElasticClass from '../components/ElasticSearch';

// Libraries
const Router = require('koa-router');
const {CONFIG} = require('../utils/config.util');

// Init router
const APIRouter = new Router();

const ElasticClient = new ElasticClass();
ElasticClient.loadTabsFromElasticSearch();  // remove line to lazy load tables

// Small helper function for generating search urls
function generateSearchUrl(q, force = false) {
  const spelling = force ? 'none' : 'dictionary';
  return `#!/search/${encodeURIComponent(q)}/10/0/relevance/${spelling}`;
}

// Define handler functions
async function suggestHandler(ctx) {
  let {q} = ctx.query; // eslint-disable-line no-unused-vars
  const response = {
    status: 200,
    query: {endpoint: 'suggest', query: q},
    response: (await ElasticClient.elasticSuggest(q)).prefix.map(match => {
      return {
        label: match.match || '',
        href: generateSearchUrl(match.match || '')
      };
    })
  };

  ctx.set('Content-Type', 'application/json');
  ctx.body = JSON.stringify(response);
}

async function hierarchyHandler(ctx) {
  let {q} = ctx.query;
  const response = {
    status: 200,
    parameters: {endpoint: 'hierarchy', query: q},
    response: {},
    result: await ElasticClient.elasticHierarchy(q, ctx.pro)
  };

  ctx.set('Content-Type', 'application/json');
  ctx.body = JSON.stringify(response);
}

async function searchHandler(ctx) {
  ctx.set('Content-Type', 'application/json');
  let {q, limit, offset, sort, spell} = ctx.query; // eslint-disable-line no-unused-vars
  const validSorts = ['relevance', 'dk5'];
  let errors = 0;
  if (!q) {
    ctx.body = JSON.stringify({status: 400, error: 'No query provided'});
    ctx.status = 400;
    errors += 1;
  }

  if (q && q === '') {
    ctx.body = JSON.stringify({status: 400, error: 'No query provided'});
    ctx.status = 400;
    errors += 1;
  }

  if (limit && limit !== '') {
    limit = parseInt(limit, 10) || 10;
  }
  else {
    limit = 10;
  }

  if (offset && offset !== '') {
    offset = parseInt(offset, 10) || 0;
  }
  else {
    offset = 0;
  }

  if (!sort || sort === '') {
    sort = validSorts[0];
  }

  if (validSorts.indexOf(sort) < 0) {
    ctx.body = JSON.stringify({status: 400, error: 'Invalid sort selected!'});
    ctx.status = 400;
    errors += 1;
  }

  if (errors === 0) {
    const results = await Promise.all([
      ElasticClient.elasticSearch({query: q, limit: limit, offset: offset}, ctx.pro),
      ElasticClient.elasticSuggest(q)
    ]);

    const response = {
      status: 200,
      parameters: {endpoint: 'search', query: q, limit: limit, offset: offset},
      correction: {},
      elasticStatus: await ElasticClient.elasticPing(),
      result: results[0],
      isIndex: !!ElasticClient.dk5Syst[q]
    };

    // No results found
    // Look at spelling and send new search
    if (
      !offset && results[0] && !results[0].length &&
      results[1] && results[1].spell.length &&
      spell && spell !== 'none'
    ) {
      response.correction.q = results[1].spell[0].match;
      response.correction.href = generateSearchUrl(q, true);
      response.result = await ElasticClient.elasticSearch({
        query: results[1].spell[0].match,
        limit: limit,
        offset: offset
      }, ctx.pro);
    }

    // no results, but spelling is disabled so give some suggestions instead.
    if (!offset && results[0] && !results[0].length && spell === 'none') {
      response.correction.suggestions = results[1].spell.map(altSpell => {
        altSpell.href = generateSearchUrl(altSpell.match);
        return altSpell;
      });
    }

    ctx.body = JSON.stringify(response);
  }
}

async function listHandler(ctx) {
  let {q} = ctx.query;
  const response = {
    status: 200,
    parameters: {endpoint: 'list', query: q},
    result: await ElasticClient.elasticList(q)
  };

  ctx.set('Content-Type', 'application/json');
  if (CONFIG.app.env === 'production') {
    ctx.set('Max-age', '864000'); // Allow the browser to cache the response for 10 days
  }
  ctx.body = JSON.stringify(response);
}

// Connect endpoints to the functions.
APIRouter.get('/api/suggest', suggestHandler);
APIRouter.get('/api/hierarchy', hierarchyHandler);
APIRouter.get('/api/search', searchHandler);
APIRouter.get('/api/list', listHandler);

module.exports = {
  APIRouter
};
