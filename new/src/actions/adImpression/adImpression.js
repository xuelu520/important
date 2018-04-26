//todo mock数据
import "../../mock/common/global";

//todo mock数据
import "../../mock/adImpression/adImpression";



import React from 'react';
import reqwest from 'reqwest';

import {
	notification
} from 'antd';

const test = () => {

}
//测试 

const getCharts = (data) => {
	return function(dispatch) {
		dispatch({
			type: "ADIMPRESSION_CHARTSLOADING",
			payload: true
		})

		console.log('----图表参数----', data);

		//发送请求
		reqwest({
			url: '/data/exposure/chart.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {


			dispatch({
				type: "ADIMPRESSION_CHARTSLOADING",
				payload: false
			})

			console.log('###图表响应###', msg);

			if (msg.status) {

				if (msg.data.length != 0) {
					dispatch({
						type: "ADIMPRESSION_CHARTSNODATA",
						payload: false
					})
				} else {
					dispatch({
						type: "ADIMPRESSION_CHARTSNODATA",
						payload: true
					})
				}

				dispatch({
					type: "ADIMPRESSION_CHARTSDATA",
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
		dispatch({
			type: "ADIMPRESSION_TABLESLOADING",
			payload: true
		})


		dispatch({
			type: "ADIMPRESSION_OFFSET",
			payload: data.offset
		})

		dispatch({
			type: "ADIMPRESSION_LIMIT",
			payload: data.limit
		})


		console.log('----table参数----', data);

		//发送请求
		reqwest({
			url: '/data/exposure/table.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {


			dispatch({
				type: "ADIMPRESSION_TABLESLOADING",
				payload: false
			})

			console.log('###table响应###', msg);

			if (msg.status) {

				// if (msg.data.length != 0) {
				// 	dispatch({
				// 		type: "ADIMPRESSION_CHARTSNODATA",
				// 		payload: false
				// 	})
				// } else {
				// 	dispatch({
				// 		type: "ADIMPRESSION_CHARTSNODATA",
				// 		payload: true
				// 	})
				// }

				dispatch({
					type: "ADIMPRESSION_TABLEDATA",
					payload: msg.data
				})

				dispatch({
					type: "ADIMPRESSION_TOTAL",
					payload: msg.total
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

const getGroupList = (data) => {
	return function(dispatch) {
		//发送请求
		reqwest({
			url: '/data/overview/channelGroup.do',
			// url: '../../mock/userList/systemUser.json',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {

			if (msg.status) {
				dispatch({
					type: "ADIMPRESSION_CHANNELGROUPLIST",
					payload: msg.data
				})
			} else {
				notification['error']({
					message: '获取渠道组失败',
					description: msg.msg,
				});
			}

			if (msg.code == -1) {
				window.location.href = "/"
			}
		});
	}
}

const changeOs = (data, callback) => {
	return function(dispatch) {
		dispatch({
			type: "ADIMPRESSION_APPCODE",
			payload: data.appCode
		})

		dispatch({
			type: "ADIMPRESSION_CHANNELCATEGORY",
			payload: data.channelCategory
		})

		dispatch({
			type: "ADIMPRESSION_CHANNELGROUP",
			payload: data.channelGroup
		})


		dispatch({
			type: "ADIMPRESSION_CHANNELNAME",
			payload: data.channelName
		})

		var groupList = {
			appCode: data.appCode,
			channelCategory: data.channelCategory
		}
		callback(groupList);
	}
}


const changeChannelCategory = (data, callback) => {
	return function(dispatch) {
		dispatch({
			type: "ADIMPRESSION_APPCODE",
			payload: data.appCode
		})

		dispatch({
			type: "ADIMPRESSION_CHANNELCATEGORY",
			payload: data.channelCategory
		})

		dispatch({
			type: "ADIMPRESSION_CHANNELGROUP",
			payload: data.channelGroup
		})


		dispatch({
			type: "ADIMPRESSION_CHANNELNAME",
			payload: data.channelName
		})

		var groupList = {
			appCode: data.appCode,
			channelCategory: data.channelCategory
		}
		callback(groupList);
	}
}


const changeChannelGroup = (data) => {
	return function(dispatch) {
		dispatch({
			type: "ADIMPRESSION_CHANNELGROUP",
			payload: data.channelGroup
		})
	}
}

const searchChannel = (data) => {
	return function(dispatch) {

		dispatch({
			type: "ADIMPRESSION_CHANNELNAME",
			payload: data.channelName
		})

		console.log(data, '----渠道列表参数----');

		//发送请求
		reqwest({
			url: '/data/overview/channel.do',
			// url: '../../mock/userList/systemUser.json',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {
			console.log(data, '###渠道列表响应###');

			if (msg.status) {
				dispatch({
					type: "ADIMPRESSION_CHANNELLIST",
					payload: msg.data
				})
			} else {
				notification['error']({
					message: '获取渠道列表失败 ',
					description: msg.msg,
				});
			}

			if (msg.code == -1) {
				window.location.href = "/"
			}
		});
	}
}


const setDate = (data) => {
	return function(dispatch) {
		dispatch({
			type: "ADIMPRESSION_STARTDATE",
			payload: data[0]
		})

		dispatch({
			type: "ADIMPRESSION_ENTDATE",
			payload: data[1]
		})
	}
}

const getDownLoadData = (data) => {
	return function(dispatch) {
		//发送请求
		reqwest({
			url: '/data/exposure/table.do',
			// url: '../../mock/userList/systemUser.json',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {

			if (msg.status) {
				dispatch({
					type: "ADIMPRESSION_EXCELDATA",
					payload: msg.data
				})
			} else {
				notification['error']({
					message: '下载Excel',
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
	getCharts,
	getTables,
	getGroupList,
	changeOs,
	changeChannelCategory,
	changeChannelGroup,
	searchChannel,
	setDate,
	getDownLoadData
}