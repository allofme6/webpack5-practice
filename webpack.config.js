

var HtmlWebpackPlugin = require('html-webpack-plugin');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/index'),
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]--[hash:base64:5]',
                            },
                        }
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.jsx?$|\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            configFile: './babel.config.json',
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            name: 'img/[name]-[sha512:hash:base64:7].[ext]',
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './index.html'),
            hash: true,
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        open: true,
        host: "0.0.0.0",
        port: 8000,
        inline: true,
        hot: true,
        disableHostCheck: true,
        contentBase: path.join(__dirname, './dist'),
        stats: {
            colors: true,
        },
        after: function(app, server, compiler) {
            console.log('中间件执行完成')
        },
        headers: {
            "X-Custom-Foo": "bar"
        },
        compress: true,
        historyApiFallback: true,
        before(app) {
            // apiMocker(app, path.join(__dirname, './mock/index.js'));
        },
    },
    // mode: 'production'
};