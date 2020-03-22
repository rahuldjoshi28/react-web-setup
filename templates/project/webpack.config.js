const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');

const outputPath = `${__dirname}/dist`;
module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: ['./src/index.js'],
    output: {
        publicPath: '/',
        filename: './bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{loader: 'url-loader', options: {limit: 10000}}],
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new copyWebpackPlugin([
            {from: './index.html', to: path.resolve(__dirname, 'dist')},
            {from: './src/assets', to: `${outputPath}/assets`}
        ]),
    ],
    devtool: "source-map"
};

