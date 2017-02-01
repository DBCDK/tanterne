const {version} = require('../../package.json');

const VERSION = version;
const VERSION_PREFIX = getVersionPrefix();

function getVersionPrefix() {
  // prefix for the API-endpoint, ie /v0, /v1, or ..
  return '/v' + parseInt(version, 10);
}

module.exports = {
  VERSION,
  VERSION_PREFIX,
  getVersionPrefix
};
