import {CONFIG} from '../../utils/config.util';
import Levenshtein from 'fast-levenshtein';
import ElasticSearch from 'elasticsearch';
import Autocomplete from 'autocomplete';

export default class ElasticClient {

  /**
   * setup ES and autocomplete. Autocomplete is lazy-loaded
   */
  constructor() {
    this.elasticClient = new ElasticSearch.Client({host: CONFIG.elastic.host, log: CONFIG.elastic.log});
    this.autocomplete = Autocomplete.connectAutocomplete();
    this.defaultParameters = {query: '', limit: 10, offset: 0, fields: '6*,b*', index: 'dk5'};
    this.esParMap = {query: 'q', limit: 'size', offset: 'from', fields: '_sourceInclude', index: 'index'};
  }

  /**
   *
   * @returns {*}
   */
  async elasticPing() {
    let esStatus = 'elasticsearch strange error';
    this.elasticClient.ping({
      // ping usually has a 3000ms timeout
      requestTimeout: 1000
    }, function (error) {
      if (error) {
        esStatus = 'elasticsearch cluster is down!';
      }
      else {
        esStatus = 'All is well';
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
    let esHits = {};
    await this.elasticClient.search(this.setAndMap(pars))
    .then(function (body) {
      esHits = body.hits;
    }, function (error) {
      console.trace(error.message);
    });
    return esHits;
  }

  /**
   * doc 0 has all words for suggestions
   *
   * @param term
   * @returns {*}
   */
  async elasticSuggest(term) {
    if (!this.autocomplete.trie.prefixes) {
      let wordRec = await this.elasticSearch({query: '_id:0', fields: 'words', index: 'word'});
      if (wordRec && Array.isArray(wordRec.hits) && wordRec.hits[0]._source) {
        this.autocomplete.initialize(function (onReady) {
          onReady(wordRec.hits[0]._source.words);
        });
      }
    }
    let result = [];
    if (this.autocomplete.trie.prefixes) {
      this.autocomplete.search(term).forEach(function (match) {
        result.push({match: match, distance: Levenshtein.get(term, match)});
      });
      result = result.sort(function (a, b) {
        return (parseInt(a.distance) - parseInt(b.distance));
      });
    }
    return result;
  }

  /**
   *
   * @param pars
   * @returns {{}}
   */
  setAndMap(pars) {
    let ret = {};
    let defaultPars = this.defaultParameters;
    let parMap = this.esParMap;
    Object.keys(defaultPars).forEach(function (key) {
      ret[parMap[key]] = pars[key] ? pars[key] : defaultPars[key];
    });
    return ret;
  }

}
