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

export class ElasticClient {

  /**
   * setup ES and autocomplete object.
   */
  constructor() {
    const host = CONFIG.elastic.host === 'static_mocks' ? 'localhost:9200' : CONFIG.elastic.host;
    this.elasticClient = new ElasticSearch.Client({host: host, log: CONFIG.elastic.log});

    this.defaultSearchFields = '610,630,633,640,652,b00a,b52y,b52m,b52d,a20,a40'.split(',');
    this.defaultParameters = {
      query: '',
      limit: 50,
      offset: 0,
      fields: '001a,6*,b*,a20*',
      index: 'register',
      sort: '',
      op: 'AND'
    };
    this.esParMap = {
      query: 'q',
      limit: 'size',
      offset: 'from',
      fields: '_sourceInclude',
      index: 'index',
      sort: 'sort',
      op: 'defaultOperator'
    };

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
    this.dk5HasChildren = {};
    this.dk5SystematicNotes = {};
    this.dk5SystematicHistoricNotes = {};
    this.dk5GeneralNote = {};
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
    const esRes = await this.rawElasticSearch(pars);
    for (let hitPos = 0; hitPos < esRes.hits.length; hitPos++) {
      res.push(esUtil.parseRegisterRecord(esRes, hitPos, this.dk5Syst));
    }
    return esUtil.indexSort(res);
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
    const regRecords = await this.fetchRegisterWords(q);
    if (regRecords.length) {
      // collect systematic for children
      let children = [];
      Object.keys(this.dk5Syst).forEach((idx) => {
        if (this.dk5Syst[idx].parentIndex === q) {
          children.push({index: this.dk5Syst[idx].index, title: this.dk5Syst[idx].title, hasChildren: this.dk5HasChildren[idx] || false});
        }
      });

      // collect register records refered to
      let parents = [];
      let parent = {};
      if (!top.title) {

        // collect systematic for parents
        if (this.dk5Syst[q]) {
          parent = this.dk5Syst[q];
          Object.keys(this.dk5Syst).forEach((idx) => {
            if (this.dk5Syst[idx].parentIndex === parent.parentIndex) {
              let item = {index: this.dk5Syst[idx].index, title: this.dk5Syst[idx].title, hasChildren: this.dk5HasChildren[idx] || false};
              if (idx === q) {
                const note = this.dk5GeneralNote[idx];
                // Notes from systematic are currently not used
                // notes from register are moved to the individual group or register word
                item = Object.assign(item, {
                  note: note,
                  noteSystematic: this.dk5SystematicNotes[idx],
                  noteSystematicHistoric: this.dk5SystematicHistoricNotes[idx],
                  items: esUtil.titleSort(regRecords)
                }, {children: esUtil.indexSort(children)});
              }
              parents.push(item);
            }
          });
        }
      }

      let lastChild = q.substr(0, 1);
      if (top.title) {
        const items = Object.keys(this.topGroups).map((idx) => {
          const grp = {index: this.topGroups[idx].index, title: this.topGroups[idx].title, hasChildren: true};
          if (grp.index === q) {
            grp.children = esUtil.indexSort(children);
          }
          return grp;
        });
        hierarchy = {index: top.index, title: top.title, hasChildren: this.dk5HasChildren[top.index] || false, selected: q, items: esUtil.indexSort(items)};
      }
      else {
        // collect the hierarchy from parent and to the top
        hierarchy = {selected: q, items: esUtil.indexSort(parents)};
        if (parent.index) {
          lastChild = this.dk5Syst[parent.index].index;
          while (parent = this.dk5Syst[parent.parentIndex]) {         // eslint-disable-line no-cond-assign
            hierarchy = Object.assign({index: parent.index, title: parent.title, hasChildren: this.dk5HasChildren[parent.index] || false}, {children: [hierarchy]});
            lastChild = parent.index;
          }
        }
        hierarchy = Object.assign(this.topGroups[lastChild.substr(0, 1)] || {}, {children: [hierarchy]});
      }
    }
    return hierarchy;
  }

  /**
   * Title and systematic notes for a comma separated list of dk5 numbers
   *
   * @param dk5List
   * @returns {{}}
   */
  async elasticList(dk5List) {
    await this.loadTabsFromElasticSearch();
    const result = {};
    for (let dk5 of dk5List.split(',')) {
      dk5 = dk5.trim();
      const regRecords = await this.fetchRegisterWords(dk5);
      const aspects = [];
      if (this.dk5Syst[dk5]) {
        const aspectRes = await this.rawElasticSearch({query: 'b52m:' + dk5 + ' AND 630a:' + this.dk5Syst[dk5].title});
        for (let hitPos = 0; hitPos < aspectRes.hits.length; hitPos++) {
          const source = aspectRes.hits[hitPos]._source;
          if (source.b52m.length > 1) {
            for (let i = 0; i < source.b52m.length; i++) {
              const b52m = source.b52m[i];
              aspects.push({index: b52m, title: source.b52y[i], hasChildren: this.dk5HasChildren[b52m] || false, parent: this.dk5Syst[b52m]});
            }
          }
        }
      }
      result[dk5] = Object.assign({}, this.dk5Syst[dk5], {
        hasChildren: this.dk5HasChildren[dk5] || false,
        noteSystematic: this.dk5SystematicNotes[dk5],
        noteGeneral: this.dk5GeneralNote[dk5],
        noteHistoric: this.dk5RegisterNotes[dk5],
        aspects: esUtil.indexSort(aspects),
        items: esUtil.titleSort(regRecords)
      });
    }
    return result;
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
        this.topGroups[i].hasChildren = true;
      }
    }

    // create systematic hierarchy and notes
    if (Object.keys(this.dk5Syst).length === 0) {
      const syst = await this.rawElasticSearch({
        query: '652j:*',
        limit: 9999,
        fields: '001a, 652*, a40, a40*, a30, a30*, parent',
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
          this.dk5SystematicNotes[grp] = esUtil.createTaggedSystematicNote(syst, hitPos, 'a40');
          this.dk5SystematicHistoricNotes[grp] = esUtil.createTaggedSystematicNote(syst, hitPos, 'a30');
          this.dk5HasChildren[parentIndex] = true;
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
      const regNotes = await this.rawElasticSearch({query: '651:* OR b00:*', fields: '651*, 652*, b00*', limit: 50000});
      this.dk5RegisterNotes = esUtil.parseRegisterForNotes(regNotes, this.dk5Syst);
      this.dk5GeneralNote = esUtil.parseRegisterForGeneralNotes(regNotes);
    }
  }

  /**
   * Return register words and note for a given dk5 number
   *
   * @param dk5
   * @returns {Array}
   */
  async fetchRegisterWords(dk5) {
    const registerWordIndex = ['652m', '652d', 'b52m'];  // one of these subFields contains the dk5 index for the register word
    const regRecords = [];
    const query = [];
    registerWordIndex.forEach((reg) => {
      query.push(reg + ':"' + dk5 + '"');
    });
    let esRes = await this.rawElasticSearch({query: query.join(' OR '), index: 'register'});
    for (let hitPos = 0; hitPos < esRes.hits.length; hitPos++) {
      const syst = esUtil.parseRegisterRecord(esRes, hitPos, this.dk5Syst);
      const note = esUtil.createTaggedRegisterNote(esRes, hitPos, this.dk5Syst);
      if (syst.title) {
        regRecords.push({index: syst.index, title: syst.title, hasChildren: this.dk5HasChildren[syst.index] || false, note: note});
      }
    }
    return regRecords;
  }

  /**
   * Call Elastic Search and return raw result
   *
   * @param pars
   * @returns {{}}
   */
  async rawElasticSearch(pars) {
    let esHits = {};
    if (pars.query.indexOf(':') === -1) {
      const q = [];
      this.defaultSearchFields.forEach((fld) => {
        q.push(fld + ':(' + pars.query + ')');
      });
      pars.query = q.join(' OR ');
    }
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
