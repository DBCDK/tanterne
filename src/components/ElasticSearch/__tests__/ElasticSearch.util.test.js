const {assert} = require('chai');
import * as esUtil from '../ElasticSearch.util';

describe('Testing setAndMap', () => {
  const defaults = {aaa: 'AAA', ccc: 'CCC'};
  const map = {aaa: 'parA', bbb: 'parB', ccc: 'parC'};
  it('it should map parameters', () => {
    assert.deepEqual({parA: 'aaa', parC: 'ccc'}, esUtil.setAndMap({aaa: 'aaa', ccc: 'ccc'}, defaults, map));
    assert.deepEqual({parA: 'aaa', parC: 'ccc'}, esUtil.setAndMap({aaa: 'aaa', bbb: 'bbb', ccc: 'ccc'}, defaults, map));
  });
  it('it should set default parameters', () => {
    assert.deepEqual({parA: 'aaa', parC: 'CCC'}, esUtil.setAndMap({aaa: 'aaa'}, defaults, map));
    assert.deepEqual({parA: 'AAA', parC: 'CCC'}, esUtil.setAndMap({}, defaults, map));
  });
});

describe('Testing sortDistanceAndSlice', () => {
  const terms = [
    {title: 'bbbb', distance: 2},
    {title: 'aaaa', distance: 1}
  ];
  it('it should sort according to ascending distance', () => {
    assert.equal('aaaa', esUtil.sortDistanceAndSlice(terms, 10)[0].title);
    assert.equal(2, esUtil.sortDistanceAndSlice(terms, 10).length);
  });
  it('it should cut array', () => {
    assert.equal(1, esUtil.sortDistanceAndSlice(terms, 1).length);
    assert.equal(0, esUtil.sortDistanceAndSlice(terms, 0).length);
  });
});

describe('Testing titleSort', () => {
  const titles = [
    {title: 'bbbb', index: 1},
    {title: 'aaaa', index: 2}
  ];
  it('it should sort array in ascending title sort order', () => {
    assert.equal(2, esUtil.titleSort(titles)[0].index);
    assert.isArray(esUtil.titleSort([]));
    assert.equal(0, esUtil.titleSort([]).length);
  });
});

describe('Testing parseRegisterRecord', () => {
  const dk5Tab = {
    '652.m': {index: 'syst 652.m'},
    '652.M': {index: 'syst 652.M'},
    'b52.m.1': {index: 'syst b52.m.1'},
    'b52.m.2': {index: 'syst b52.m.2'}
  };
  const esRes = {
    hits: [
      {_source: {'001a': ['txt 001a'], '630a': ['txt 630a'], '652m': ['652.m']}},
      {
        _source: {
          '001a': ['txt 001A'],
          '630a': ['txt 630A'],
          '652m': ['652.M'],
          b52m: ['b52.m.1', 'b52.m.2'],
          b52y: ['Aspect 1', 'Aspect 2']
        }
      }
    ]
  };
  it('it should extract needed fields', () => {
    const expected = {id: 'txt 001a', index: '652.m', parent: {index: 'syst 652.m'}, title: 'txt 630a'};
    assert.deepEqual(expected, esUtil.parseRegisterRecord(esRes, 0, dk5Tab));
    const items = [
      {index: 'b52.m.1', parent: {index: 'syst b52.m.1'}, title: 'Aspect 1'},
      {index: 'b52.m.2', parent: {index: 'syst b52.m.2'}, title: 'Aspect 2'}
    ];
    const aspect = {id: 'txt 001A', index: '652.M', parent: {index: 'syst 652.M'}, title: 'txt 630A', items: items};
    assert.deepEqual(aspect, esUtil.parseRegisterRecord(esRes, 1, dk5Tab));
  });
});

describe('Testing Elastic result', () => {
  const esRes = {
    hits: [
      {_source: {field: ['text 0']}},
      {_source: {field: ['text 1']}},
      {_source: {empty: ['']}},
      {_source: {notEmpty: ['text']}}
    ]
  };
  it('it should return first field', () => {
    assert.equal('text 0', esUtil.getFirstField(esRes, 0, ['field']));
    assert.equal('text 0', esUtil.getFirstField(esRes, 0, ['notThere', 'field']));
  });
  it('it should return empty string if field is not there', () => {
    assert.equal('', esUtil.getFirstField(esRes, 0, ['notThere', 'neverThere']));
    assert.equal('', esUtil.getFirstField(esRes, 0, []));
  });
  it('it should return empty string', () => {
    assert.equal('', esUtil.getFirstField(esRes, 0, ['empty', 'notEmpty']));
  });
  it('it should return specified field', () => {
    assert.equal('text 0', esUtil.getEsField(esRes, 0, 'field'));
    assert.equal('text 1', esUtil.getEsField(esRes, 1, 'field'));
  });
  it('it should return empty string if field is not there 1', () => {
    assert.equal('', esUtil.getEsField(esRes, 2, 'field'));
  });
});
