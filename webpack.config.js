const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    devtool: 'source-map',
    entry: './src/main.ts',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
            },
            {
             test: /\.css$/,
             use: [
                 'style-loader',
                 'css-loader'
             ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html"
        })

    ],
    resolve: {
        extensions: ['.ts', '.css', '...']
    },
    devServer: {
        static: {
            directory: './'
        }
    }
}