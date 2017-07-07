const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'konami-code': './index.js',
        'konami-code.min': './index.js'
    },
    devtool: 'sourcemap',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'lib')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|lib)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/
        }),
        new CopyWebpackPlugin([
            { from: 'lib/konami-code.js', to: '../docs/konami-code.js', force: true }
        ])
    ]
};