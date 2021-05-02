const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@state': path.resolve(__dirname, 'src/state/'),
        },
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9000,
        host: 'localhost',
        hot: true,
        open: true,
        proxy: {
            // '/v1': 'http://mt2:8080',
            '/v1': 'http://localhost:6000',
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new CopyPlugin({
            patterns: [{ from: 'src/assets', to: 'assets' }],
        }),
    ],
};
