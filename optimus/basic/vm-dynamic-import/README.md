### webpack在vm里动态引入编译后的文件(js/css)

* 1、package配置assets-webpack-plugin
* 2、webpack.config.js配置assets相关

```javascript
var AssetsPlugin=require('assets-webpack-plugin');

plugins:[
    new AssetsPlugin({
        filename:'build/webpack.assets.js',  //自己的build路径
        processOutput:function(assets){
            return 'window.WEBPACK_ASSETS='+JSON.stringify(assets);
        }
    })
]
```

3、生成文件webpack.assets.js，具体格式和内容

```javascript
window.WEBPACK_ASSETS={
	"build": {
		"js": "7d0b748f52c9caf6bac4.build.js",
		"css": "7d0b748f52c9caf6bac4.build.css"
	},
	"multidimensional": {
		"js": "7d0b748f52c9caf6bac4.multidimensional.js",
		"css": "7d0b748f52c9caf6bac4.multidimensional.css"
	}
}
```

4、vm引入代码

```html
<script>
    document.write('<script type="text/javascript" src="/build/webpack.assets.js?v='+Math.random()+'"><\/script>');
</script>
<script>
	document.write('<link href="/build/' + window.WEBPACK_ASSETS['build'].css + '" rel="stylesheet" media="screen" />');
</script>
<script>
	document.write('<script type="text/javascript" src="/build/' + window.WEBPACK_ASSETS['build'].js + '"><\/script>');
</script>
```

注意：
webpack.config.js中output的js文件和css文件都带上[hash]

```javascript
output: {
	path: "../build/",
	filename: "[hash].[name].js"
}
plugins: [
	new ExtractTextPlugin("[hash].[name].css"),
]
```