/**
 * 开发环境webpack配置
 * User: gaogy
 * Date: 2016/11/25
 * Time: 15:09
 */
var path = require('path'),
    webpack = require('webpack'),
    config = require('./webpack.base.conf'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
//  SOURCE_MAP = true;
    SOURCE_MAP = false;

// 定义路径
var rootPath = path.resolve(__dirname, '..'), // 项目根目录
    src = path.join(rootPath, 'src'),
    globalCss = path.join(src, './assets/css');

config.output.filename = '[name].[id]';
config.output.chunkFilename = '[id].js';
config.devtool = SOURCE_MAP ? 'eval-source-map' : false;

// 添加 hot-reload 的依赖代码
config.entry.app = [
    'eventsource-polyfill',
    'webpack-hot-middleware/client?reload=true',
    'webpack/hot/only-dev-server',
    config.entry.app
];

config.output.publicPath = '/';

// 开发环境下直接内嵌 CSS 以支持热替换
config.module.rules.push({
    test: /\.css$/,
    exclude: globalCss,
    use: [
        'style-loader',
        'css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]'
    ]
}, {
    test: /\.css$/,
    include: globalCss,
    use: [
        'style-loader',
        'css-loader'
    ]
},{
    test: /\.less$/,
    use: [
        'style-loader',
        'css-loader',
        'less-loader'
    ]
}, {
    test: /\.scss$/,
    use: [
        'style-loader',
        'css-loader',
        'sass-loader'
    ]
});

config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
        filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: 'body',
        template: path.join(src, 'index.html'),
        chunksSortMode: 'none'
    }),
    new BrowserSyncPlugin({
        host: '127.0.0.1',
        port: 9090,
        proxy: 'http://127.0.0.1:9000/',
        logConnections: false,
        notify: false
    }, {
        reload: false
    })
);

module.exports = config;
