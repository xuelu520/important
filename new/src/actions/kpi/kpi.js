//todo mock数据
import "../../mock/common/global";

//todo mock数据
import "../../mock/kpi/kpi";



import React from 'react';
import reqwest from 'reqwest';

import {
	notification
} from 'antd';

import {
	format2quartile
} from '../../common/utils';



const getChannelGroup = (data) => {
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
					type: "KPI_GROUPLIST",
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


const setDate = (arr) => {
	return function(dispatch) {
		dispatch({
			type: "KPI_STARTDATE",
			payload: arr[0]
		})

		dispatch({
			type: "KPI_ENTDATE",
			payload: arr[1]
		})
	}
}



const changeGroup = (data) => {
	return function(dispatch) {;
		dispatch({
			type: "KPI_CHANNELGROUP",
			payload: data
		})
	}
}

const updateDateType = (data) => {
	return function(dispatch) {
		dispatch({
			type: "KPI_DATETYPE",
			payload: data.dateType
		})
	}
}

const getCharts = (data) => {


	return function(dispatch) {

		dispatch({
			type: "KPI_CHART_LOADING",
			payload: true
		});

		//参数更新
		dispatch({
			type: "KPI_CHANNELGROUP",
			payload: data.channelGroup
		});

		//getCharts

		dispatch({
			type: "KPI_DATETYPE",
			payload: data.dateType
		});

		dispatch({
			type: "KPI_TAB",
			payload: data.tab
		});

		dispatch({
			type: "KPI_STARTDATE",
			payload: data.startDate
		});

		dispatch({
			type: "KPI_ENTDATE",
			payload: data.endDate
		});


		//发送请求
		reqwest({
			url: '/data/kpi/chart.do',
			// url: '../../mock/userList/systemUser.json',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {

			dispatch({
				type: "KPI_CHART_LOADING",
				payload: false
			});

			if (msg.status) {

				if (msg.data[0] != undefined && msg.data[0].key.length != 0) {
					dispatch({
						type: "KPI_CHARTS_NODATA",
						payload: false
					})
				} else {
					dispatch({
						type: "KPI_CHARTS_NODATA",
						payload: true
					})
				}

				dispatch({
					type: "KPI_CHARTSRESULT",
					payload: msg.data
				})

				dispatch({
					type: "KPI_CHARTS_CHANNELGROUPRESULTNAME",
					payload: data.channelGroup
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
			type: "KPI_TABLE_LOADING",
			payload: true
		});

		dispatch({
			type: "KPI_CHANNELGROUP",
			payload: data.channelGroup
		});

		dispatch({
			type: "KPI_DATETYPE",
			payload: data.dateType
		});

		dispatch({
			type: "KPI_STARTDATE",
			payload: data.startDate
		});


		dispatch({
			type: "KPI_ENDDATE",
			payload: data.endDate
		});


		dispatch({
			type: "KPI_OFFSET",
			payload: data.offset
		});


		dispatch({
			type: "KPI_LIMIT",
			payload: data.limit
		});

		//发送请求
		reqwest({
			url: '/data/kpi/list.do',
			// url: '../../mock/userList/systemUser.json',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {

			dispatch({
				type: "KPI_TABLE_LOADING",
				payload: false
			});

			if (msg.status) {

				console.log(msg.data, 'msg.data');

				var arr = [];
				msg.data.map((v, k) => {
					// v.newUser = format2quartile(v.newUser);
					// v.feeUser = format2quartile(v.feeUser);
					// v.freeUser = format2quartile(v.freeUser);
					arr.push(v);
					// v.newUser
				});

				dispatch({
					type: "KPI_TABLERESULT",
					payload: arr
				});


				dispatch({
					type: "KPI_TABLETOTAL",
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
			url: '/data/kpi/list.do',
			// url: '../../mock/userList/systemUser.json',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {
			if (msg.status) {
				dispatch({
					type: "KPI_EXCELDATA",
					payload: msg.data
				});
			}
		});
	}
}

export {
	getChannelGroup,
	changeGroup,
	updateDateType,
	setDate,
	getCharts,
	getTables,
	getDownLoadData
}