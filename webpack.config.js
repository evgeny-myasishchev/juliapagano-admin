const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = () => ({
  entry: {
    app: './app/index.jsx',
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('build'),
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].bundle.css',
    }),
    new HtmlWebpackPlugin({
      template: './app/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
});
