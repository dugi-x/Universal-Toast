const path = require('path');

module.exports = {
  entry: {
    "universal-toast": './src/index.js',
  },
  output: {
    filename: '[name].min.js',
    path: __dirname + '/dist',
  },
  mode: 'production'
};