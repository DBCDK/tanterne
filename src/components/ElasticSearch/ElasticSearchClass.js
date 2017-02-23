/**
 * @file
 *
 * Interface for Elastic Search
 *
 * Call loadTabsFromElasticSearch() after class instantiation, to load tables. Otherwise they'll lazy load
 *
 */
import {CONFIG} from '../../utils/config.util';
import Levenshtein from 'fast-levenshtein';
import ElasticSearch from 'elasticsearch';
import Autocomplete from 'autocomplete';
import {getEsField, setAndMap} from './ElasticSearch.util';

const Logger = require('dbc-node-logger');

export default class ElasticClient {

  /**
   * setup ES and autocomplete object.
   */
  constructor() {
    this.elasticClient = new ElasticSearch.Client({host: CONFIG.elastic.host, log: CONFIG.elastic.log});

    this.defaultParameters = {query: '', limit: 40, offset: 0, fields: '6*,b*', index: 'register', sort: ''};
    this.esParMap = {query: 'q', limit: 'size', offset: 'from', fields: '_sourceInclude', index: 'index', sort: 'sort'};

    /* loadTabsFromElasticSearch() loads the following */
    this.autocomplete = Autocomplete.connectAutocomplete();
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
    this.dk5Tab = {};
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
    await this.loadTabsFromElasticSearch();
    const res = [];
    let qRes = await this.rawElasticSearch(pars);
    for (let n = 0; n < qRes.hits.length; n++) {
      const entryTitle = getEsField(qRes, n, '630a');
      let dk5 = getEsField(qRes, n, 'b52m');
      let subTitle = getEsField(qRes, n, 'b52y');
      if (dk5.length === 0) {
        dk5 = getEsField(qRes, n, '652m');
        subTitle = getEsField(qRes, n, '630a');
      }
      const items = [];
      for (let i = 0; i < dk5.length; i++) {
        items.push({index: dk5[i], title: subTitle[i], parent: this.dk5Tab[dk5[i]]});
      }
      console.log('subj', entryTitle, 'it', items);
      res.push({title: entryTitle, items: items});
    }
    return res;
  }

  /**
   * doc 0 has all words for suggestions
   *
   * @param term
   * @returns {*}
   */
  async elasticSuggest(term) {
    await this.loadTabsFromElasticSearch();
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
    await this.loadTabsFromElasticSearch();
    let qRes = await this.rawElasticSearch({query: q.split(/[ ]+/).join(' AND '), index: 'register'});
    let subject = getEsField(qRes, 0, '630a');
    let dk5 = getEsField(qRes, 0, '652m');
    let text = getEsField(qRes, 0, '630a');
    if (dk5.length === 0) {
      dk5 = getEsField(qRes, 0, 'b52m');
      text = getEsField(qRes, 0, 'b52y');
    }
    let aspekt = {subject: subject, dk5: dk5, text: text};
    console.log(aspekt);
    return qRes;
  }

  /**
   * load systematic into dk5Tab, words for completion suggester and top group names
   */
  async loadTabsFromElasticSearch() {
    if (Object.keys(this.dk5Tab).length === 0) {
      const syst = await this.rawElasticSearch({
        query: '652j:*',
        limit: 9999,
        fields: '652*, parent',
        index: 'systematic'
      });
      for (let n = 0; n < syst.hits.length; n++) {
        this.dk5Tab[getEsField(syst, n, '652m')[0]] = {
          title: getEsField(syst, n, 'parent')[0],
          index: getEsField(syst, n, '652j')[0]
        };
      }
    }
    if (!this.autocomplete.trie.prefixes) {
      let wordRec = await this.rawElasticSearch({query: '_id:0', fields: 'words', index: 'word'});
      this.autocomplete.initialize(function (onReady) {
        onReady(getEsField(wordRec, 0, 'words'));
      });
    }
    if (!this.topGroups[0].name) {
      for (let i = 0; i <= 9; i++) {
        let topRes = await this.rawElasticSearch({query: '652d:' + this.topGroups[i].q, index: 'systematic'});
        this.topGroups[i].name = getEsField(topRes, 0, '652u')[0];
      }
    }
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
