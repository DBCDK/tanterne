import {CONFIG} from '../../utils/config.util';
import Levenshtein from 'fast-levenshtein';
import ElasticSearch from 'elasticsearch';
import Autocomplete from 'autocomplete';
import {getHits, setAndMap} from './ElasticSearch.util';

const Logger = require('dbc-node-logger');

export default class ElasticClient {

  /**
   * setup ES and autocomplete. Autocomplete is lazy-loaded
   */
  constructor() {
    this.elasticClient = new ElasticSearch.Client({host: CONFIG.elastic.host, log: CONFIG.elastic.log});
    this.autocomplete = Autocomplete.connectAutocomplete();
    this.defaultParameters = {query: '', limit: 40, offset: 0, fields: '008t,6*,b*', index: 'register'};
    this.esParMap = {query: 'q', limit: 'size', offset: 'from', fields: '_sourceInclude', index: 'index'};
    this.topGroups = {
      0: {q: '00-07', name: ''},
      1: {q: '10-19', name: ''},
      2: {q: '20-29', name: ''},
      3: {q: '30-39', name: ''},
      4: {q: '40-49', name: ''},
      5: {q: '50-59', name: ''},
      6: {q: '60-69', name: ''},
      7: {q: '70-79', name: ''},
      8: {q: '80-89', name: ''},
      9: {q: '90-99', name: ''}
    };
  }

  /**
   *
   * @returns {*}
   */
  async elasticPing() {
    let esStatus = false;
    await this.elasticClient.ping({
      // ping usually has a 3000ms timeout
      requestTimeout: 1000
    }).then(function (body) {
      esStatus = body;
    }, function (error) {
      if (error) {
        Logger.log.error('ElasticSearch cluster is down. Msg: ' + error.message);
      }
    });
    return esStatus;
  }

  /**
   *
   * @param pars
   * @returns {*}
   */
  async elasticSearch(pars) {
    return await this.rawElasticSearch(pars);
  }

  /**
   * doc 0 has all words for suggestions
   *
   * @param term
   * @returns {*}
   */
  async elasticSuggest(term) {
    if (!this.autocomplete.trie.prefixes) {
      let wordRec = await this.rawElasticSearch({query: '_id:0', fields: 'words', index: 'word'});
      this.autocomplete.initialize(function (onReady) {
        onReady(getHits(wordRec, 0, 'words'));
      });
    }
    let result = [];
    if (this.autocomplete.trie.prefixes) {
      this.autocomplete.search(term).forEach(function (match) {
        result.push({match: match, distance: Levenshtein.get(term, match)});
      });
      result = result.sort(function (a, b) {
        return (parseInt(a.distance, 10) - parseInt(b.distance, 10));
      });
    }
    return result;
  }

  /**
   * Build hierarchy. Lazy load top groups
   *
   * @param q
   * @returns {*}
   */
  async elasticHierarchy(q) {
    if (!this.topGroups[0].name) {
      for (let i = 0; i <= 9; i++) {
        let topRes = await this.rawElasticSearch({query: '652d:' + this.topGroups[i].q, index: 'systematic'});
        this.topGroups[i].name = getHits(topRes, 0, '652u')[0];
      }
    }
    let qRes = await this.rawElasticSearch({query: q.split(/[ ]+/).join(' AND ')});
    let aspekt = {subject: getHits(qRes, 0, '630a'), dk5: getHits(qRes, 0, 'b52m'), text: getHits(qRes, 0, 'b52y')};
    console.log(aspekt);
    return qRes;
  }

  /**
   * Call Elastic Search and return raw result
   *
   * @param pars
   * @returns {{}}
   */
  async rawElasticSearch(pars) {
    let esHits = {};
    await this.elasticClient.search(setAndMap(pars, this.defaultParameters, this.esParMap))
      .then(function (body) {
        esHits = body.hits;
      }, function (error) {
        Logger.log.error('ElasticSearch search error. Msg: ' + error.message);
      });
    return esHits;
  }

}
