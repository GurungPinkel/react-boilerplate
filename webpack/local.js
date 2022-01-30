const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const commonConfig = require('./common');

const localConfig = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    open: true,
    port: 5000,
    liveReload: true,
    hot: true,
    http2: true,
    // allowedHosts: ['.gurung.com'],
    historyApiFallback: true // support for react-router
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './public/index.html')
    })
  ]
};

module.exports = merge(commonConfig, localConfig);
