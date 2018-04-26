//todo mock数据
import "../../mock/common/global";

//todo mock数据
import "../../mock/terminalBrand/terminalBrand";



import React from 'react';
import reqwest from 'reqwest';

import {
	notification
} from 'antd';

const test = () => {

}
//测试

const changeOs = (data, callback) => {
	return function(dispatch) {
		dispatch({
			type: "TERMINALBRAND_APPCODE",
			payload: data.appCode
		})

		dispatch({
			type: "TERMINALBRAND_CHANNELCATEGORY",
			payload: data.channelCategory
		})

		dispatch({
			type: "TERMINALBRAND_CHANNELNAME",
			payload: data.channelName
		})

		dispatch({
			type: "TERMINALBRAND_CHANNELGROUP",
			payload: data.channelGroup
		})

		let groupList = {
			appCode: data.appCode,
			channelGroup: data.channelGroup,
			channelCategory: data.channelCategory
		}

		callback(groupList);

	}
}

const changeChannelCategory = (data, callback) => {
	return function(dispatch) {
		dispatch({
			type: "TERMINALBRAND_CHANNELCATEGORY",
			payload: data.channelCategory
		})

		dispatch({
			type: "TERMINALBRAND_CHANNELNAME",
			payload: data.channelName
		})

		dispatch({
			type: "TERMINALBRAND_CHANNELGROUP",
			payload: data.channelGroup
		})

		let groupList = {
			appCode: data.appCode,
			channelGroup: data.channelGroup,
			channelCategory: data.channelCategory
		}

		callback(groupList);
	}
}

const getChannelGroupList = (data) => {
	return function(dispatch) {

		dispatch({
			type: "TERMINALBRAND_CHANNELGROUP",
			payload: data.channelGroup
		})

		dispatch({
			type: "TERMINALBRAND_CHANNELCATEGORY",
			payload: data.channelCategory
		})

		dispatch({
			type: "TERMINALBRAND_APPCODE",
			payload: data.appCode
		})

		console.log(data, '----渠道组参数----');

		//发送请求
		reqwest({
			url: '/data/overview/channelGroup.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {

			console.log('###渠道组响应###', msg);

			if (msg.status) {

				dispatch({
					type: "TERMINALBRAND_CHANNELGROUPLIST",
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


	console.log(data, '----data渠道参数----');

	return function(dispatch) {

		dispatch({
			type: "TERMINALBRAND_APPCODE",
			payload: data.appCode
		})

		dispatch({
			type: "TERMINALBRAND_CHANNELCATEGORY",
			payload: data.channelCategory
		})


		dispatch({
			type: "TERMINALBRAND_CHANNELGROUP",
			payload: data.channelGroup
		})

		dispatch({
			type: "TERMINALBRAND_CHANNELNAME",
			payload: data.channelName
		})



		//发送请求
		reqwest({
			url: '/data/overview/channel.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {

			console.log('###渠道组响应###', msg);

			if (msg.status) {

				dispatch({
					type: "TERMINALBRAND_CHANNELLIST",
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
	console.log(data, '--厂商参数---');

	return function(dispatch) {
		dispatch({
			type: "TERMINALBRAND_FIRM",
			payload: data.firm
		})

		dispatch({
			type: "TERMINALBRAND_BRAND",
			payload: data.brand
		})

		var param = {
			firm: data.firm
		}

		//发送请求
		reqwest({
			url: '/common/firm.do',
			method: 'post',
			data: param,
			type: 'json',
			cache: true
		}).then((msg) => {

			console.log('###厂商响应###', msg);

			if (msg.status) {

				dispatch({
					type: "TERMINALBRAND_FIRMLIST",
					payload: msg.data
				})

				callback(data);

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


const getBrandList = (data) => {

	console.log(data, '--品牌参数---');

	return function(dispatch) {
		dispatch({
			type: "TERMINALBRAND_FIRM",
			payload: data.firm
		})


		dispatch({
			type: "TERMINALBRAND_BRAND",
			payload: data.brand
		})

		var param = {
			firm: data.firm
		}

		//发送请求
		reqwest({
			url: '/common/brand.do',
			method: 'post',
			data: param,
			type: 'json',
			cache: true
		}).then((msg) => {

			console.log('###品牌响应###', msg);

			if (msg.status) {

				dispatch({
					type: "TERMINALBRAND_BRANDLIST",
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

const setDate = (data) => {
	return function(dispatch) {

		dispatch({
			type: "TERMINALBRAND_STARTDATE",
			payload: data[0]
		})

		dispatch({
			type: "TERMINALBRAND_ENDDATE",
			payload: data[1]
		})
	}
}

const getCharts = (data) => {
	return function(dispatch) {

		dispatch({
			type: "TERMINALBRAND_APPCODE",
			payload: data.appCode
		});


		dispatch({
			type: "TERMINALBRAND_BRAND",
			payload: data.brand
		});

		dispatch({
			type: "TERMINALBRAND_CHANNELCATEGORY",
			payload: data.channelCategory
		});

		dispatch({
			type: "TERMINALBRAND_CHANNELNAME",
			payload: data.channelName
		});

		dispatch({
			type: "TERMINALBRAND_ENDDATE",
			payload: data.endDate
		});

		dispatch({
			type: "TERMINALBRAND_FIRM",
			payload: data.firm
		});

		dispatch({
			type: "TERMINALBRAND_STARTDATE",
			payload: data.startDate
		});

		dispatch({
			type: "TERMINALBRAND_TRENDTYPE",
			payload: data.trendType
		});


		dispatch({
			type: "TERMINALBRAND_ECHARTLOADING",
			payload: true
		});



		console.log('----图表参数----', data);
		//发送请求
		reqwest({
			url: '/data/model/chart.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {

			console.log('###图表响应###', msg);

			dispatch({
				type: "TERMINALBRAND_ECHARTLOADING",
				payload: false
			});

			if (msg.status) {

				if (msg.data.length != 0) {
					dispatch({
						type: "TERMINALBRAND_CHARTNODATA",
						payload: false
					})
				} else {
					dispatch({
						type: "TERMINALBRAND_CHARTNODATA",
						payload: true
					})
				}


				dispatch({
					type: "TERMINALBRAND_CHARTSDATA",
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

		console.log('---表格参数---', data);

		dispatch({
			type: "TERMINALBRAND_TABLELOADING",
			payload: true
		});



		//发送请求
		reqwest({
			url: '/data/model/table.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {

			console.log('###表格响应###', msg);

			dispatch({
				type: "TERMINALBRAND_TABLELOADING",
				payload: false
			});

			if (msg.status) {


				dispatch({
					type: "TERMINALBRAND_TABLESDATA",
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

const setOffset = (data) => {
	return function(dispatch) {

		dispatch({
			type: "TERMINALBRAND_OFFSET",
			payload: data.offset
		})
	}
}

const getDownLoadData = (data) => {
	return function(dispatch) {
		//发送请求
		reqwest({
			url: '/data/model/table.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {

			if (msg.status) {
				dispatch({
					type: "TERMINALBRAND_EXCELDATA",
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
	setDate,
	getCharts,
	getTables,
	setOffset,
	getDownLoadData
}