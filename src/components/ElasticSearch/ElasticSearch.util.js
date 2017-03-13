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
 *
 * @param esRes
 * @param pos
 * @param dk5Tab
 * @returns {*}
 */
export function parseRegisterRecord(esRes, pos, dk5Tab) {
  const ret = {};
  ret.title = getFirstField(esRes, pos, ['630a', '633a', '640a', '600a', '610a', 'a20a']);
  ret.titleDetails = getFirstField(esRes, pos, ['630e', '633e', '640e', '600f', '610e', 'a20b']);
  ret.titleFull = ret.title + (ret.titleDetails ? ' - ' + ret.titleDetails : '');
  ret.index = getFirstField(esRes, pos, ['652m']);
  ret.id = getFirstField(esRes, pos, ['001a']);
  ret.parent = Object.assign({}, dk5Tab[ret.index]);
  const aspectDk5 = getEsField(esRes, pos, 'b52m');
  if (aspectDk5.length === 0) {
    return ret;
  }

  const aspectTitle = getEsField(esRes, pos, 'b52y');
  const items = [];
  for (let i = 0; i < aspectDk5.length; i++) {
    items.push({index: aspectDk5[i], title: aspectTitle[i], parent: dk5Tab[aspectDk5[i]]});
  }
  return Object.assign({}, ret, {items: items});
}

/**
 * Collect systematic notes. Notes are found in field a40
 *
 * @param systRec
 * @param hitPos
 * @returns {string}
 */
export function createTaggedSystematicNote(systRec, hitPos) {
  let note = getEsField(systRec, hitPos, 'a40').join('<br >');
  if (note) {
    note = parseTextAndTagSyst(note, getEsField(systRec, hitPos, 'a40b'));
  }
  return note;
}

/**
 * Collect register notes. Notes are found in field 651 and b00
 *
 * @param regRecs
 * @param hitPos
 * @returns {*|string|String}
 */
export function createTaggedRegisterNote(regRecs, hitPos) {
  const note = [];
  ['651', 'b00'].forEach((noteTag) => {
    const noteText = getEsField(regRecs, hitPos, noteTag).join('<br >');
    if (noteText) {
      note.push(parseTextAndTagSyst(noteText, getEsField(regRecs, hitPos, noteTag + 'b')));
    }
  });
  return note.join('<br />');
}

/**
 * Parse all register records for notes
 * Notes for the same index, can be found in more than one record
 *
 * @param regRecs
 * @returns {{}}
 */
export function parseRegisterForNotes(regRecs) {
  const notes = {};
  for (let hitPos = 0; hitPos < regRecs.hits.length; hitPos++) {
    const index = getFirstField(regRecs, hitPos, ['652m', '652n', '652d']);
    const note = createTaggedRegisterNote(regRecs, hitPos);
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
          word = word.replace(/^[:\-\.#]+|[:\-\.#]+$|[\"()]+/g, '');
          let num = word.replace(/[\.:-]/g, '');
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
 * @returns {*}
 */
function parseTextAndTagSyst(note, noteSyst) {
  let ret = note;
  let notePos = 0;
  for (let i = 0; i < noteSyst.length; i++) {
    let syst = noteSyst[i];
    const replace = '<dk>' + syst + '</dk>';
    const p = ret.indexOf(syst, notePos);
    if (p > -1) {
      ret = ret.substr(0, p) + replace + ret.substr(p + syst.length);
      notePos = p + replace.length;
    }
  }
  return ret;
}
