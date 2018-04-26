//todo mock数据
import "../../mock/common/global";

//todo mock数据
import "../../mock/userCompose/userCompose";



import React from 'react';
import reqwest from 'reqwest';

import {
	notification
} from 'antd';

const test = () => {

}

const changeOs = (data, callback) => {
	return function(dispatch) {
		dispatch({
			type: "USERCOMPOSE_APPCODE",
			payload: data.appCode
		})

		dispatch({
			type: "USERCOMPOSE_CHANNELCATEGORY",
			payload: ""
		})

		dispatch({
			type: "USERCOMPOSE_CHANNELGROUP",
			payload: ""
		})

		callback(data);
	}
}

const changeChannelCategory = (data, callback) => {
	return function(dispatch) {
		dispatch({
			type: "USERCOMPOSE_CHANNELCATEGORY",
			payload: data.channelCategory
		})

		dispatch({
			type: "USERCOMPOSE_CHANNELGROUP",
			payload: ""
		})



		callback(data);
	}
}

const changeDate = (data) => {
	return function(dispatch) {
		dispatch({
			type: "USERCOMPOSE_STARTDATE",
			payload: data[0]
		})

		dispatch({
			type: "USERCOMPOSE_ENDDATE",
			payload: data[1]
		})
	}
}

const getChannelGroup = (data) => {

	console.log(data, '### 渠道组请求参数 ###');



	return function(dispatch) {

		dispatch({
			type: "USERCOMPOSE_CHANNELGROUP",
			payload: data.channelGroup
		})

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
					type: "USERCOMPOSE_GROUPLIST",
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

const getcharts = (data) => {
	return function(dispatch) {

		dispatch({
			type: "USERCOMPOSE_CHARTSLOADING",
			payload: true
		})


		console.log(data, '获取图表参数');
		//发送请求
		reqwest({
			url: '/data/mau/chart.do',
			// url: '../../mock/userList/systemUser.json',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {
			dispatch({
				type: "USERCOMPOSE_CHARTSLOADING",
				payload: false
			})
			console.log(msg, '获取图表响应');
			if (msg.status) {
				dispatch({
					type: "USERCOMPOSE_CHARTSDATA",
					payload: msg.data
				})
				if (msg.data.length == 0) {


					dispatch({
						type: "USERCOMPOSE_CHARTSNODATA",
						payload: true
					})
				} else {
					dispatch({
						type: "USERCOMPOSE_CHARTSNODATA",
						payload: false
					})
				}
			} else {
				notification['error']({
					message: '获取图表失败',
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
			type: "USERCOMPOSE_LIMIT",
			payload: data.limit
		})

		dispatch({
			type: "USERCOMPOSE_OFFSET",
			payload: data.offset
		})

		dispatch({
			type: "USERCOMPOSE_TABLELOADING",
			payload: true
		})

		dispatch({
			type: "USERCOMPOSE_TYPE",
			payload: data.type
		})

		if (data.type == 1) {

			dispatch({
				type: "USERCOMPOSE_COLUMNS",
				payload: [{
					title: '日期',
					dataIndex: 'day',
					key: 'day',
				}, {
					title: 'MTD MAU',
					dataIndex: 'mtdMau',
					key: 'mtdMau',
				}, {
					title: '上月MAU',
					dataIndex: 'lmMau',
					key: 'lmMau',
				}, {
					title: '本月新增',
					dataIndex: 'mtdMnu',
					key: 'mtdMnu'
				}, {
					title: '上月新增本月回访',
					dataIndex: 'maLmn',
					key: 'maLmn'
				}, {
					title: '上上月活跃上月活跃本月回访',
					dataIndex: 'maLta',
					key: 'maLta'
				}, {
					title: '历史活跃上月活跃本月回访',
					dataIndex: 'maLha',
					key: 'maLha'
				}, {
					title: '历史活跃本月回访',
					dataIndex: 'maHa',
					key: 'maHa'
				}]
			})
		} else {
			dispatch({
				type: "USERCOMPOSE_COLUMNS",
				payload: [{
					title: '日期',
					dataIndex: 'day',
					key: 'day',
				}, {
					title: '渠道组名称',
					dataIndex: 'channelGroup',
					key: 'channelGroup',
				}, {
					title: 'MTD MAU',
					dataIndex: 'mtdMau',
					key: 'mtdMau',
				}, {
					title: '上月MAU',
					dataIndex: 'lmMau',
					key: 'lmMau',
				}, {
					title: '本月新增',
					dataIndex: 'mtdMnu',
					key: 'mtdMnu'
				}, {
					title: '上月新增本月回访',
					dataIndex: 'maLmn',
					key: 'maLmn'
				}, {
					title: '上上月活跃上月活跃本月回访',
					dataIndex: 'maLta',
					key: 'maLta'
				}, {
					title: '历史活跃上月活跃本月回访',
					dataIndex: 'maLha',
					key: 'maLha'
				}, {
					title: '历史活跃本月回访',
					dataIndex: 'maHa',
					key: 'maHa'
				}]
			})
		}



		//发送请求
		reqwest({
			url: '/data/mau/table.do',
			// url: '../../mock/userList/systemUser.json',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {
			dispatch({
				type: "USERCOMPOSE_TABLELOADING",
				payload: false
			})

			if (msg.status) {
				dispatch({
					type: "USERCOMPOSE_TABLEDATA",
					payload: msg.data
				})

				dispatch({
					type: "USERCOMPOSE_TOTAL",
					payload: msg.total
				})

			}

			if (msg.code == -1) {
				window.location.href = "/"
			}
		});
	}
}


const getDownLoadData = (data) => {

	return function(dispatch) {
		//发送请求
		reqwest({
			url: '/data/mau/table.do',
			// url: '../../mock/userList/systemUser.json',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {

			if (msg.status) {
				dispatch({
					type: "USERCOMPOSE_EXCELDATA",
					payload: msg.data
				})
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
	changeDate,
	getChannelGroup,
	getcharts,
	getTables,
	getDownLoadData
}