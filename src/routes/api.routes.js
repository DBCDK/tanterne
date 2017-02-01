/**
 * @file
 * Define the API
 */

// Libraries
const Router = require('koa-router');

// Init router
const APIRouter = new Router();

// Define handler functions
async function suggestHandler(ctx) {
  const response = {
    status: 200,
    query: {endpoint: 'suggest'},
    response: {}
  };

  ctx.body = JSON.stringify(response);
}

async function hierarchyHandler(ctx) {
  const response = {
    status: 200,
    query: {endpoint: 'hierarchy'},
    response: {}
  };

  ctx.body = JSON.stringify(response);
}

async function searchHandler(ctx) {
  const response = {
    status: 200,
    query: {endpoint: 'search'},
    response: {}
  };

  ctx.body = JSON.stringify(response);
}

// Connect endpoints to the functions.
APIRouter.get('/api/suggest', suggestHandler);
APIRouter.get('/api/hierarchy', hierarchyHandler);
APIRouter.get('/api/search', searchHandler);

module.exports = {
  APIRouter
};
