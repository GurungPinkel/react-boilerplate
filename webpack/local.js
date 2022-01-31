const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const dotenv = require('dotenv');
const commonConfig = require('./common');

const env = dotenv.config({
  path: path.join(__dirname, '..', '.env.development.local')
}).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  // eslint-disable-next-line no-param-reassign
  prev[`process.env.${next}`] = JSON.stringify(env[next]);

  return prev;
}, {});

const localConfig = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 5000,
    liveReload: true,
    hot: true,
    http2: true,
    // allowedHosts: ['.xyz.com'],
    historyApiFallback: true // support for react-router
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './public/index.html')
    }),
    new webpack.DefinePlugin(envKeys)
  ]
};

module.exports = merge(commonConfig, localConfig);
