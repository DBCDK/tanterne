/**
 * @file
 * Define the API
 */

import ElasticClass from '../components/ElasticSearch/ElasticSearchClass';

// Libraries
const Router = require('koa-router');

// Init router
const APIRouter = new Router();

const ElasticClient = new ElasticClass();

// Define handler functions
async function suggestHandler(ctx) {
  let {q} = ctx.query; // eslint-disable-line no-unused-vars
  const response = {
    status: 200,
    query: {endpoint: 'suggest'},
    response: [
      {label: 'Japan', href: ''},
      {label: 'Japansk litteraturhistorie', href: ''},
      {label: 'Japansk skønlitteratur', href: ''},
      {label: 'Japansk sprog', href: ''}
    ],
    suggest: await ElasticClient.elasticSuggest(q)
  };

  ctx.set('Content-Type', 'application/json');
  ctx.body = JSON.stringify(response);
}

async function hierarchyHandler(ctx) {
  const response = {
    status: 200,
    query: {endpoint: 'hierarchy'},
    response: {}
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
    const response = {
      status: 200,
      query: {
        endpoint: 'search',
        q: q
      },
      correction: {},
      response: [{
        title: '65.2 Regnskabsføring i alm.',
        dk5: {index: '65.2', title: 'Regnskabsføring i alm.'},
        items: []
      }, {
        title: '65.126 Forbrugerbekyttelse i alm.',
        dk5: {index: '65.126', title: 'Forbrugerbekyttelse i alm.'},
        items: []
      }],
      elasticStatus: await ElasticClient.elasticPing(),
      result: await ElasticClient.elasticSearch({query: q, limit: limit, offset: offset})
    };

    if (spell && spell !== 'none') {
      // Get the closest spelling
      q = 'Japan';
      response.correction.q = q;
    }

    response.response = [{
      title: '65.2 Regnskabsføring i alm.',
      dk5: {index: '65.2', title: 'Regnskabsføring i alm.'},
      items: []
    }, {
      title: '65.126 Forbrugerbekyttelse i alm.',
      dk5: {index: '65.126', title: 'Forbrugerbekyttelse i alm.'},
      items: []
    }];

    ctx.body = JSON.stringify(response);
  }
}

// Connect endpoints to the functions.
APIRouter.get('/api/suggest', suggestHandler);
APIRouter.get('/api/hierarchy', hierarchyHandler);
APIRouter.get('/api/search', searchHandler);

module.exports = {
  APIRouter
};
