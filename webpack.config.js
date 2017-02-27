const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function () {
  return {
    entry: './app/index.js',
    output: {
      filename: 'bundle.js',
      path: './build',
    },
    plugins: [new HtmlWebpackPlugin()],
  };
};
