/* eslint-disable @typescript-eslint/no-var-requires */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new BundleAnalyzerPlugin()
];
