import request from 'superagent';

export function hierarchy(index) {
  return new Promise((resolve, reject) => {
    request('/api/hierarchy')
      .query({q: index})
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
