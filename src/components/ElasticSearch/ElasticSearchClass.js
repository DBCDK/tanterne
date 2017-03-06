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
    this.dk5SystematicNotes = {};
    this.dk5RegisterNotes = {};
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
    for (let hitPos = 0; hitPos < esRes.hits.length; hitPos++) {
      res.push(esUtil.parseRegisterRecord(esRes, hitPos, this.dk5Syst));
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
    let top = {};
    Object.keys(this.topGroups).forEach((idx) => {
      if (this.topGroups[idx].index === q) {
        top = this.topGroups[idx];
      }
    });
    const query = [];
    ['652m', 'b52m'].forEach((reg) => {
      query.push(reg + '"' + q + '"');
    });
    let esRes = await this.rawElasticSearch({query: query.join(' '), index: 'register'});
    if (esRes.total) {
      // collect systematic for children
      let children = [];
      Object.keys(this.dk5Syst).forEach((idx) => {
        if (this.dk5Syst[idx].parentIndex === q) {
          children.push({index: this.dk5Syst[idx].index, title: this.dk5Syst[idx].title});
        }
      });

      // collect register records refered to
      let regRecords = [];
      let parents = [];
      let parent = {};
      if (!top.title) {
        for (let hitPos = 0; hitPos < esRes.hits.length; hitPos++) {
          const syst = esUtil.parseRegisterRecord(esRes, hitPos, this.dk5Syst);
          if (syst.index && syst.title) {
            regRecords.push({index: syst.index, title: syst.title});
          }
        }

        // collect systematic for parents
        if (this.dk5Syst[q]) {
          parent = this.dk5Syst[q];
          Object.keys(this.dk5Syst).forEach((idx) => {
            if (this.dk5Syst[idx].parentIndex === parent.parentIndex) {
              let item = {index: this.dk5Syst[idx].index, title: this.dk5Syst[idx].title};
              if (idx === q) {
                // use note from register. Notes from systematic are currently not used
                item.note = this.dk5RegisterNotes[idx];
                item = Object.assign(item, {items: esUtil.titleSort(regRecords)}, {children: esUtil.titleSort(children)});
              }
              parents.push(item);
            }
          });
        }
      }

      let lastChild = q.substr(0, 1);
      if (top.title) {
        const items = Object.keys(this.topGroups).map((idx) => {
          const grp = {index: this.topGroups[idx].index, title: this.topGroups[idx].title};
          if (grp.index === q) {
            grp.children = esUtil.titleSort(children);
          }
          return grp;
        });
        hierarchy = {index: top.index, title: top.title, selected: q, items: esUtil.titleSort(items)};
      }
      else {
        // collect the hierarchy from parent and to the top
        hierarchy = {selected: q, items: esUtil.titleSort(parents)};
        if (parent.index) {
          lastChild = this.dk5Syst[parent.index].index;
          while (parent = this.dk5Syst[parent.parentIndex]) {         // eslint-disable-line no-cond-assign
            hierarchy = Object.assign({index: parent.index, title: parent.title}, {children: [hierarchy]});
            lastChild = parent.index;
          }
        }
        hierarchy = Object.assign(this.topGroups[lastChild.substr(0, 1)] || {}, {children: [hierarchy]});
      }
    }
    return hierarchy;
  }

  /**
   * return completion (if any) and spellcheck
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
   * load top group titles, systematic into dk5 hierarchy and words for completion suggester
   */
  async loadTabsFromElasticSearch() {
    // enrich top groups with titles
    if (!this.topGroups[0].title) {
      for (let i = 0; i <= 9; i++) {
        let topRes = await this.rawElasticSearch({query: '652d:' + this.topGroups[i].index, index: 'systematic'});
        this.topGroups[i].title = esUtil.getEsField(topRes, 0, '652u')[0];
      }
    }

    // create systematic hierarchy and notes
    if (Object.keys(this.dk5Syst).length === 0) {
      const syst = await this.rawElasticSearch({
        query: '652j:*',
        limit: 9999,
        fields: '001a, 652*, a40, a40*, parent',
        index: 'systematic'
      });
      if (syst.total > 9999) {
        Logger.log.error('More that 9999 systematic records');
      }
      const linkTranslate = {
        0: '00-07',
        '09.9999': '10-19',
        19.9999: '20-29',
        29.9999: '30-39',
        39.9999: '40-49',
        49.9999: '50-59',
        59.9999: '60-69',
        69.9999: '70-79',
        79.9999: '80-89',
        89.9999: '90-99'
      };
      for (let hitPos = 0; hitPos < syst.hits.length; hitPos++) {
        let parentIndex = esUtil.getFirstField(syst, hitPos, ['652j']);
        let parent = esUtil.getFirstField(syst, hitPos, ['parent']);
        if (linkTranslate[parentIndex]) {
          parentIndex = linkTranslate[parentIndex];
          Object.keys(this.topGroups).forEach((idx) => {
            if (this.topGroups[idx].index === parentIndex) {
              parent = this.topGroups[idx].title;
            }
          });
        }
        const grp = esUtil.getFirstField(syst, hitPos, ['652m', '652n', '652d']);
        if (grp) {
          this.dk5SystematicNotes[grp] = esUtil.createTaggedSystematicNote(syst, hitPos);
          this.dk5Syst[grp] = {
            index: grp,
            parentIndex: parentIndex,
            title: esUtil.getFirstField(syst, hitPos, ['652u']),
            parent: parent
          };
        }
        else {
          Logger.log.error('No dk5 group for ' + esUtil.getFirstField(syst, hitPos, ['001a']));
        }
      }
    }

    // load words into autocomplete trie.
    if (!this.autocomplete.trie.prefixes) {
      const wordFields = ['630a', 'b52y'];
      const regRecs = await this.rawElasticSearch({query: '*', fields: wordFields.join(','), limit: 50000});
      this.vocabulary = esUtil.parseRegisterForUniqueWords(regRecs, wordFields);
      this.autocomplete.initialize((onReady) => {
        onReady(this.vocabulary);
      });
      const regNotes = await this.rawElasticSearch({query: '651:*', fields: '651*, 652*', limit: 50000});
      this.dk5RegisterNotes = esUtil.parseRegisterForNotes(regNotes);
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
        const errorMessage = `ElasticSearch search error. Msg: ${error.message}`;
        Logger.log.error(errorMessage);
        esHits.error = errorMessage;
      });
    return esHits;
  }

}
