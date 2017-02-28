/**
 * @file
 * Client for calling the API.
 */

import request from 'superagent';

/**
 * Get hierarchy for index.
 *
 * @param index
 * @returns {Promise}
 */
export function hierarchy(index) {
  return call('hierarchy', {q: index});
}

/**
 * Call endpoint on API.
 *
 * @param url
 * @param query
 * @returns {Promise}
 */
function call(url, query) {
  return new Promise((resolve, reject) => {
    request(`/api/${url}`)
      .query(query)
      .end((err, res) => {
        if (err) {
          reject(err);
        }
        else {
          const result = JSON.parse(res.text).result;
          resolve(result);
        }
      });
  });
}
