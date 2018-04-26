//todo mock数据
import "../../mock/common/global";

//todo mock数据
import "../../mock/retentionAnalysis/retentionAnalysis";



import React from 'react';
import reqwest from 'reqwest';

import {
	notification
} from 'antd';

const test = () => {

}
//测试


const colmunRate1 = [{
	title: '激活日期',
	dataIndex: 'day',
	key: 'day',
}, {
	title: '新增用户',
	dataIndex: 'newUser',
	key: 'newUser',
}, {
	title: '次日留存率',
	dataIndex: 'n2',
	key: 'n2',
	render: (text) => (<span> {(Number(text) * 100).toFixed(2) + '%'} </span>)
}, {
	title: '2日留存率',
	dataIndex: 'n3',
	key: 'n3',
	render: (text) => (<span> {(Number(text) * 100).toFixed(2) + '%'} </span>)
}, {
	title: '3日留存率',
	dataIndex: 'n4',
	key: 'n4',
	render: (text) => (<span> {(Number(text) * 100).toFixed(2) + '%'} </span>)
}, {
	title: '4日留存率 ',
	dataIndex: 'n5',
	key: 'n5',
	render: (text) => (<span> {(Number(text) * 100).toFixed(2) + '%'} </span>)
}, {
	title: '5日留存率',
	dataIndex: 'n6',
	key: 'n6',
	render: (text) => (<span> {(Number(text) * 100).toFixed(2) + '%'} </span>)
}, {
	title: '6日留存率',
	dataIndex: 'n7',
	key: 'n7',
	render: (text) => (<span> {(Number(text) * 100).toFixed(2) + '%'} </span>)
}, {
	title: '7日留存率',
	dataIndex: 'n8',
	key: 'n8',
	render: (text) => (<span> {(Number(text) * 100).toFixed(2) + '%'} </span>)
}];

const colmunNumber1 = [{
	title: '激活日期',
	dataIndex: 'day',
	key: 'day',
}, {
	title: '新增用户',
	dataIndex: 'newUser',
	key: 'newUser',
}, {
	title: '次日留存用户数',
	dataIndex: 'n2',
	key: 'n2'
}, {
	title: '2日留存用户数',
	dataIndex: 'n3',
	key: 'n3'
}, {
	title: '3日留存用户数',
	dataIndex: 'n4',
	key: 'n4'
}, {
	title: '4日留存用户数 ',
	dataIndex: 'n5',
	key: 'n5'
}, {
	title: '5日留存用户数',
	dataIndex: 'n6',
	key: 'n6'
}, {
	title: '6日留存用户数',
	dataIndex: 'n7',
	key: 'n7'
}, {
	title: '7日留存用户数',
	dataIndex: 'n8',
	key: 'n8'
}];

const colmunRate2 = [{
	title: '激活日期',
	dataIndex: 'day',
	key: 'day',
}, {
	title: '新增用户',
	dataIndex: 'newUser',
	key: 'newUser',
}, {
	title: '次周留存率',
	dataIndex: 'n2',
	key: 'n2',
	render: (text) => (<span> {(Number(text) * 100).toFixed(2) + '%'} </span>)
}]

const colmunNumber2 = [{
	title: '激活日期',
	dataIndex: 'day',
	key: 'day',
}, {
	title: '新增用户',
	dataIndex: 'newUser',
	key: 'newUser',
}, {
	title: '次周留存用户数',
	dataIndex: 'n2',
	key: 'n2'
}]


const colmunRate3 = [{
	title: '激活日期',
	dataIndex: 'day',
	key: 'day',
}, {
	title: '新增用户',
	dataIndex: 'newUser',
	key: 'newUser',
}, {
	title: '次月留存率',
	dataIndex: 'n2',
	key: 'n2',
	render: (text) => (<span> {(Number(text) * 100).toFixed(2) + '%'} </span>)
}]

const colmunNumber3 = [{
	title: '激活日期',
	dataIndex: 'day',
	key: 'day',
}, {
	title: '新增用户',
	dataIndex: 'newUser',
	key: 'newUser',
}, {
	title: '次月留存用户数',
	dataIndex: 'n2',
	key: 'n2'
}]
const changeOs = (data, callback) => {
	return function(dispatch) {

		dispatch({
			type: "RETENTANALYSIS_APPCODE",
			payload: data.appCode
		})

		dispatch({
			type: "RETENTANALYSIS_CHANNELCATEGORY",
			payload: data.channelCategory
		})


		dispatch({
			type: "RETENTANALYSIS_CHANNELGROUP",
			payload: data.channelGroup
		})

		dispatch({
			type: "RETENTANALYSIS_CHANNELNAME",
			payload: data.channelName
		})

		dispatch({
			type: "RETENTANALYSIS_CHANNELLIST",
			payload: data.channelList
		})

		var groupData = {
			appCode: data.appCode,
			channelGroup: data.channelGroup,
			channelCategory: data.channelCategory
		}

		callback(groupData);

	}
}


const setDate = (data) => {
	return function(dispatch) {
		dispatch({
			type: "RETENTANALYSIS_STARTDATE",
			payload: data[0]
		})

		dispatch({
			type: "RETENTANALYSIS_ENDDATE",
			payload: data[1]
		})
	}
}

const changeChannelCategory = (data, callback) => {
	return function(dispatch) {

		dispatch({
			type: "RETENTANALYSIS_CHANNELCATEGORY",
			payload: data.channelCategory
		})

		dispatch({
			type: "RETENTANALYSIS_CHANNELGROUP",
			payload: data.channelGroup
		})

		dispatch({
			type: "RETENTANALYSIS_CHANNELNAME",
			payload: data.channelName
		})

		dispatch({
			type: "RETENTANALYSIS_CHANNELLIST",
			payload: data.channelList
		})

		var groupData = {
			appCode: data.appCode,
			channelGroup: data.channelGroup,
			channelCategory: data.channelCategory
		}

		callback(groupData);
	}

}

const getChannelGroupList = (data) => {

	return function(dispatch) {
		dispatch({
			type: "RETENTANALYSIS_APPCODE",
			payload: data.appCode
		})

		dispatch({
			type: "RETENTANALYSIS_CHANNELGROUP",
			payload: data.channelGroup
		})

		dispatch({
			type: "RETENTANALYSIS_CHANNELCATEGORY",
			payload: data.channelCategory
		})

		// dispatch({
		// 	type: "RETENTANALYSIS_TABLESLOADING",
		// 	payload: true
		// })

		console.log(data, '----表格参数-----');

		//发送请求
		reqwest({
			url: '/data/overview/channelGroup.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {

			console.log(msg, '####表格响应####');

			dispatch({
				type: "RETENTANALYSIS_TABLESLOADING",
				payload: false
			})

			if (msg.status) {

				dispatch({
					type: "RETENTANALYSIS_CHANNELGROUPLIST",
					payload: msg.data
				})

			} else {
				notification['error']({
					description: msg.msg,
				});
			}

			if (msg.code == -1) {
				window.location.href = "/"
			}
		});
	}
}

const searchChannel = (data) => {
	return function(dispatch) {

		console.log(data, '-----渠道列表参数-----');

		// appCode:
		// channelCategory:
		// channelGroup:
		// channelName:


		dispatch({
			type: "RETENTANALYSIS_APPCODE",
			payload: data.appCode
		})

		dispatch({
			type: "RETENTANALYSIS_CHANNELGROUP",
			payload: data.channelGroup
		})

		dispatch({
			type: "RETENTANALYSIS_CHANNELCATEGORY",
			payload: data.channelCategory
		})


		dispatch({
			type: "RETENTANALYSIS_CHANNELNAME",
			payload: data.channelName
		})

		// channelName

		//发送请求
		reqwest({
			url: '/data/overview/channel.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {
			console.log(msg, '#####渠道列表参数####');

			if (msg.status) {
				dispatch({
					type: "RETENTANALYSIS_CHANNELLIST",
					payload: msg.data
				})
			} else {
				notification['error']({
					description: msg.msg,
				});
			}

			if (msg.code == -1) {
				window.location.href = "/"
			}

		});
	}
}

const getFirmList = (data, callback) => {

	return function(dispatch) {


		dispatch({
			type: "RETENTANALYSIS_FIRM",
			payload: data.firm
		})

		console.log(data, '----厂商响应---');

		//发送请求
		reqwest({
			url: '/common/firm.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {

			console.log(msg, '#####厂商响应###');

			if (msg.status) {
				dispatch({
					type: "RETENTANALYSIS_FIRMLIST",
					payload: msg.data
				})
			} else {
				notification['error']({
					description: msg.msg,
				});
			}

			if (msg.code == -1) {
				window.location.href = "/"
			}

			callback(data)
		});
	}
}


const getBrandList = (data) => {


	return function(dispatch) {
		dispatch({
			type: "RETENTANALYSIS_BRAND",
			payload: data.brand
		})


		console.log(data, '----品牌响应----');

		//发送请求
		reqwest({
			url: '/common/brand.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {

			console.log(msg, '#####品牌响应####');

			if (msg.status) {
				dispatch({
					type: "RETENTANALYSIS_BRANDLIST",
					payload: msg.data
				})
			} else {
				notification['error']({
					description: msg.msg,
				});
			}

			if (msg.code == -1) {
				window.location.href = "/"
			}
		});
	}
}



const getTables = (data) => {
	return function(dispatch) {

		console.log(data, '----table参数-----');

		dispatch({
			type: "RETENTANALYSIS_TABLESLOADING",
			payload: true
		})

		var params = {
			appCode: data.appCode,
			channelCategory: data.channelCategory,
			channelGroup: data.channelGroup,
			channelName: data.channelName,
			startDate: data.startDate,
			endDate: data.endDate,
			trendType: data.trendType,
			firm: data.firm,
			brand: data.brand
		}

		dispatch({
			type: "RETENTANALYSIS_TRENDTYPE",
			payload: data.trendType
		})

		//发送请求
		reqwest({
			url: '/data/left/table.do',
			method: 'post',
			data: params,
			type: 'json',
			cache: true
		}).then((msg) => {


			dispatch({
				type: "RETENTANALYSIS_TABLESLOADING",
				payload: false
			})

			console.log(msg, '#####table响应####');

			if (msg.status) {

				dispatch({
					type: "RETENTANALYSIS_TABLETOTAL",
					payload: msg.data
				})

				rateOrNumber(data, msg.data, dispatch);

			} else {
				notification['error']({
					description: msg.msg,
				});
			}

			if (msg.code == -1) {
				window.location.href = "/"
			}
		});
	}
}

const rateOrNumber = (param, data, dispatch) => {
	console.log(param, data, dispatch);

	if (param.type == 1) {

		if (param.trendType == 1) {
			dispatch({
				type: "RETENTANALYSIS_COLUMNS",
				payload: colmunRate1
			})

			setRateData(data.leftPercent, dispatch);

		} else if (param.trendType == 2) {
			dispatch({
				type: "RETENTANALYSIS_COLUMNS",
				payload: colmunRate2
			})

			setRateData(data.leftPercent, dispatch);
		} else {
			dispatch({
				type: "RETENTANALYSIS_COLUMNS",
				payload: colmunRate3
			})

			setRateData(data.leftPercent, dispatch);
		}

	} else {

		if (param.trendType == 1) {
			dispatch({
				type: "RETENTANALYSIS_COLUMNS",
				payload: colmunNumber1
			})

			setNumberData(data.leftCount, dispatch);

		} else if (param.trendType == 2) {
			dispatch({
				type: "RETENTANALYSIS_COLUMNS",
				payload: colmunNumber2
			})

			setNumberData(data.leftCount, dispatch);

		} else {
			dispatch({
				type: "RETENTANALYSIS_COLUMNS",
				payload: colmunNumber3
			})

			setNumberData(data.leftCount, dispatch);
		}
	}
}

const setRateExcelData = (data, dispatch) => {

	var arr = [];

	data.map((pv, pk) => {
		var obj = {};
		pv.map((v, k) => {
			if (k == 0) {
				obj["day"] = v;
			} else if (k == 1) {
				obj["newUser"] = v;
			} else {
				obj["n" + k] = v;
			}
		});

		arr.push(obj);
	})

	return arr;

}

const setRateData = (data, dispatch) => {

	var arr = [];

	data.map((pv, pk) => {
		var obj = {};
		pv.map((v, k) => {
			if (k == 0) {
				obj["day"] = v;
			} else if (k == 1) {
				obj["newUser"] = v;
			} else {
				obj["n" + k] = v;
			}
		});

		arr.push(obj);
	})


	dispatch({
		type: "RETENTANALYSIS_TABLEDATA",
		payload: arr
	})
}

const setNumberExcelData = (data, dispatch) => {
	var arr = [];

	data.map((pv, pk) => {
		var obj = {};
		pv.map((v, k) => {

			if (k == 0) {
				obj["day"] = v;
			} else if (k == 1) {
				obj["newUser"] = v;
			} else {
				if (v != 0) {
					obj["n" + k] = v;
				}
			}
		});

		arr.push(obj);
	})

	console.log(arr, '用户数');

	// dispatch({
	// 	type: "RETENTANALYSIS_TABLEDATA",
	// 	payload: arr
	// })
	return arr;
}

const setNumberData = (data, dispatch) => {
	var arr = [];

	data.map((pv, pk) => {
		var obj = {};
		pv.map((v, k) => {

			if (k == 0) {
				obj["day"] = v;
			} else if (k == 1) {
				obj["newUser"] = v;
			} else {
				if (v != 0) {
					obj["n" + k] = v;
				}
			}
		});

		arr.push(obj);
	})

	console.log(arr, '用户数');

	dispatch({
		type: "RETENTANALYSIS_TABLEDATA",
		payload: arr
	})
}

const changeType = (tableData, data) => {
	return function(dispatch) {
		dispatch({
			type: "RETENTANALYSIS_TYPE",
			payload: data.type
		})

		rateOrNumber(data, tableData, dispatch);
	}


}

const getDownLoadData = (data) => {
	return function(dispatch) {
		//发送请求
		reqwest({
			url: '/data/left/table.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {

			if (msg.status) {
				msg.data.leftPercent = setRateExcelData(msg.data.leftPercent);

				msg.data.leftCount = setNumberExcelData(msg.data.leftCount);

				dispatch({
					type: "RETENTANALYSIS_EXCELDATA",
					payload: msg.data
				})

			} else {
				notification['error']({
					description: msg.msg,
				});
			}

			if (msg.code == -1) {
				window.location.href = "/"
			}
		});
	}
}

export {
	test,
	changeOs,
	changeChannelCategory,
	getChannelGroupList,
	searchChannel,
	getFirmList,
	getBrandList,
	getTables,
	changeType,
	setDate,
	getDownLoadData
}