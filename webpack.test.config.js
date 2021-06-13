const { resolve } = require('path');

/**
 * https://webpack.js.org/configuration/
 */
module.exports = {
  mode: 'development',
  entry: resolve(__dirname, 'node_modules/htmlparser2/lib/index.js'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'htmlparser2.js',
    library: 'htmlparser2',
    libraryTarget: 'umd'
  },
  devtool: 'source-map'
};
