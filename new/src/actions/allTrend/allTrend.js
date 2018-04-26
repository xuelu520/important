//todo mock数据
import "../../mock/common/global";

//todo mock数据
import "../../mock/allTrend/allTrend";



import React from 'react';
import reqwest from 'reqwest';

import {
	notification
} from 'antd';

const test = () => {
	console.log('awaken actions');
}

const getCharts1 = (data) => {

	console.log(data, '图表参数1');

	return function(dispatch) {

		dispatch({
			type: "ALLTREND_CHARTSLOADING1",
			payload: true
		})

		//发送请求
		reqwest({
			url: '/data/trend/chart.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {

			dispatch({
				type: "ALLTREND_CHARTSLOADING1",
				payload: false
			})

			console.log('新增用户图表响应', msg);
			if (msg.status) {

				if (msg.data.length != 0) {
					dispatch({
						type: "ALLTREND_CHARTSRESULTNODATA1",
						payload: false
					})
				} else {
					dispatch({
						type: "ALLTREND_CHARTSRESULTNODATA1",
						payload: true
					})
				}

				dispatch({
					type: "ALLTREND_CHARTSRESULT1",
					payload: msg.data
				})



			} else {
				notification['error']({
					message: '用户新增数据',
					description: msg.msg,
				});
			}

			if (msg.code == -1) {
				window.location.href = "/"
			}
		});
	}
}


const getCharts2 = (data) => {
	return function(dispatch) {

		dispatch({
			type: "ALLTREND_CHARTSLOADING2",
			payload: true
		})

		console.log(data);

		//发送请求
		reqwest({
			url: '/data/trend/chart.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {

			dispatch({
				type: "ALLTREND_CHARTSLOADING2",
				payload: false
			})

			console.log('新增用户图表响应', msg);

			if (msg.status) {

				if (msg.data.length != 0) {
					dispatch({
						type: "ALLTREND_CHARTSRESULTNODATA2",
						payload: false
					})
				} else {
					dispatch({
						type: "ALLTREND_CHARTSRESULTNODATA2",
						payload: true
					})
				}

				dispatch({
					type: "ALLTREND_CHARTSRESULT2",
					payload: msg.data
				})



			} else {
				notification['error']({
					message: '用户新增数据',
					description: msg.msg,
				});
			}

			if (msg.code == -1) {
				window.location.href = "/"
			}
		});
	}
}



const getCharts3 = (data) => {
	return function(dispatch) {

		dispatch({
			type: "ALLTREND_CHARTSLOADING3",
			payload: true
		})

		console.log(data);

		//发送请求
		reqwest({
			url: '/data/trend/chart.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {

			dispatch({
				type: "ALLTREND_CHARTSLOADING3",
				payload: false
			})

			console.log('新增用户图表响应', msg);
			if (msg.status) {


				if (msg.data.length != 0) {
					dispatch({
						type: "ALLTREND_CHARTSRESULTNODATA3",
						payload: false
					})
				} else {
					dispatch({
						type: "ALLTREND_CHARTSRESULTNODATA3",
						payload: true
					})
				}

				dispatch({
					type: "ALLTREND_CHARTSRESULT3",
					payload: msg.data
				})



			} else {
				notification['error']({
					message: '用户新增数据',
					description: msg.msg,
				});
			}

			if (msg.code == -1) {
				window.location.href = "/"
			}
		});
	}
}

const changeOs = (data) => {
	return function(dispatch) {
		dispatch({
			type: "ALLTREND_APPCODE",
			payload: data
		})
	}
}

const changeChannelCategory = (data) => {
	return function(dispatch) {
		dispatch({
			type: "ALLTREND_CHANNELCATEGORY",
			payload: data
		});
	}

}



const setDate = (data) => {
	return function(dispatch) {
		dispatch({
			type: "ALLTREND_STARTDATE",
			payload: data[0]
		});

		dispatch({
			type: "ALLTREND_ENTDATE",
			payload: data[1]
		});
	}
}

const getDownLoadData = (data) => {
	return function(dispatch) {
		//发送请求
		reqwest({
			url: '/data/trend/table.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {

			let excelData = (ex) => {


				if (data.tab == '1') {


					dispatch({
						type: "ALLTREND_TAB",
						payload: data.tab
					})

					dispatch({
						type: "ALLTREND_EXCELDATA1",
						payload: ex
					})
				} else if (data.tab == '2') {

					dispatch({
						type: "ALLTREND_TAB",
						payload: data.tab
					})

					dispatch({
						type: "ALLTREND_EXCELDATA2",
						payload: ex
					})
				} else {
					dispatch({
						type: "ALLTREND_TAB",
						payload: data.tab
					})
					dispatch({
						type: "ALLTREND_EXCELDATA3",
						payload: ex
					})
				}

			}

			if (msg.status) {

				excelData(msg.data);

			} else {
				notification['error']({
					message: '用户新增数据',
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
	getCharts1,
	getCharts2,
	getCharts3,
	changeOs,
	changeChannelCategory,
	setDate,
	getDownLoadData
}