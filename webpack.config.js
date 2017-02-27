const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => ({
  entry: './app/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: `${process.cwd()}/build`,
  },
  plugins: [new HtmlWebpackPlugin()],
});
