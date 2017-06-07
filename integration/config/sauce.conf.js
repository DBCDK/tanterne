module.exports = {
  maxInstances: 2,
  capabilities: [
    {
      maxInstances: 2,
      browserName: 'chrome',
      platform: 'OS X 10.11',
      version: 'latest',
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      build: process.env.TRAVIS_BUILD_NUMBER
    }
  ],
  mochaOpts: {
    ui: 'bdd',
    compilers: ['js:babel-register'],
    timeout: 120000
  }
};
