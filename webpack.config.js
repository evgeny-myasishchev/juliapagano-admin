const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env) {
    return {
        entry: './app/index.js',
        output: {
            filename: '[chunkhash].[name].js',
            path: './public/assets'
        },
        plugins: [new HtmlWebpackPlugin()]
    }
}
