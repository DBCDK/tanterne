/**
 * @file
 */

/**
 * Extract the hit part of the ES result, if it exist
 *
 * @param esRes
 * @param pos
 * @param fld
 * @returns {*}
 */
export function getEsField(esRes, pos, fld) {
  if (esRes && Array.isArray(esRes.hits) && esRes.hits[pos] && esRes.hits[pos]._source && Array.isArray(esRes.hits[pos]._source[fld])) {
    return esRes.hits[pos]._source[fld];
  }
  return [];
}

/**
 * return first occurrence of a given list of fields
 *
 * @param esRes
 * @param pos
 * @param fldList
 * @returns {*}
 */
export function getFirstField(esRes, pos, fldList) {
  let field = '';
  fldList.forEach(function (tag) {
    const fld = getEsField(esRes, pos, tag);
    if (!field && fld[0]) {
      field = fld[0];
    }
  });
  return field;
}

/**
 * Merge default and function given parameters, and translate to ES names
 *
 * @param pars
 * @param defaultParameters
 * @param esParMap
 * @returns {{}}
 */
export function setAndMap(pars, defaultParameters, esParMap) {
  let ret = {};
  Object.keys(defaultParameters).forEach(function (key) {
    ret[esParMap[key]] = pars[key] ? pars[key] : defaultParameters[key];
  });
  return ret;
}

/**
 * sort on ascending distance
 *
 * @param buf
 * @param elements
 * @returns {*|Blob|string|ArrayBuffer}
 */
export function sortDistanceAndSlice(buf, elements) {
  return buf.sort(function (a, b) {
    return (parseInt(a.distance, 10) - parseInt(b.distance, 10));
  }).slice(0, elements);
}

/**
 * sort an array on the index field.
 *
 * @param arr
 * @returns {*}
 */
export function indexSort(arr) {
  return arr.sort(function (a, b) {
    if (a.index === b.index) {
      return (a.title > b.title ? 1 : -1);
    }
    return (a.index > b.index ? 1 : -1);
  });
}

/**
 * sort an array first on query title match second on the index field.
 *
 * @param arr
 * @returns {*}
 */
export function titleMatchSort(arr, query = null) {
  const normQuery = query && query.replace(/(\*|%)/, '').toLowerCase() || null;
  return arr.sort(function (a, b) {
    if (normQuery) {
      if (normQuery === a.title.toLowerCase()) {
        return -1;
      }
      if (normQuery === b.title.toLowerCase()) {
        return 1;
      }
    }
    return (a.title > b.title ? 1 : -1);
  });
}

/**
 * sort an array on the title field
 *
 * @param arr
 * @returns {*}
 */
export function titleSort(arr) {
  return arr.sort(function (a, b) {
    return (a.title > b.title ? 1 : -1);
  });
}

/**
 * parse a register record and return a consolidated structure
 * To understand where title, notes and like are placed, you have to consult the
 * marc format specifications for dk5
 *
 * @param esRes
 * @param pos
 * @param dk5Tab
 * @returns {*}
 */
export function parseRegisterRecord(esRes, pos, dk5Tab, query = null) {
  const ret = {};
  ret.title = '' + getFirstField(esRes, pos, ['630a', '633a', '640a', '600a', '610a', 'a20a']);
  ret.titleDetails = getFirstField(esRes, pos, ['630e', '633e', '640e', '600f', '610e', 'a20b']);
  ret.titleFull = ret.title + (ret.titleDetails ? ' - ' + ret.titleDetails : '');
  ret.index = getFirstField(esRes, pos, ['652m', 'b52m', '652n']);
  ret.decommissioned = ret.index && dk5Tab[ret.index] ? dk5Tab[ret.index].decommissioned : false;
  ret.id = getFirstField(esRes, pos, ['001a']);
  ret.note = {
    name: getFirstField(esRes, pos, ['651a']),
    index: getFirstField(esRes, pos, ['651b'])
  };
  ret.parent = Object.assign({}, dk5Tab[ret.index]);
  const registerWords = getEsField(esRes, pos, 'b52m');
  if (registerWords.length === 0) {
    return ret;
  }
  const noteNames = getEsField(esRes, pos, 'b51a'); // ["Før ..."]
  const noteDk5 = getEsField(esRes, pos, 'b51b'); // ["11.12"]
  const noteRelationIndex = getEsField(esRes, pos, 'b51å'); // [2]
  const registerWordIndex = getEsField(esRes, pos, 'b52å'); // [1, 2]

  const registerWordTitle = getEsField(esRes, pos, 'b52y');
  const items = [];
  for (let i = 0; i < registerWords.length; i++) {
    const hasNoteIndex = noteRelationIndex.indexOf(registerWordIndex[i]);
    let note = null;
    if (hasNoteIndex >= 0) {
      note = {
        name: noteNames[hasNoteIndex],
        index: noteDk5[hasNoteIndex]
      };
    }
    items.push({index: registerWords[i], title: registerWordTitle[i], parent: dk5Tab[registerWords[i]], note});
  }
  return Object.assign({}, ret, {items: titleMatchSort(items, query)});
}

/**
 * Collect systematic notes. Notes are found in field a40
 *
 * @param systRec
 * @param hitPos
 * @param fld
 * @returns {string}
 */
export function createTaggedSystematicNote(systRec, hitPos, fld) {
  let note = getEsField(systRec, hitPos, fld).join('<br >');
  if (note) {
    note = parseTextAndTagSyst(note, getEsField(systRec, hitPos, fld + 'b'));
  }
  return note;
}

/**
 * Collect register notes. Notes are found in field 651 and b00
 *
 * @param regRecs
 * @param hitPos
 * @param dk5Syst
 * @returns {*|string|String}
 */
export function createTaggedRegisterNote(regRecs, hitPos, dk5Syst) {
  const note = [];
  ['651', 'b00'].forEach((noteTag) => {
    const noteText = getEsField(regRecs, hitPos, noteTag).join('<br >');
    if (noteText) {
      note.push(parseTextAndTagSyst(noteText, getEsField(regRecs, hitPos, noteTag + 'b'), dk5Syst));
    }
  });
  return note.join('<br />');
}

/**
 * Parse all register records for notes
 * Notes for the same index, can be found in more than one record
 *
 * @param regRecs
 * @param dk5Syst
 * @returns {{}}
 */
export function parseRegisterForNotes(regRecs, dk5Syst) {
  const notes = {};
  for (let hitPos = 0; hitPos < regRecs.hits.length; hitPos++) {
    const index = getFirstField(regRecs, hitPos, ['652m', '652n', '652d']);
    const note = createTaggedRegisterNote(regRecs, hitPos, dk5Syst);
    if (notes[index]) {
      if (notes[index].indexOf(note) === -1) {
        notes[index] += '<br />' + note;
      }
    }
    else {
      notes[index] = note;

    }
  }
  return notes;
}

/**
 * Parse all register records for general notes
 *
 * @param regRecs
 * @returns {{}}
 */
export function parseRegisterForGeneralNotes(regRecs) {
  const notes = {};
  for (let hitPos = 0; hitPos < regRecs.hits.length; hitPos++) {
    const noteText = getEsField(regRecs, hitPos, 'b00').join('<br >');
    if (noteText) {
      const index = getFirstField(regRecs, hitPos, ['652m', '652n', '652d']);
      notes[index] = noteText;
    }
  }
  return notes;
}

/**
 * Parse register records and extract unique words
 *
 * @param regRecs
 * @param wordFields
 * @returns {Array}
 */
export function parseRegisterForUniqueWords(regRecs, wordFields) {
  let uniqueWords = {};
  for (let hitPos = 0; hitPos < regRecs.hits.length; hitPos++) {
    wordFields.forEach((fld) => {
      const wordArr = getEsField(regRecs, hitPos, fld);
      for (let i = 0; i < wordArr.length; i++) {
        wordArr[i].split(/[\s,]+/).forEach((word) => {
          word = word.replace(/^[:\-\.#]+|[:\-\.#]+$|[\"()]+/g, ''); // eslint-disable-line no-useless-escape
          let num = word.replace(/[\.:-]/g, ''); // eslint-disable-line no-useless-escape
          if (num.length > 2 && parseInt(num, 10) !== num) {
            uniqueWords[word.toLowerCase()] = true;
          }
        });
      }
    });
  }
  return Object.keys(uniqueWords);
}

/**
 * Parse the note and put systematics in tags
 *
 * @param note
 * @param noteSyst
 * @param dk5Syst
 * @returns {*}
 */
function parseTextAndTagSyst(note, noteSyst, dk5Syst = false) {
  let ret = note;
  let notePos = 0;
  for (let i = 0; i < noteSyst.length; i++) {
    let syst = noteSyst[i];
    const p = ret.indexOf(syst, notePos);
    if (p > -1) {
      const replace = (!dk5Syst || dk5Syst[syst]) ? '<dk>' + syst + '</dk>' : syst;
      ret = ret.substr(0, p) + replace + ret.substr(p + syst.length);
      notePos = p + replace.length;
    }
  }
  return ret.replace(' . ', '. ').replace(' , ', ', ');
}
