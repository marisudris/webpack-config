const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = 'development';

if (process.env.NODE_ENV === 'production') {
    mode = 'production';
}

module.exports = {
    mode,
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
        ],
    },
    plugins: [new MiniCssExtractPlugin()],
    devServer: {
        static: './dist',
        hot: true,
    },
    devtool: 'source-map',
};
