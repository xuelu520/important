import Mock from 'mockjs';

if (window.location.search.indexOf("debug") > 0 || window.location.search.indexOf("web_ci") > 0) {



	Mock.mock("/data/flow/hour.do", "post", {
		"status": true,
		"data": {
			"activeUserStartTime": [{
				"yAxis": [11080, 6334, 3768, 2851, 2723, 3602, 5403, 10537, 14327, 13455, 15513, 16343, 16308, 18106, 15857, 14502, 14225, 13883, 16136, 17081, 17708, 15343, 12308, 7734],
				"name": "2018-02-10",
				"xAxis": ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
			}, {
				"yAxis": [11629, 6194, 4162, 3399, 2855, 3634, 6645, 12436, 14126, 15959, 17546, 18700, 20480, 20501, 16277, 15998, 15206, 14309, 13949, 15213, 17600, 15002, 11821, 7974],
				"name": "2018-02-09",
				"xAxis": ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
			}, {
				"yAxis": [11568, 6061, 3509, 2790, 2667, 3257, 5921, 9427, 15372, 15914, 15878, 18763, 19914, 27580, 17555, 17726, 18077, 18118, 17066, 20528, 21789, 17852, 13381, 8000],
				"name": "2018-02-03",
				"xAxis": ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
			}],
			"NewUserActiveTime": [{
				"yAxis": [3489, 2059, 1255, 908, 909, 1134, 2005, 3712, 5042, 5104, 5883, 6082, 6259, 7002, 6378, 5823, 5865, 5870, 7035, 7848, 8534, 7925, 6715, 4788],
				"name": "2018-02-10",
				"xAxis": ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
			}, {
				"yAxis": [3462, 2119, 1435, 1104, 1057, 1409, 2553, 4541, 5448, 6062, 6363, 7270, 7781, 8286, 6919, 6594, 6538, 6117, 6015, 6915, 8498, 7622, 6532, 4965],
				"name": "2018-02-09",
				"xAxis": ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
			}, {
				"yAxis": [3406, 2072, 1251, 988, 943, 1237, 2270, 3531, 5688, 6024, 6292, 7341, 7801, 10487, 7349, 7198, 7618, 7549, 7692, 9555, 10875, 9482, 7377, 5139],
				"name": "2018-02-03",
				"xAxis": ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
			}]
		},
		"msg": ""
	});


	Mock.mock("/data/flow/deviceModel/new.do", "post", {
		"status": true,
		"data": {
			"newUserModel": [{
				"yAxis": [2828, 2713, 2691, 2318, 2213, 2099, 1929, 1869, 1862, 1589],
				"name": "2018-02-10",
				"xAxis": ["MI 5X", "HUAWEI MLA-AL10", "WAS-AL00", "HUAWEI NXT-AL10", "OPPO A33", "EVA-AL10", "MI 6", "DIG-AL00", "HUAWEI CAZ-AL10", "OPPO A33m"]
			}, {
				"yAxis": [2831, 2580, 2578, 2257, 1889, 1818, 1817, 1773, 1547, 1491],
				"name": "2018-02-09",
				"xAxis": ["MI 5X", "WAS-AL00", "HUAWEI MLA-AL10", "OPPO A33", "EVA-AL10", "HUAWEI CAZ-AL10", "DIG-AL00", "OPPO A33m", "MI 6", "iPhone7,2"]
			}, {
				"yAxis": [3066, 2901, 2870, 2554, 2386, 2063, 2035, 1979, 1955, 1784],
				"name": "2018-02-03",
				"xAxis": ["HUAWEI MLA-AL10", "MI 5X", "WAS-AL00", "HUAWEI NXT-AL10", "OPPO A33", "HUAWEI CAZ-AL10", "Redmi 4A", "Redmi Note 4X", "DIG-AL00", "OPPO A33m"]
			}],
			"activeUserModel": [{
				"yAxis": [31700, 84008, 55381, 118965, 304086, 113590, 55601, 25590, 63776, 141147],
				"name": "2018-02-10",
				"xAxis": ["MI 5X", "HUAWEI MLA-AL10", "WAS-AL00", "HUAWEI NXT-AL10", "OPPO A33", "EVA-AL10", "MI 6", "DIG-AL00", "HUAWEI CAZ-AL10", "OPPO A33m"]
			}, {
				"yAxis": [33083, 55221, 85085, 316907, 116251, 64499, 25974, 147144, 9790, 480593],
				"name": "2018-02-09",
				"xAxis": ["MI 5X", "WAS-AL00", "HUAWEI MLA-AL10", "OPPO A33", "EVA-AL10", "HUAWEI CAZ-AL10", "DIG-AL00", "OPPO A33m", "MI 6", "iPhone7,2"]
			}, {
				"yAxis": [86584, 31481, 56247, 121530, 303216, 64775, 23924, 57903, 26687, 143589],
				"name": "2018-02-03",
				"xAxis": ["HUAWEI MLA-AL10", "MI 5X", "WAS-AL00", "HUAWEI NXT-AL10", "OPPO A33", "HUAWEI CAZ-AL10", "Redmi 4A", "Redmi Note 4X", "DIG-AL00", "OPPO A33m"]
			}]
		},
		"msg": ""
	});



	Mock.mock("/data/flow/net.do", "post", {
		"status": true,
		"data": {
			"newUserNetType": [{
				"activeUser": 4018914,
				"netType": "WIFI",
				"newUser": 81507
			}, {
				"activeUser": 3384584,
				"netType": "LTE",
				"newUser": 27765
			}, {
				"activeUser": 453445,
				"netType": "UNKNOWN",
				"newUser": 7082
			}, {
				"activeUser": 72810,
				"netType": "EDGE",
				"newUser": 808
			}, {
				"activeUser": 10371,
				"netType": "CDMA - EVDO REV. A",
				"newUser": 233
			}, {
				"activeUser": 140,
				"netType": "CDMA",
				"newUser": 87
			}, {
				"activeUser": 1491,
				"netType": "GSM",
				"newUser": 42
			}, {
				"activeUser": 10545,
				"netType": "CDMAEVDOREVA",
				"newUser": 32
			}, {
				"activeUser": 9012,
				"netType": "WCDMA",
				"newUser": 30
			}, {
				"activeUser": 1253,
				"netType": "CDMA EVDO",
				"newUser": 20
			}],
			"activeUserNetType": [{
				"activeUser": 4018914,
				"netType": "WIFI",
				"newUser": 81507
			}, {
				"activeUser": 3384584,
				"netType": "LTE",
				"newUser": 27765
			}, {
				"activeUser": 453445,
				"netType": "UNKNOWN",
				"newUser": 7082
			}, {
				"activeUser": 72810,
				"netType": "EDGE",
				"newUser": 808
			}, {
				"activeUser": 10545,
				"netType": "CDMAEVDOREVA",
				"newUser": 32
			}, {
				"activeUser": 10371,
				"netType": "CDMA - EVDO REV. A",
				"newUser": 233
			}, {
				"activeUser": 9012,
				"netType": "WCDMA",
				"newUser": 30
			}, {
				"activeUser": 1568,
				"netType": "TD-SCDMA",
				"newUser": 15
			}, {
				"activeUser": 1491,
				"netType": "GSM",
				"newUser": 42
			}, {
				"activeUser": 1253,
				"netType": "CDMA EVDO",
				"newUser": 20
			}]
		},
		"msg": ""
	});


	Mock.mock("/data/flow/area.do", "post", {
		"status": true,
		"data": [{
			"activeUser": 0,
			"newUser": 0,
			"province": ""
		}, {
			"activeUser": 283533,
			"newUser": 3196,
			"province": "上海"
		}, {
			"activeUser": 166486,
			"newUser": 2395,
			"province": "云南"
		}, {
			"activeUser": 904712,
			"newUser": 12576,
			"province": "其他"
		}, {
			"activeUser": 122998,
			"newUser": 1974,
			"province": "内蒙古"
		}, {
			"activeUser": 282984,
			"newUser": 3798,
			"province": "北京"
		}, {
			"activeUser": 4113,
			"newUser": 47,
			"province": "台湾"
		}, {
			"activeUser": 118503,
			"newUser": 1950,
			"province": "吉林"
		}, {
			"activeUser": 376008,
			"newUser": 5942,
			"province": "四川"
		}, {
			"activeUser": 86911,
			"newUser": 1177,
			"province": "天津"
		}, {
			"activeUser": 29877,
			"newUser": 485,
			"province": "宁夏"
		}, {
			"activeUser": 201751,
			"newUser": 3114,
			"province": "安徽"
		}, {
			"activeUser": 442202,
			"newUser": 7008,
			"province": "山东"
		}, {
			"activeUser": 159617,
			"newUser": 2611,
			"province": "山西"
		}, {
			"activeUser": 758906,
			"newUser": 11617,
			"province": "广东"
		}, {
			"activeUser": 163109,
			"newUser": 3062,
			"province": "广西"
		}, {
			"activeUser": 76098,
			"newUser": 1415,
			"province": "新疆"
		}, {
			"activeUser": 638960,
			"newUser": 7348,
			"province": "江苏"
		}, {
			"activeUser": 163269,
			"newUser": 2702,
			"province": "江西"
		}, {
			"activeUser": 263803,
			"newUser": 5064,
			"province": "河北"
		}, {
			"activeUser": 350414,
			"newUser": 6340,
			"province": "河南"
		}, {
			"activeUser": 533051,
			"newUser": 6574,
			"province": "浙江"
		}, {
			"activeUser": 60515,
			"newUser": 788,
			"province": "海南"
		}, {
			"activeUser": 283646,
			"newUser": 4001,
			"province": "湖北"
		}, {
			"activeUser": 275608,
			"newUser": 4376,
			"province": "湖南"
		}, {
			"activeUser": 2629,
			"newUser": 25,
			"province": "澳门"
		}, {
			"activeUser": 79849,
			"newUser": 1238,
			"province": "甘肃"
		}, {
			"activeUser": 246602,
			"newUser": 3186,
			"province": "福建"
		}, {
			"activeUser": 5253,
			"newUser": 143,
			"province": "西藏"
		}, {
			"activeUser": 104524,
			"newUser": 2097,
			"province": "贵州"
		}, {
			"activeUser": 207447,
			"newUser": 2888,
			"province": "辽宁"
		}, {
			"activeUser": 137399,
			"newUser": 2159,
			"province": "重庆"
		}, {
			"activeUser": 213932,
			"newUser": 2834,
			"province": "陕西"
		}, {
			"activeUser": 39098,
			"newUser": 667,
			"province": "青海"
		}, {
			"activeUser": 12504,
			"newUser": 131,
			"province": "香港"
		}, {
			"activeUser": 168075,
			"newUser": 2697,
			"province": "黑龙江"
		}],
		"msg": ""
	});


	Mock.mock("/data/flow/deviceModel/active.do", "post", {
		"status": true,
		"data": {
			"newUserModel": [{
				"yAxis": [1488, 1036, 1324, 922, 1088, 1002, 2213, 1589, 2318, 231],
				"name": "2018-02-10",
				"xAxis": ["iPhone7,2", "iPhone8,1", "iPhone9,2", "iPhone7,1", "iPhone9,1", "iPhone8,2", "OPPO A33", "OPPO A33m", "HUAWEI NXT-AL10", "OPPO R7s"]
			}, {
				"yAxis": [1491, 1042, 1279, 883, 1128, 1003, 2257, 1773, 245, 1889],
				"name": "2018-02-09",
				"xAxis": ["iPhone7,2", "iPhone8,1", "iPhone9,2", "iPhone7,1", "iPhone9,1", "iPhone8,2", "OPPO A33", "OPPO A33m", "OPPO R7s", "EVA-AL10"]
			}, {
				"yAxis": [1622, 1278, 1391, 1012, 1144, 1061, 2386, 1784, 2554, 272],
				"name": "2018-02-03",
				"xAxis": ["iPhone7,2", "iPhone8,1", "iPhone9,2", "iPhone7,1", "iPhone9,1", "iPhone8,2", "OPPO A33", "OPPO A33m", "HUAWEI NXT-AL10", "OPPO R7s"]
			}],
			"activeUserModel": [{
				"yAxis": [466021, 383936, 373345, 320205, 316241, 308651, 304086, 141147, 118965, 117891],
				"name": "2018-02-10",
				"xAxis": ["iPhone7,2", "iPhone8,1", "iPhone9,2", "iPhone7,1", "iPhone9,1", "iPhone8,2", "OPPO A33", "OPPO A33m", "HUAWEI NXT-AL10", "OPPO R7s"]
			}, {
				"yAxis": [480593, 397805, 387800, 330261, 327846, 319744, 316907, 147144, 123127, 116251],
				"name": "2018-02-09",
				"xAxis": ["iPhone7,2", "iPhone8,1", "iPhone9,2", "iPhone7,1", "iPhone9,1", "iPhone8,2", "OPPO A33", "OPPO A33m", "OPPO R7s", "EVA-AL10"]
			}, {
				"yAxis": [472718, 389301, 375832, 324084, 318304, 311287, 303216, 143589, 121530, 120214],
				"name": "2018-02-03",
				"xAxis": ["iPhone7,2", "iPhone8,1", "iPhone9,2", "iPhone7,1", "iPhone9,1", "iPhone8,2", "OPPO A33", "OPPO A33m", "HUAWEI NXT-AL10", "OPPO R7s"]
			}]
		},
		"msg": ""
	});

	Mock.mock("/data/flow/hour/down.do", "post", {
		"status": true,
		"data": [{
			"bootTimes": 11080,
			"day": "2018-02-10",
			"hour": "00",
			"newUser": 3489
		}, {
			"bootTimes": 6334,
			"day": "2018-02-10",
			"hour": "01",
			"newUser": 2059
		}, {
			"bootTimes": 3768,
			"day": "2018-02-10",
			"hour": "02",
			"newUser": 1255
		}],
		"msg": ""
	});


	Mock.mock("/data/flow/deviceModel/down.do?type=1", "post", {
		"status": true,
		"data": [{
			"activeUser": 251968,
			"day": "2018-02-23",
			"deviceModel": "OPPO A33",
			"newUser": 2971
		}, {
			"activeUser": 34847,
			"day": "2018-02-23",
			"deviceModel": "MI 5X",
			"newUser": 2801
		}, {
			"activeUser": 89436,
			"day": "2018-02-23",
			"deviceModel": "HUAWEI MLA-AL10",
			"newUser": 2720
		}],
		"msg": ""
	});

	Mock.mock("/data/flow/deviceModel/down.do?type=2", "post", {
		"status": true,
		"data": [{
			"activeUser": 251968,
			"day": "2018-02-23",
			"deviceModel": "OPPO A33",
			"newUser": 2971
		}, {
			"activeUser": 34847,
			"day": "2018-02-23",
			"deviceModel": "MI 5X",
			"newUser": 2801
		}, {
			"activeUser": 89436,
			"day": "2018-02-23",
			"deviceModel": "HUAWEI MLA-AL10",
			"newUser": 2720
		}],
		"msg": ""
	});


	Mock.mock("/data/flow/net/down.do?type=1", "post", {
		"status": true,
		"data": [{
			"activeUser": 3646704,
			"netType": "WIFI",
			"newUser": 67928
		}, {
			"activeUser": 3369268,
			"netType": "LTE",
			"newUser": 25405
		}, {
			"activeUser": 437159,
			"netType": "UNKNOWN",
			"newUser": 6258
		}],
		"msg": ""
	});


	Mock.mock("/data/flow/net/down.do?type=2", "post", {
		"status": true,
		"data": [{
			"activeUser": 3646704,
			"netType": "WIFI",
			"newUser": 67928
		}, {
			"activeUser": 3369268,
			"netType": "LTE",
			"newUser": 25405
		}, {
			"activeUser": 437159,
			"netType": "UNKNOWN",
			"newUser": 6258
		}],
		"msg": ""
	});



	Mock.mock("/data/flow/deviceModel/down.do", "post", {
		"status": true,
		"data": [{
			"activeUser": 4018914,
			"netType": "WIFI",
			"newUser": 81507
		}, {
			"activeUser": 3384584,
			"netType": "LTE",
			"newUser": 27765
		}, {
			"activeUser": 453445,
			"netType": "UNKNOWN",
			"newUser": 7082
		}],
		"msg": ""
	});


	Mock.mock("/data/flow/area/down.do", "post", {
		"status": true,
		"data": [{
			"activeUser": 0,
			"city": "",
			"newUser": 0,
			"province": ""
		}, {
			"activeUser": 5672,
			"city": "其他",
			"newUser": 68,
			"province": "上海"
		}, {
			"activeUser": 599,
			"city": "南汇区",
			"newUser": 7,
			"province": "上海"
		}],
		"msg": ""
	});

}