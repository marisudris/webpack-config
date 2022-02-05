const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefresgWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

let mode = 'development';

const plugins = [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
        template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
];

if (process.env.NODE_ENV === 'production') {
    mode = 'production';
} else {
    plugins.push(new ReactRefresgWebpackPlugin());
}

module.exports = {
    mode,
    output: {
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'images/[hash][ext][query]',
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)/i,
                type: 'asset',
            },
        ],
    },
    plugins,
    devServer: {
        static: './dist',
        hot: true,
        open: true,
    },
    devtool: 'source-map',
};
