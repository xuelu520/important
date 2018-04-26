/**
 * 生产环境配置
 * User: gaogy
 * Date: 2017/07/03
 * Time: 15:08
 */
var fs = require('fs'),
    path = require('path'),
    webpack = require('webpack'),
    config = require('./webpack.prod.conf');

var rootPath = path.resolve(__dirname, '..');

webpack(config, function(err, stats) {
  // 控制台显示build信息
  console.log(stats.toString({ chunks: false, color: true }));

  // 将build信息保存到__build_info__文件中
  fs.writeFile(
      path.join(path.join(rootPath, 'dist'), '__build_info__'),
      stats.toString({ color: false })
  );
});
