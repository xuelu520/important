/**
 * 开发环境配置
 * User: gaogy
 * Date: 2017/07/03
 * Time: 15:09
 */
var path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    config = require('./webpack.dev.conf'),
    app = express();

var rootPath = path.resolve(__dirname, '..');
var compiler = webpack(config);

// 静态资源获取
app.use('/static', express.static(path.join(rootPath, 'static')));

// HTML5 history API插件
app.use(require('connect-history-api-fallback')());

// 组织包装bundle文件使其变为中间件
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

// 启用 hot-reload 和 state-preserving
// 展示编译错误
app.use(require('webpack-hot-middleware')(compiler));

app.listen(9000, '127.0.0.1', function(err) {
    err && console.log(err);
});

/*******************用户群分组*********************/
app.post('/login', function(req, res){
    res.send(require("../mock/login.json"));
});
