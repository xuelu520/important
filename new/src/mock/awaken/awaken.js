import Mock from 'mockjs';


if (window.location.search.indexOf("debug") > 0 || window.location.search.indexOf("web_ci") > 0) {

	// appCode:
	// endDate:2018-02-03
	// limit:10
	// offset:1
	// paramValue:
	// startDate:2018-01-05



	// Mock.mock("/data/awaken/table.do", "post", {
	// 	"total": "@natural(1000, 10000)",
	// 	"status": true,
	// 	"data|0-10": [{
	// 		"appCode": 0,
	// 		"day": "@datetime('yyyy-MM-dd')",
	// 		"dayLeftRate": "@float(10, 10.0, 2, 2)",
	// 		"dayLeftUser": "@natural(1000, 10000)",
	// 		"feeUser": "@natural(1000, 10000)",
	// 		"freeUser": "@natural(1000, 10000)",
	// 		"newUser": "@natural(1000, 10000)",
	// 		"newUserQuality": "@natural(1000, 10000)",
	// 		"newUserVer17": "@natural(1000, 10000)",
	// 		"qualityPer": "@float(10, 10.0, 2, 2)",
	// 		"sevenLeftRate": "@float(10, 10.0, 2, 2)"
	// 	}],
	// 	"msg": "返回成功"
	// });


	Mock.mock("/data/awaken/table.do", "post", {
		"total": "@natural(1000, 10000)",
		"status": true,
		"data|0-10": [{
			"appCode": 24,
			"awakeChannel": "@word(6)",
			"awakenTimes": "@natural(1000, 10000)",
			"awakenUser": "@natural(1000, 10000)",
			"day": "2018-02-03",
			"firstBootUser": "@natural(1000, 10000)",
			"firstParam": "litep",
			"fisrtBootUserPer": "@float(0, 0, 4, 4)",
			"openlapUser": "@natural(1000, 10000)",
			"os": "Android",
			"overlapUser": "@natural(1000, 10000)",
			"pushlapUser": "@natural(1000, 10000)",
			"secondParam": "@word(6)"
		}],
		"msg": "返回成功"
	});


}