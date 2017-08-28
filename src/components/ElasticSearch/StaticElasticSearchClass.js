import {ElasticClient} from './ElasticSearchClass';

const suggestions = require('./__mocks__/suggest.mock.json');
const searchResults = require('./__mocks__/search.mock.json');
const hierarchy = require('./__mocks__/hierarchy.mock.json');
const listResult = require('./__mocks__/list.mock.json');

export class StaticElasticClient extends ElasticClient {
  elasticPing() {
    return Promise.resolve(true);
  }

  elasticSearch(pars) {
    let res = [];
    if (pars && pars.query.indexOf('nothing') < 0) {
      res = searchResults;
    }

    return Promise.resolve(res);
  }

  elasticHierarchy(q) {
    let res = hierarchy[q] ? hierarchy[q] : hierarchy.default;
    if (q === '0') {
      res = {};
    }

    return Promise.resolve(res);
  }

  elasticList(dk5List) {
    let res = {};
    if (dk5List.length > 0) {
      res = listResult;
    }
    return Promise.resolve(res);
  }

  elasticSuggest(q) {
    let res = {prefix: [], spell: []};
    if (q.indexOf('nothing') < 0) {
      res = suggestions;
    }

    return Promise.resolve(res);
  }
}
