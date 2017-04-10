/**
 * @file: Configuration of postcss build settings
 * @type {{plugins: [*]}}
 */

module.exports = {
  plugins: [
    require('autoprefixer')({browsers: ['last 2 versions']}),
    require('postcss-inline-svg')({}),
    require('cssnano')({})
  ]
};
