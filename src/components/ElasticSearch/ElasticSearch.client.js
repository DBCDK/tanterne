var ElasticSearch = require('elasticsearch');
import {CONFIG} from '../../utils/config.util';

var elasticClient = new ElasticSearch.Client({host: CONFIG.elastic.host, log: CONFIG.elastic.log});
var esStatus;
var esHits;
var esSuggest;

export function elasticPing() {
  elasticClient.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 1000
  }, function (error) {
    if (error) {
      esStatus = 'elasticsearch cluster is down!';
    }
    else {
      esStatus =  'All is well';
    }
  });
  return esStatus;
}

export function elasticSearch(query, limit, offset) {
  elasticClient.search({
    q: query,
    size: limit,
    from: offset
  }).then(function (body) {
    esHits = body;
  }, function (error) {
    console.trace(error.message);
    esHits = {};
  });
  return esHits;
}

export function elasticSuggest(term) {
  elasticClient.suggest({
    body: {
      suggester:{
        text:term,
        completion:{
          field:"suggest_words"
        }
      }
    }
  }).then(function (body) {
    esSuggest = body;
  }, function (error) {
    console.trace(error.message);
    esSuggest = {};
  });
  return esSuggest;
}
