//todo mock数据
import "../../mock/common/global";

//todo mock数据
import "../../mock/channelRoi/channelRoi";



import React from 'react';
import reqwest from 'reqwest';

import {
	notification
} from 'antd';

const changeOs = (data) => {
	return function(dispatch) {
		dispatch({
			type: "CHANNELROI_APPCODE",
			payload: data.appCode
		})

		dispatch({
			type: "CHANNELROI_CHANNELNAME",
			payload: data.channelName
		})
	}
}

const searchChannel = (data) => {
	return function(dispatch) {

		// appCode: this.props.channelRoi.appCode,
		// channelCategory: "",
		// channelGroup: "",
		// channelName: value

		dispatch({
			type: "CHANNELROI_CHANNELNAME",
			payload: data.channelName
		})

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
					type: "CHANNELROI_CHANNELIST",
					payload: msg.data
				})
			} else {
				notification['error']({
					message: '获取渠道列表失败',
					description: msg.msg,
				});
			}

			if (msg.code == -1) {
				window.location.href = "/"
			}
		});
	}
}

const getCharts = (data) => {
	return function(dispatch) {
		dispatch({
			type: "CHANNELROI_CHARTSLOADING",
			payload: true
		})


		console.log('----图表参数----', data);

		//发送请求
		reqwest({
			url: '/data/roi/chart.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {


			dispatch({
				type: "CHANNELROI_CHARTSLOADING",
				payload: false
			})

			console.log('###图表响应###', msg);

			if (msg.status) {

				debugger;

				if (msg.data.length != 0) {
					dispatch({
						type: "CHANNELROI_CHARTSNODATA",
						payload: false
					})
				} else {
					dispatch({
						type: "CHANNELROI_CHARTSNODATA",
						payload: true
					})
				}

				dispatch({
					type: "CHANNELROI_CHARTSDATA",
					payload: msg.data
				})


			} else {
				notification['error']({
					description: msg.msg,
				});
			}

			if (msg.code == -1) {
				window.location.href = "/";
			}
		});
	}
}

const getTables = (data) => {
	return function(dispatch) {
		dispatch({
			type: "CHANNELROI_OFFSET",
			payload: data.offset
		})

		dispatch({
			type: "CHANNELROI_LIMIT",
			payload: data.limit
		})

		dispatch({
			type: "CHANNELROI_TABLESLOADING",
			payload: true
		})


		//发送请求
		reqwest({
			url: '/data/roi/table.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {

			dispatch({
				type: "CHANNELROI_TABLESLOADING",
				payload: false
			})

			console.log('###table响应###', msg);



			if (msg.status) {


				console.log(msg.data, 'msg.data');

				var arr = [];
				msg.data.map((v, k) => {
					let obj = {};
					if (v.unitPrice) {
						v.roi = (v.adIncome / v.unitPrice).toFixed(2);
					}
					arr.push(v)
				})

				dispatch({
					type: "CHANNELROI_TABLEDATA",
					payload: arr
				})



				dispatch({
					type: "CHANNELROI_TOTAL",
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


const setDate = (data) => {
	return function(dispatch) {
		dispatch({
			type: "CHANNELROI_STARTDATE",
			payload: data[0]
		})

		dispatch({
			type: "CHANNELROI_ENTDATE",
			payload: data[1]
		})
	}
}

const getDownLoadData = (data) => {
	return function(dispatch) {
		//发送请求
		reqwest({
			url: '/data/roi/table.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {

			if (msg.status) {



				dispatch({
					type: "CHANNELROI_EXCELDATA",
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
	changeOs,
	searchChannel,
	getCharts,
	getTables,
	setDate,
	getDownLoadData
}