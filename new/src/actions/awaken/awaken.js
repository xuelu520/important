//todo mock数据
import "../../mock/common/global";

//todo mock数据
import "../../mock/awaken/awaken";



import React from 'react';
import reqwest from 'reqwest';

import {
	notification
} from 'antd';

const test = () => {
	console.log('awaken actions');
}

const getTable = (data) => {

	console.log('表格参数', data);

	return function(dispatch) {

		dispatch({
			type: "AWAKEN_LIMIT",
			payload: data.limit
		})


		dispatch({
			type: "AWAKEN_OFFSET",
			payload: data.offset
		})

		dispatch({
			type: "AWAKEN_TABLELOADING",
			payload: true
		})

		//发送请求
		reqwest({
			url: '/data/awaken/table.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {

			dispatch({
				type: "AWAKEN_TABLELOADING",
				payload: false
			})

			console.log('表格响应', msg);
			if (msg.status) {
				dispatch({
					type: "AWAKEN_TABLEDATA",
					payload: msg.data
				})

				dispatch({
					type: "AWAKEN_TOTAL",
					payload: msg.total
				})


			} else {
				notification['error']({
					message: '表格数据',
					description: msg.msg,
				});
			}

			if (msg.code == -1) {
				window.location.href = "/"
			}
		});

	}
}

const changeOs = (id) => {
	return function(dispatch) {
		dispatch({
			type: "AWAKEN_APPCODE",
			payload: id
		})
	}
}

const searchChannel = (value) => {
	return function(dispatch) {
		dispatch({
			type: "AWAKEN_PARAMVALUE",
			payload: value
		})
	}
}

const setDate = (data) => {
	return function(dispatch) {
		dispatch({
			type: "AWAKEN_STARTDATE",
			payload: data[0]
		})

		dispatch({
			type: "AWAKEN_ENDDATE",
			payload: data[1]
		})
	}
}

const getDownLoadData = (data) => {
	return function(dispatch) {
		//发送请求
		reqwest({
			url: '/data/awaken/table.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {



			if (msg.status) {
				dispatch({
					type: "AWAKEN_EXCELDATA",
					payload: msg.data
				})



			} else {
				notification['error']({
					message: '表格数据',
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
	getTable,
	changeOs,
	searchChannel,
	setDate,
	getDownLoadData
}