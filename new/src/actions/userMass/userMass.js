//todo mock数据
import "../../mock/common/global";

//todo mock数据
import "../../mock/userMass/userMass";


import React from 'react';
import reqwest from 'reqwest';

import {
	notification
} from 'antd';

const changeOs = (data) => {
	return function(dispatch) {
		dispatch({
			type: "USERMASS_APPCODE",
			payload: data.appCode
		})

		dispatch({
			type: "USERMASS_CHANNELNAME",
			payload: data.channelName
		})

		dispatch({
			type: "USERMASS_CHANNELLIST",
			payload: []
		})
	}
}


const searchChannel = (data) => {
	return function(dispatch) {
		dispatch({
			type: "USERMASS_CHANNELNAME",
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
					type: "USERMASS_CHANNELLIST",
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
			type: "USERMASS_START",
			payload: data[0]
		})

		dispatch({
			type: "USERMASS_START",
			payload: data[1]
		})
	}
}

const getCharts = (data) => {
	return function(dispatch) {
		dispatch({
			type: "USERMASS_CHARTSLOADING",
			payload: true
		});


		console.log(data, '###图表参数###');


		dispatch({
			type: "USERMASS_TAB",
			payload: data.tab
		});

		dispatch({
			type: "USERMASS_STARTDATE",
			payload: data.startDate
		});

		dispatch({
			type: "USERMASS_ENTDATE",
			payload: data.endDate
		});

		// dispatch({
		// 	type: "USERMASS_CHANNELNAME",
		// 	payload: data.channelName
		// });

		dispatch({
			type: "USERMASS_APPCODE",
			payload: data.appCode
		});


		//发送请求
		reqwest({
			url: '/data/quality/chart.do',
			// url: '../../mock/userList/systemUser.json',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {

			dispatch({
				type: "USERMASS_CHARTSLOADING",
				payload: false
			});

			if (msg.status) {

				if (msg.data.length != 0) {
					dispatch({
						type: "USERMASS_CHARTSNODATA",
						payload: false
					})
				} else {
					dispatch({
						type: "USERMASS_CHARTSNODATA",
						payload: true
					})
				}

				dispatch({
					type: "USERMASS_CHARTSDATA",
					payload: msg.data
				})

				dispatch({
					type: "USERMASS_CHARTSNAME",
					payload: data.channelName
				})

			} else {

				notification['error']({
					message: '获取图表数据失败',
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
			type: "USERMASS_TABLESLOADING",
			payload: true
		});

		dispatch({
			type: "USERMASS_OFFSET",
			payload: data.offset
		})

		dispatch({
			type: "USERMASS_LIMIT",
			payload: data.limit
		})


		//发送请求
		reqwest({
			url: '/data/quality/table.do',
			// url: '../../mock/userList/systemUser.json',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {

			dispatch({
				type: "USERMASS_TABLESLOADING",
				payload: false
			});

			if (msg.status) {
				dispatch({
					type: "USERMASS_TABLEDATA",
					payload: msg.data
				});

				dispatch({
					type: "USERMASS_TOTAL",
					payload: msg.total
				});

			}

		});


	}
}

const getDownLoadData = (data) => {
	return function(dispatch) {
		//发送请求
		reqwest({
			url: '/data/quality/table.do',
			// url: '../../mock/userList/systemUser.json',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {



			if (msg.status) {
				dispatch({
					type: "USERMASS_EXCELDATA",
					payload: msg.data
				});


			}

		});
	}
}


export {
	changeOs,
	searchChannel,
	setDate,
	getCharts,
	getTables,
	getDownLoadData
}