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

describe('Testing indexSort', () => {
  const titles = [
    {title: 'bbbb', index: 1},
    {title: 'aaaa', index: 2}
  ];
  it('it should sort array in ascending index sort order', () => {
    assert.equal(1, esUtil.indexSort(titles)[0].index);
    assert.isArray(esUtil.indexSort([]));
    assert.equal(0, esUtil.indexSort([]).length);
  });
});

describe('Testing indexMatchSort', () => {
  const titles = [
    {title: 'bbbb', index: 1},
    {title: 'aaaa', index: 2},
    {title: 'aaa', index: 3},
    {title: 'aa', index: 4}
  ];
  it('it should sort array in ascending index sort order', () => {
    assert.equal(4, esUtil.titleMatchSort(titles)[0].index);
    assert.isArray(esUtil.titleMatchSort([]));
    assert.equal(0, esUtil.titleMatchSort([]).length);
  });
  it('it should sort array in ascending index, but prioritise matches', () => {
    assert.equal(2, esUtil.titleMatchSort(titles, 'aaaa')[0].index);
    assert.equal(3, esUtil.titleMatchSort(titles, 'aaa')[0].index);
    assert.equal(4, esUtil.titleMatchSort(titles, 'aa*')[0].index);
    assert.equal(3, esUtil.titleMatchSort(titles, 'aa*')[1].index);
  });
});

describe('Testing parseRegisterRecord', () => {
  const dk5Tab = {
    '652.m': {index: 'syst 652.m', decommissioned: false},
    '652.M': {index: 'syst 652.M', decommissioned: false},
    'b52.m.1': {index: 'syst b52.m.1', decommissioned: false},
    'b52.m.2': {index: 'syst b52.m.2', decommissioned: false}
  };
  const dk5GeneralNote = {
    '652.m': '652.m generalNote',
    '652.M': '652.M generalNote'
  };
  const esRes = {
    hits: [
      {
        _source: {
          '001a': ['txt 001a'],
          '630a': ['txt 630a'],
          '651a': ['before 1999'],
          '651b': ['12.13'],
          '652m': ['652.m'],
          '652a': ['652.a']
        }
      },
      {
        _source: {
          '001a': ['txt 001A'],
          '630a': ['txt 630A'],
          '652m': ['652.M'],
          b52m: ['b52.m.1', 'b52.m.2'],
          b52y: ['Register Word 1', 'Register Word 2'],
          b52å: [1, 2],
          b51å: [2],
          b51a: ['before 1999'],
          b51b: ['43.21']
        }
      }
    ]
  };
  it('it should extract needed fields', () => {
    const expected = {
      id: 'txt 001a',
      index: '652.m',
      decommissioned: false,
      generalNote: '652.m generalNote',
      parent: {index: 'syst 652.m', decommissioned: false},
      title: 'txt 630a',
      titleDetails: '',
      titleFull: 'txt 630a',
      note: {
        index: '12.13',
        name: 'before 1999'
      }
    };
    assert.deepEqual(expected, esUtil.parseRegisterRecord(esRes, 0, dk5Tab, dk5GeneralNote));
    const items = [
      {
        index: 'b52.m.1',
        parent: {
          index: 'syst b52.m.1',
          decommissioned: false
        },
        title: 'Register Word 1',
        note: null
      },
      {
        index: 'b52.m.2',
        parent: {
          index: 'syst b52.m.2', decommissioned: false
        },
        title: 'Register Word 2',
        note: {
          name: 'before 1999',
          index: '43.21'
        }
      }
    ];
    const registerWords = {
      id: 'txt 001A',
      index: '652.M',
      decommissioned: false,
      generalNote: '652.M generalNote',
      parent: {index: 'syst 652.M', decommissioned: false},
      title: 'txt 630A',
      titleDetails: '',
      titleFull: 'txt 630A',
      note: {
        index: '',
        name: ''
      },
      items: items
    };
    assert.deepEqual(registerWords, esUtil.parseRegisterRecord(esRes, 1, dk5Tab, dk5GeneralNote));
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

describe('Testing notes', () => {
  it('it should create a systematic note', () => {
    const esSys = {
      hits: [
        {_source: {a40: ['Note text 12.34'], a40b: ['12.34']}},
        {_source: {a40: ['Note text 12 and 12'], a40b: ['12', '12']}},
        {_source: {a40: ['Note text', 'Note text 12.34'], a40b: ['12.34']}}
      ]
    };
    assert.equal('Note text <dk>12.34</dk>', esUtil.createTaggedSystematicNote(esSys, 0, 'a40'));
    assert.equal('Note text <dk>12</dk> and <dk>12</dk>', esUtil.createTaggedSystematicNote(esSys, 1, 'a40'));
    assert.equal('Note text<br >Note text <dk>12.34</dk>', esUtil.createTaggedSystematicNote(esSys, 2, 'a40'));
    assert.equal('', esUtil.createTaggedSystematicNote(esSys, 3));
  });
  it('it should create a register note', () => {
    const esReg = {
      hits: [
        {_source: {651: ['Note text 12.34'], '651b': ['12.34']}},
        {_source: {651: ['Note text 12 and 12'], '651b': ['12', '12']}},
        {_source: {651: ['Note text', 'Note text 12.35'], '651b': ['12.35']}}
      ]
    };
    const dk5Syst = {12: '12', 12.34: '11.34'};
    assert.equal('Note text <dk>12.34</dk>', esUtil.createTaggedRegisterNote(esReg, 0, dk5Syst));
    assert.equal('Note text <dk>12</dk> and <dk>12</dk>', esUtil.createTaggedRegisterNote(esReg, 1, dk5Syst));
    assert.equal('Note text<br >Note text 12.35', esUtil.createTaggedRegisterNote(esReg, 2, dk5Syst));
    assert.equal('', esUtil.createTaggedSystematicNote(esReg, 3));
  });
  it('it should create a notes table', () => {
    const esReg = {
      hits: [
        {_source: {'652m': ['12.34'], 651: ['Note text 12.34'], '651b': ['12.34']}},
        {_source: {'652n': ['12'], 651: ['Note text 12 and 12'], '651b': ['12', '12']}},
        {_source: {'652d': ['12.5'], 651: ['Note text 12.5'], '651b': ['12.5']}}
      ]
    };
    const expected = {
      12.34: 'Note text <dk>12.34</dk>',
      12: 'Note text <dk>12</dk> and <dk>12</dk>',
      12.5: 'Note text <dk>12.5</dk>'
    };
    assert.deepEqual(expected, esUtil.parseRegisterForNotes(esReg));
  });
});
