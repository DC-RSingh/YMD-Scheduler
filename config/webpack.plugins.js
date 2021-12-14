/* eslint-disable @typescript-eslint/no-var-requires */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
//   new BundleAnalyzerPlugin(),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, '../src', 'assets'),
        to: path.resolve(__dirname, '../.webpack/renderer', 'assets')
      }, 
    ],
    options: {
      concurrency: 100,
    },
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, '../prisma', 'ymd-db.db'),
        to: path.resolve(__dirname, '../.webpack', 'prisma'),
      }
    ]
  }),
];
