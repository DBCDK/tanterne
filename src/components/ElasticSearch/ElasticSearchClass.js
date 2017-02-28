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
import * as esUtil from './ElasticSearch.util';

const Logger = require('dbc-node-logger');

export default class ElasticClient {

  /**
   * setup ES and autocomplete object.
   */
  constructor() {
    this.elasticClient = new ElasticSearch.Client({host: CONFIG.elastic.host, log: CONFIG.elastic.log});

    this.defaultParameters = {query: '', limit: 50, offset: 0, fields: '001a,6*,b*', index: 'register', sort: ''};
    this.esParMap = {query: 'q', limit: 'size', offset: 'from', fields: '_sourceInclude', index: 'index', sort: 'sort'};

    /* loadTabsFromElasticSearch() loads the following */
    this.vocabulary = {};
    this.autocomplete = Autocomplete.connectAutocomplete();
    this.topGroups = {
      0: {index: '00-07', title: ''},
      1: {index: '10-19', title: ''},
      2: {index: '20-29', title: ''},
      3: {index: '30-39', title: ''},
      4: {index: '40-49', title: ''},
      5: {index: '50-59', title: ''},
      6: {index: '60-69', title: ''},
      7: {index: '70-79', title: ''},
      8: {index: '80-89', title: ''},
      9: {index: '90-99', title: ''}
    };
    this.dk5Syst = {};
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
    pars.query = pars.query.split(/[ ]+/).join(' AND ');   // force AND operator between words
    const esRes = await this.rawElasticSearch(pars);
    for (let n = 0; n < esRes.hits.length; n++) {
      res.push(esUtil.parseRegisterRecord(esRes, n, this.dk5Syst));
    }
    return res;
  }

  /**
   * Build hierarchy.
   *
   * @param q
   * @returns {*}
   */
  async elasticHierarchy(q) {
    await this.loadTabsFromElasticSearch();
    let hierarchy = {};
    let esRes = await this.rawElasticSearch({query: '652m:"' + q + '"', index: 'register'});
    if (esRes.total) {
      // collect register records refered to
      let regRecords = [];
      for (let n = 0; n < esRes.hits.length; n++) {
        const syst = esUtil.parseRegisterRecord(esRes, n, this.dk5Syst);
        regRecords.push({index: syst.index, title: syst.title});
      }
      regRecords = regRecords.sort(function (a, b) {
        return (a.title > b.title ? 1 : -1);
      });

      // collect systematic for children
      const dk5Syst = this.dk5Syst;
      let children = [];
      Object.keys(dk5Syst).forEach(function (idx) {
        if (dk5Syst[idx].parentIndex === q) {
          children.push({index: dk5Syst[idx].index, title: dk5Syst[idx].title});
        }
      });
      children = children.sort(function (a, b) {
        return (a.title > b.title ? 1 : -1);
      });

      // collect systematic for parents
      let parent = this.dk5Syst[q];
      let parents = [];
      Object.keys(dk5Syst).forEach(function (idx) {
        if (dk5Syst[idx].parentIndex === parent.parentIndex) {
          let item = {index: dk5Syst[idx].index, title: dk5Syst[idx].title};
          if (idx === q) {
            item = Object.assign(item, {items: regRecords}, {children: children});
          }
          parents.push(item);
        }
      });
      parents = parents.sort(function (a, b) {
        return (a.title > b.title ? 1 : -1);
      });

      // collect the hierarchy from parent and to the top
      let lastChild = this.dk5Syst[parent.index].index;
      hierarchy = {selected: q, items: parents};
      while (parent = this.dk5Syst[parent.parentIndex]) {         // eslint-disable-line no-cond-assign
        hierarchy = Object.assign({index: parent.index, title: parent.title}, {children: [hierarchy]});
        lastChild = parent.index;
      }
      hierarchy = Object.assign(this.topGroups[lastChild.substr(0, 1)], {children: [hierarchy]});
    }
    return hierarchy;
  }

  /**
   * doc 0 has all words for suggestions
   *
   * @param term
   * @returns {*}
   */
  async elasticSuggest(term) {
    await this.loadTabsFromElasticSearch();
    let result = {prefix: [], spell: []};
    if (this.autocomplete.trie.prefixes) {
      let prefix = [];
      this.autocomplete.search(term).forEach(function (match) {
        prefix.push({match: match, distance: Levenshtein.get(term, match)});
      });
      result.prefix = esUtil.sortDistanceAndSlice(prefix, 10);
    }
    if (this.vocabulary.length > 0) {
      let spell = [];
      this.vocabulary.forEach(function (match) {
        spell.push({match: match, distance: Levenshtein.get(term, match)});
      });
      result.spell = esUtil.sortDistanceAndSlice(spell, 10);
    }
    return result;
  }

  /**
   * load systematic into dk5Syst, words for completion suggester and top group names
   */
  async loadTabsFromElasticSearch() {
    if (Object.keys(this.dk5Syst).length === 0) {
      const syst = await this.rawElasticSearch({
        query: '652j:*',
        limit: 9999,
        fields: '652*, parent',
        index: 'systematic'
      });
      if (syst.total > 9999) {
        Logger.log.error('More that 9999 systematic records');
      }
      for (let n = 0; n < syst.hits.length; n++) {
        this.dk5Syst[esUtil.getEsField(syst, n, '652m')[0]] = {
          index: esUtil.getEsField(syst, n, '652m')[0],
          parentIndex: esUtil.getEsField(syst, n, '652j')[0],
          title: esUtil.getEsField(syst, n, '652u')[0],
          parent: esUtil.getEsField(syst, n, 'parent')[0]
        };
      }
    }
    if (!this.autocomplete.trie.prefixes) {
      let wordRec = await this.rawElasticSearch({query: '_id:0', fields: 'words', index: 'word'});
      this.vocabulary = esUtil.getEsField(wordRec, 0, 'words');
      this.autocomplete.initialize(function (onReady) {
        onReady(esUtil.getEsField(wordRec, 0, 'words'));
      });
    }
    if (!this.topGroups[0].title) {
      for (let i = 0; i <= 9; i++) {
        let topRes = await this.rawElasticSearch({query: '652d:' + this.topGroups[i].index, index: 'systematic'});
        this.topGroups[i].title = esUtil.getEsField(topRes, 0, '652u')[0];
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
    await this.elasticClient.search(esUtil.setAndMap(pars, this.defaultParameters, this.esParMap))
      .then(function (body) {
        esHits = body.hits;
      }, function (error) {
        Logger.log.error('ElasticSearch search error. Msg: ' + error.message);
      });
    return esHits;
  }

}
