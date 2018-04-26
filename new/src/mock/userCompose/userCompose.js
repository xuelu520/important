import Mock from 'mockjs';

if (window.location.search.indexOf("debug") > 0 || window.location.search.indexOf("web_ci") > 0) {

	// appCode:
	// channelCategory:
	// channelGroup:
	// channelName:
	// endDate:2018-02-04
	// startDate:2018-01-21

	Mock.mock("/data/mau/chart.do", "post", {
		"total": "@natural(1000, 10000)",
		"status": true,
		"data|0-10": [{
			"appCode": 0,
			"day": "@datetime('yyyy-MM-dd')",
			"lmMau": "@natural(1000, 10000)",
			"maHa": "@natural(1000, 10000)",
			"maLha": "@natural(1000, 10000)",
			"maLmn": "@natural(1000, 10000)",
			"maLta": "@natural(1000, 10000)",
			"mtdDauAvg": "@natural(1000, 10000)",
			"mtdMau": "@natural(1000, 10000)",
			"mtdMnu": "@natural(1000, 10000)"
		}],
		"msg": "返回成功"
	});


	//
	// appCode:
	// channelCategory:
	// channelGroup:
	// channelName:
	// endDate:2018-02-04
	// startDate:2018-01-21
	// limit:10
	// offset:1
	// type:1

	Mock.mock("/data/mau/table.do", "post", {
		"total": "@natural(1000, 10000)",
		"status": true,
		"data|0-10": [{
			"appCode": 0,
			"day": "@datetime('yyyy-MM-dd')",
			"lmMau": "@natural(1000, 10000)",
			"maHa": "@natural(1000, 10000)",
			"maLha": "@natural(1000, 10000)",
			"maLmn": "@natural(1000, 10000)",
			"maLta": "@natural(1000, 10000)",
			"mtdDauAvg": "@natural(1000, 10000)",
			"mtdMau": "@natural(1000, 10000)",
			"mtdMnu": "@natural(1000, 10000)",
			"channelGroup": "@word(6)"
		}],
		"msg": "返回成功"
	});
}