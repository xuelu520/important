import Mock from 'mockjs';

if (window.location.search.indexOf("debug") > 0 || window.location.search.indexOf("web_ci") > 0) {

	/*
	channelGroup:
	dateType:1
	tab:1
	startDate:2017-12-04
	endDate:2018-02-01

	*/
	Mock.mock("/data/kpi/chart.do", "post", {
		"data": [{
			"key|10": [
				"@datetime('yyyy-MM-dd')"
			],
			"value|10": [
				"@natural(1000, 10000)"
			]
		}],
		"msg": "参数不对",
		"status": true
	});



	/*
	channelGroup:
	dateType:1
	startDate:2017-12-04
	endDate:2018-02-01
	offset:1
	limit:10
	*/
	Mock.mock("/data/kpi/list.do", "post", {
		"total": "@natural(1000, 10000)",
		"status": true,
		"data|0-10": [{
			"appCode": 0,
			"day": "@datetime('yyyy-MM-dd')",
			"dayLeftRate": "@float(0, 0, 4, 4)",
			"dayLeftUser": "@natural(1000, 10000)",
			"feeUser": "@natural(1000, 10000)",
			"freeUser": "@natural(1000, 10000)",
			"newUser": "@natural(1000, 10000)",
			"newUserQuality": "@natural(1000, 10000)",
			"newUserVer17": "@natural(1000, 10000)",
			"qualityPer": "@float(0, 0, 4, 4)",
			"sevenLeftRate": "@float(0, 0, 4, 4)"
		}],
		"msg": "返回成功"
	});
}