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
    if (!field) {
      field = getEsField(esRes, pos, tag)[0];
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
 * parse a register record and return a consolidated structure
 *
 * @param esRes
 * @param pos
 * @param dk5Tab
 * @returns {*}
 */
export function parseRegisterRecord(esRes, pos, dk5Tab) {
  const entryTitle = getFirstField(esRes, pos, ['630a', '633a', '640a', '600a', '610a']);
  const dk5 = getEsField(esRes, pos, '652m')[0];
  const id = getEsField(esRes, pos, '001a')[0];
  const aspectDk5 = getEsField(esRes, pos, 'b52m');
  if (aspectDk5.length === 0) {
    return {title: entryTitle, id: id, index: dk5, parent: dk5Tab[dk5]};
  }

  const aspectTitle = getEsField(esRes, pos, 'b52y');
  const items = [];
  for (let i = 0; i < aspectDk5.length; i++) {
    items.push({index: aspectDk5[i], title: aspectTitle[i], parent: dk5Tab[aspectDk5[i]]});
  }
  return {title: entryTitle, id: id, index: dk5, parent: Object.assign({}, dk5Tab[dk5]), items: items};
}
