/* eslint-disable @typescript-eslint/no-var-requires */
const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

rules.push({
    test: /\.s[ac]ss$/i,
    use: [
        "style-loader",
        "css-loader",
        "sass-loader",
    ],
});

rules.push({
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
});

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  },
};