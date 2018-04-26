import Mock from 'mockjs';

if (window.location.search.indexOf("debug") > 0 || window.location.search.indexOf("web_ci") > 0) {

	// Mock.mock("/data/exposure/table.do", "post", {
	// 	"status": true,
	// 	"total": "@natural(1000, 10000)",
	// 	"data|0-10": [{
	// 		"channelName": "@word(6)",
	// 		"day": "@datetime('yyyy-MM-dd')",
	// 		"expo1": "@float(0, 2, 2, 2)",
	// 		"expo2": "@float(0, 0, 2, 2)",
	// 		"expo3": "@float(0, 0, 2, 2)",
	// 		"expo4": "@float(0, 0, 2, 2)",
	// 		"expo5": "@float(0, 0, 2, 2)",
	// 		"expo6": "@float(0, 0, 2, 2)",
	// 		"expo60": "@float(0, 0, 2, 2)",
	// 		"expo7": "@float(0, 0, 2, 2)",
	// 		"newUser": "@natural(1000, 10000)",
	// 		"unitPrice": "@float(0, 0, 2, 2)"
	// 	}],
	// 	"msg": "返回成功"
	// });


	Mock.mock("/data/model/table.do", "post", {
		"status": true,
		"data|20-30": [{
			"activeUser": "@natural(1000, 10000)",
			"brand": "HUAWEI",
			"day": "@datetime('yyyy-MM-dd')",
			"loseUser": "@natural(1000, 10000)",
			"newUser": "@natural(1000, 10000)"
		}],
		"msg": "返回成功"
	});

	Mock.mock("/data/model/chart.do", "post", {
		"status": true,
		"data": [{
			"activeUser": 9256261,
			"day": "2018-01-11",
			"loseUser": 306479,
			"newUser": 161675
		}, {
			"activeUser": 8981138,
			"day": "2018-01-12",
			"loseUser": 326311,
			"newUser": 181948
		}, {
			"activeUser": 8814543,
			"day": "2018-01-13",
			"loseUser": 369008,
			"newUser": 176647
		}, {
			"activeUser": 8927287,
			"day": "2018-01-14",
			"loseUser": 469085,
			"newUser": 170411
		}, {
			"activeUser": 8944626,
			"day": "2018-01-15",
			"loseUser": 407940,
			"newUser": 169357
		}, {
			"activeUser": 9052804,
			"day": "2018-01-16",
			"loseUser": 376887,
			"newUser": 176582
		}, {
			"activeUser": 8716949,
			"day": "2018-01-17",
			"loseUser": 350211,
			"newUser": 199204
		}, {
			"activeUser": 8808856,
			"day": "2018-01-18",
			"loseUser": 363480,
			"newUser": 236872
		}, {
			"activeUser": 8740028,
			"day": "2018-01-19",
			"loseUser": 487319,
			"newUser": 200223
		}, {
			"activeUser": 9020317,
			"day": "2018-01-20",
			"loseUser": 382044,
			"newUser": 192640
		}, {
			"activeUser": 9104574,
			"day": "2018-01-21",
			"loseUser": 336580,
			"newUser": 212985
		}, {
			"activeUser": 8989536,
			"day": "2018-01-22",
			"loseUser": 358515,
			"newUser": 178084
		}, {
			"activeUser": 8880884,
			"day": "2018-01-23",
			"loseUser": 365221,
			"newUser": 204304
		}, {
			"activeUser": 8956319,
			"day": "2018-01-24",
			"loseUser": 430827,
			"newUser": 231738
		}, {
			"activeUser": 9302557,
			"day": "2018-01-25",
			"loseUser": 486362,
			"newUser": 305548
		}, {
			"activeUser": 9137469,
			"day": "2018-01-26",
			"loseUser": 406804,
			"newUser": 249288
		}, {
			"activeUser": 9004425,
			"day": "2018-01-27",
			"loseUser": 440340,
			"newUser": 193524
		}, {
			"activeUser": 8910749,
			"day": "2018-01-28",
			"loseUser": 474951,
			"newUser": 181584
		}, {
			"activeUser": 8886230,
			"day": "2018-01-29",
			"loseUser": 486937,
			"newUser": 190483
		}, {
			"activeUser": 8357195,
			"day": "2018-01-30",
			"loseUser": 404659,
			"newUser": 172237
		}, {
			"activeUser": 8088437,
			"day": "2018-01-31",
			"loseUser": 445606,
			"newUser": 152691
		}, {
			"activeUser": 7439743,
			"day": "2018-02-01",
			"loseUser": 406014,
			"newUser": 130007
		}, {
			"activeUser": 7787263,
			"day": "2018-02-02",
			"loseUser": 411740,
			"newUser": 131143
		}, {
			"activeUser": 8001354,
			"day": "2018-02-03",
			"loseUser": 450723,
			"newUser": 133814
		}, {
			"activeUser": 8083908,
			"day": "2018-02-04",
			"loseUser": 436403,
			"newUser": 139533
		}, {
			"activeUser": 8069915,
			"day": "2018-02-05",
			"loseUser": 423020,
			"newUser": 142364
		}, {
			"activeUser": 8115983,
			"day": "2018-02-06",
			"loseUser": 429117,
			"newUser": 147160
		}, {
			"activeUser": 7881937,
			"day": "2018-02-07",
			"loseUser": 367775,
			"newUser": 141097
		}, {
			"activeUser": 8103973,
			"day": "2018-02-08",
			"loseUser": 364864,
			"newUser": 142163
		}, {
			"activeUser": 8151559,
			"day": "2018-02-09",
			"loseUser": 381158,
			"newUser": 120031
		}],
		"msg": ""
	});
}