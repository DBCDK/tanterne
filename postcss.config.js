/**
 * @file: Configuration of postcss build settings
 * @type {{plugins: [*]}}
 */

module.exports = {
  plugins: [
    require('autoprefixer')({}),
    require('postcss-inline-svg')({}),
    require('cssnano')({})
  ]
};
