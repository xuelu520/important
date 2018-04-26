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