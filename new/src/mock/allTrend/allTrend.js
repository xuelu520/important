import Mock from 'mockjs';


if (window.location.search.indexOf("debug") > 0 || window.location.search.indexOf("web_ci") > 0) {


	Mock.mock("/data/trend/chart.do", "post", {
		"total": "@natural(1000, 10000)",
		"status": true,
		"data|1-10": [{
			"name": "@word(6)",
			"value|10": [
				"@natural(1000, 10000)"
			],
			"key|10": [
				"@datetime('yyyy-MM-dd')"
			]
		}],
		"msg": "返回成功"
	});


	//只用于Excel下载
	Mock.mock("/data/trend/table.do", "post", {
		"status": true,
		"data|0-10": [{
			"appCode": 24,
			"channelGroup": "@word(6)",
			"day": "@datetime('yyyy-MM-dd')",
			"dayLeftRate": "@float(0, 0, 4, 4)",
			"dayLeftUser": "@natural(1000, 10000)",
			"newUser": "@natural(1000, 10000)",
			"sevenLeftRate": "@float(0, 0, 4, 4)",
			"sevenLeftUser": "@natural(1000, 10000)"
		}],
		"msg": "返回成功"
	});
}