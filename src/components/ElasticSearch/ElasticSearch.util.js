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
  if (esRes && Array.isArray(esRes.hits) && esRes.hits[pos] && esRes.hits[pos]._source &&  Array.isArray(esRes.hits[pos]._source[fld])) {
    return esRes.hits[pos]._source[fld];
  }
  return [];
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
