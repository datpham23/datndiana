var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./webpack.config.dev.js');

baseConfig.entry = [
  './public/index'
];

baseConfig.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  })
];

module.exports = baseConfig;
