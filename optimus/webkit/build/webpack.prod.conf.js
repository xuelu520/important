/**
 * 生产环境webpack配置
 * User: gaogy
 * Date: 2016/11/25
 * Time: 15:09
 */
var path = require('path'),
    webpack = require('webpack'),
    config = require('./webpack.base.conf'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    SOURCE_MAP = false;

var rootPath = path.resolve(__dirname, '..'), // 项目根目录
    src = path.join(rootPath, 'src'); // 开发源码目录
var commonPath = {
    rootPath: rootPath,
    indexHTML: path.join(src, 'index.html'), // 入口基页
    staticDir: path.join(rootPath, 'static') // 无需处理的静态资源目录
};

config.output.filename = '[name].[id].js';
config.output.chunkFilename = 'chunk[id].js';
config.devtool = SOURCE_MAP ? 'source-map' : false;

// 生产环境下分离出 CSS 文件
config.module.rules.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader'
  })
}, {
  test: /\.less$/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader','less-loader']
  })
}, {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader','sass-loader']
  })
});

config.plugins.push(
    new CleanWebpackPlugin('dist', {
      root: commonPath.rootPath,
      verbose: false
    }),
    new CopyWebpackPlugin([ // 复制高度静态资源
      {
        context: commonPath.staticDir,
        from: '**/*',
        ignore: ['*.md']
      }
    ]),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // 公共代码分离打包
      names: ['vendor', 'mainifest']
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false
      // allChunks: true // 若要按需加载 CSS 则请注释掉该行
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: commonPath.indexHTML,
      chunksSortMode: 'none'
    })
);

module.exports = config;
