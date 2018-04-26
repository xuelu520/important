import Mock from 'mockjs';

if (window.location.search.indexOf("debug") > 0 || window.location.search.indexOf("web_ci") > 0) {


	Mock.mock("/data/quality/chart.do", "post", {
		"status": true,
		"data": [{
			"value|10": ["@float(1, 8, 2, 2)"],
			"key|10": ["@datetime('yyyy-MM-dd')"]
		}]
	});

	Mock.mock("/data/quality/table.do", "post", {
		"status": true,
		"data|0-10": [{
			"activity": "@float(1, 12, 2, 2)",
			"appCode": 27,
			"channel": "@word(12)",
			"cheatUser": "@natural(1000, 10000)",
			"cheatUserPercent": "@float(0, 0, 4, 4)",
			"day": "@datetime('yyyy-MM-dd')",
			"healthy": "@natural(10, 100)",
			"newUser": "@natural(10, 100)",
			"outCheatUser": "@natural(10, 100)",
			"secLchNewUser": "@natural(10, 100)",
			"secondActivePercent": "@float(0, 0, 4, 4)"
		}],
		total: "@natural(1000, 10000)"
	});
}