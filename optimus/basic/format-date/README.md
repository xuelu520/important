# 数据变换千分位

#### 1、功能介绍
字符串或者时间按照指定格式转换

* 1、参数介绍

```
            src，需要变换的字符串或者时间
            formatStr，指定的转换格式
            type，对src的类型限定，默认对src限定为字符串；type值可选为（空/date）
``` 
* 2、转换格式介绍

```
            1、yyyy // 年 2017
            2、MM // 月 M/MM(1/01)
            3、dd // 日 d/dd(1/01)
            4、hh // 时 h/hh(1/01)
            5、mm // 分 m/mm(1/01)
            6、ss // 秒 s/ss(1/01)
            7、qq // 季度 q/qq(1/01)
            8、S // 毫秒 200
```

#### 2、代码

```javascript
var formatDate = function(src, formatStr, type) {
	var date = "";
	if(!type){
		// type为空,src为字符串
		date = new Date(src);
	}else{
		if(type == "date"){
			// type不为空,type为date--->src为Date
			if(typeof src === "string"){
				console.error("parameter is wrong!");
				return src;
			}
			date = src;
		}else{
			// 参数错误
			console.error("parameter is wrong!");
			return src;
		}
	}
	
	if(isNaN(date.getTime())){
		console.error("parameter is wrong!");
		return src;
	}
	/*
	 * eg:formatDate = "yyyy-MM-dd hh:mm:ss";
	 */
	var o = {
		"M+": date.getMonth() + 1, // month
		"d+": date.getDate(), // day
		"h+": date.getHours(), // hour
		"m+": date.getMinutes(), // minute
		"s+": date.getSeconds(), // second
		"q+": Math.floor((date.getMonth() + 3) / 3), // quarter
		"S": date.getMilliseconds()	// millisecond
	};
	if (/(y+)/.test(formatStr)) {
		formatStr = formatStr.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(formatStr)) {
			formatStr = formatStr.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return formatStr;
};
```