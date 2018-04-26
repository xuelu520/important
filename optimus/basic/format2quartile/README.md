# 数据变换千分位

#### 1、功能介绍
数字的千分位显示

* 1、参数介绍

```
            str，需要变换的字符串
            point，保留小数据位，默认为4位
``` 
* 2、数据格式介绍

```
            1、str为字符型字符串，直接返回;   eg:format2quartile("test"); // test
            2、str为'NaN'/'Infinity'，返回'--';   eg:format2quartile("NaN"); // --
            3、str为数据或数字型字符串，进行千分位显示;   eg:format2quartile("100000"); // 100,000
```

#### 2、代码

```javascript
var format2quartile = function(str, point){
	str = str + "";
	if (str === 'NaN' || str === 'Infinity') {
		return '--';
	}
	if(isNaN(str)) return str;
	if(!point || point == undefined || point == null) point = 4;
	if(parseFloat(str) === 0) return parseFloat(str);
	if(parseFloat(str) < 1) return parseFloat(str).toFixed(point);
	var pn = "";
	if(str.indexOf(".") > -1){
		pn = str.substr(str.indexOf("."), str.length);
		str = str.substr(0, str.indexOf("."));
	}
	var len = str.length,
	var str2 = '',
	var max = Math.floor(len / 3);
	for(var i = 0 ; i < max ; i++){
		var s = str.slice(len - 3, len);
		str = str.substr(0, len - 3);
		str2 = (',' + s) + str2;
		len = str.length;
	}
	str += str2;
	if(str.indexOf(",") == 0) str = str.substr(1, str.length);
	return str + pn.substr(0, 3);
}
```