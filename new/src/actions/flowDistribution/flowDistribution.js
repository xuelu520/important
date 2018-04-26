//todo mock数据
import "../../mock/common/global";

//todo mock数据
import "../../mock/flowDistribution/flowDistribution";



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
			type: "FLOWDISTRIBUTION_APPCODE",
			payload: data.appCode
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELCATEGORY",
			payload: data.channelCategory
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELGROUP",
			payload: data.channelGroup
		})


		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELNAME",
			payload: data.channelName
		})

		var params = {
			appCode: data.appCode,
			channelGroup: data.channelGroup,
			channelCategory: data.channelCategory
		}
		callback(params);

	}
}

const changeChannelCategory = (data, callback) => {
	return function(dispatch) {
		dispatch({
			type: "FLOWDISTRIBUTION_APPCODE",
			payload: data.appCode
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELCATEGORY",
			payload: data.channelCategory
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELGROUP",
			payload: data.channelGroup
		})


		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELNAME",
			payload: data.channelName
		})

		var params = {
			appCode: data.appCode,
			channelGroup: data.channelGroup,
			channelCategory: data.channelCategory
		}
		callback(params);
	}
}


const getChannelGroup = (data) => {
	return function(dispatch) {
		dispatch({
			type: "FLOWDISTRIBUTION_APPCODE",
			payload: data.appCode
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELCATEGORY",
			payload: data.channelCategory
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELGROUP",
			payload: data.channelGroup
		})

		console.log('---渠道组参数---', data);

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
					type: "FLOWDISTRIBUTION_CHANNELGROUPLIST",
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

const changeChannelGroup = (data) => {
	return function(dispatch) {
		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELGROUP",
			payload: data.channelGroup
		})
	}
}

const searchChannel = (data) => {
	return function(dispatch) {
		// appCode: this.props.flowDistribution.appCode,
		// channelCategory: this.props.flowDistribution.channelCategory,
		// channelGroup: this.props.flowDistribution.channelGroup,
		// channelName: value
		dispatch({
			type: "FLOWDISTRIBUTION_APPCODE",
			payload: data.appCode
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELCATEGORY",
			payload: data.channelCategory
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELGROUP",
			payload: data.channelGroup
		})


		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELNAME",
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
					type: "FLOWDISTRIBUTION_CHANNELLIST",
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
			type: "FLOWDISTRIBUTION_ENDDATE",
			payload: data
		})

	}
}

const getHour = (data) => {
	return function(dispatch) {
		dispatch({
			type: "FLOWDISTRIBUTION_APPCODE",
			payload: data.appCode
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELCATEGORY",
			payload: data.channelCategory
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELGROUP",
			payload: data.channelGroup
		});

		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELNAME",
			payload: data.channelName
		});

		dispatch({
			type: "FLOWDISTRIBUTION_ENDDATE",
			payload: data.endDate
		});

		dispatch({
			type: "FLOWDISTRIBUTION_CHARTSDATALOADING1",
			payload: true
		});


		console.log('###hover参数###', data);

		//发送请求
		reqwest({
			url: '/data/flow/hour.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {
			dispatch({
				type: "FLOWDISTRIBUTION_CHARTSDATALOADING1",
				payload: false
			});
			console.log('###hover响应###', msg);

			if (msg.status) {
				hoverNoData1(msg.data.NewUserActiveTime, dispatch);

				dispatch({
					type: "FLOWDISTRIBUTION_NEWUSERACTIVETIME",
					payload: msg.data.NewUserActiveTime
				})

				hoverNoData2(msg.data.activeUserStartTime, dispatch);

				dispatch({
					type: "FLOWDISTRIBUTION_ACTIVEUSERSTARTTIME",
					payload: msg.data.activeUserStartTime
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

const newModal = (data) => {
	return function(dispatch) {

		// endDate: this.props.flowDistribution.endDate
		dispatch({
			type: "FLOWDISTRIBUTION_APPCODE",
			payload: data.appCode
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELCATEGORY",
			payload: data.channelCategory
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELGROUP",
			payload: data.channelGroup
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELNAME",
			payload: data.channelName
		})

		dispatch({
			type: "FLOWDISTRIBUTION_ENDDATE",
			payload: data.endDate
		})


		dispatch({
			type: "FLOWDISTRIBUTION_CHARTSDATALOADING3",
			payload: true
		});

		console.log('###new参数###', data);

		//发送请求
		reqwest({
			url: '/data/flow/deviceModel/new.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {
			dispatch({
				type: "FLOWDISTRIBUTION_CHARTSDATALOADING3",
				payload: false
			});
			console.log('###new响应###', msg);

			if (msg.status) {

				hoverNoData3(msg.data.newUserModel, dispatch);

				dispatch({
					type: "FLOWDISTRIBUTION_NEWUSERMODEL",
					payload: msg.data.newUserModel
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

const activeModal = (data) => {
	return function(dispatch) {
		// appCode: this.props.flowDistribution.appCode,
		// channelCategory: this.props.flowDistribution.channelCategory,
		// channelGroup: this.props.flowDistribution.channelGroup,
		// channelName: this.props.flowDistribution.channelName,
		// endDate: this.props.flowDistribution.endDate
		dispatch({
			type: "FLOWDISTRIBUTION_APPCODE",
			payload: data.appCode
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELCATEGORY",
			payload: data.channelCategory
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELGROUP",
			payload: data.channelGroup
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELNAME",
			payload: data.channelName
		})

		dispatch({
			type: "FLOWDISTRIBUTION_ENDDATE",
			payload: data.endDate
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHARTSDATALOADING4",
			payload: true
		});

		console.log('###active参数###', data);

		//发送请求
		reqwest({
			url: '/data/flow/deviceModel/active.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {
			dispatch({
				type: "FLOWDISTRIBUTION_CHARTSDATALOADING4",
				payload: false
			});
			console.log('###active响应###', msg);

			if (msg.status) {

				hoverNoData4(msg.data.activeUserModel, dispatch);

				dispatch({
					type: "FLOWDISTRIBUTION_ACTIVEUSERMODEL",
					payload: msg.data.activeUserModel
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


const netNewUser = (data) => {
	return function(dispatch) {


		dispatch({
			type: "FLOWDISTRIBUTION_APPCODE",
			payload: data.appCode
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELCATEGORY",
			payload: data.channelCategory
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELGROUP",
			payload: data.channelGroup
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELNAME",
			payload: data.channelName
		})

		dispatch({
			type: "FLOWDISTRIBUTION_ENDDATE",
			payload: data.endDate
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHARTSDATALOADING5",
			payload: true
		})


		//发送请求
		reqwest({
			url: '/data/flow/net.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {
			dispatch({
				type: "FLOWDISTRIBUTION_CHARTSDATALOADING5",
				payload: false
			});

			console.log('###active响应###', msg);

			if (msg.status) {

				var arr1 = netNewFormat(msg.data.newUserNetType);

				var arr2Active = activeFormat(msg.data.activeUserNetType);

				if (msg.data.newUserNetType.length == 0) {

					dispatch({
						type: "FLOWDISTRIBUTION_CHARTSNODATA5",
						payload: true
					})
				}

				if (msg.data.activeUserNetType.length == 0) {

					dispatch({
						type: "FLOWDISTRIBUTION_CHARTSNODATA6",
						payload: true
					})
				}

				dispatch({
					type: "FLOWDISTRIBUTION_NEWUSERNETTYPE",
					payload: arr1
				})

				dispatch({
					type: "FLOWDISTRIBUTION_ACTIVEUSERNETTYPE",
					payload: arr2Active
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

const getArea = (data) => {
	return function(dispatch) {
		dispatch({
			type: "FLOWDISTRIBUTION_APPCODE",
			payload: data.appCode
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELCATEGORY",
			payload: data.channelCategory
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELGROUP",
			payload: data.channelGroup
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHANNELNAME",
			payload: data.channelName
		})

		dispatch({
			type: "FLOWDISTRIBUTION_ENDDATE",
			payload: data.endDate
		})

		dispatch({
			type: "FLOWDISTRIBUTION_CHARTSDATALOADING7",
			payload: true
		});
		//发送请求
		reqwest({
			url: '/data/flow/area.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {
			dispatch({
				type: "FLOWDISTRIBUTION_CHARTSDATALOADING7",
				payload: false
			});

			console.log('###active响应###', msg);

			if (msg.status) {

				var arr1 = areaNewFormat(msg.data);

				var arr2 = areaActiveFormat(msg.data);

				if (arr1.length == 0) {
					dispatch({
						type: "FLOWDISTRIBUTION_CHARTSNODATA7",
						payload: true
					})
				}

				if (arr2.length == 0) {
					dispatch({
						type: "FLOWDISTRIBUTION_CHARTSNODATA8",
						payload: true
					})
				}

				dispatch({
					type: "FLOWDISTRIBUTION_NEWUSERAREA",
					payload: arr1
				})

				dispatch({
					type: "FLOWDISTRIBUTION_ACTIVEUSERAREA",
					payload: arr2
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

const areaNewFormat = (data) => {
	var arr = [];

	data.map((v, k) => {
		arr.push({
			name: v.province,
			value: v.newUser
		})
	});

	return arr;
}

const areaActiveFormat = (data) => {
	var arr = [];

	data.map((v, k) => {
		arr.push({
			name: v.province,
			value: v.activeUser
		});
	});

	return arr;
}

const netNewFormat = (data) => {
	var arr = [];
	data.map((v, k) => {
		arr.push({
			value: v.newUser,
			name: v.netType
		});
	});

	return arr;
}


const activeFormat = (data) => {
	var arr = [];
	data.map((v, k) => {
		arr.push({
			value: v.activeUser,
			name: v.netType
		});
	});

	return arr;
}

const hoverNoData1 = (data, dispatch) => {
	var isNoData = false;
	data.map((v, k) => {
		if (v.yAxis.length != 0) {
			isNoData = true
		}
	});
	if (!isNoData) {
		dispatch({
			type: "FLOWDISTRIBUTION_CHARTSNODATA1",
			payload: true
		})
	}
}

const hoverNoData2 = (data, dispatch) => {

	console.log(data, '##########');

	var isNoData = false;
	data.map((v, k) => {
		if (v.yAxis.length != 0) {
			isNoData = true
		}
	});
	if (!isNoData) {
		dispatch({
			type: "FLOWDISTRIBUTION_CHARTSNODATA2",
			payload: true
		})
	}
}

const hoverNoData3 = (data, dispatch) => {

	console.log(data, '##########');

	var isNoData = false;
	data.map((v, k) => {
		if (v.yAxis.length != 0) {
			isNoData = true
		}
	});
	if (!isNoData) {
		dispatch({
			type: "FLOWDISTRIBUTION_CHARTSNODATA3",
			payload: true
		})
	}
}


const hoverNoData4 = (data, dispatch) => {

	console.log(data, '##########');

	var isNoData = false;
	data.map((v, k) => {
		if (v.yAxis.length != 0) {
			isNoData = true
		}
	});
	if (!isNoData) {
		dispatch({
			type: "FLOWDISTRIBUTION_CHARTSNODATA4",
			payload: true
		})
	}
}

const getDownLoadData1 = (data) => {
	return function(dispatch) {
		//发送请求
		reqwest({
			url: '/data/flow/hour/down.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {
			if (msg.status) {

				var arr = [];

				msg.data.map((v, k) => {
					v.hour = v.hour + ":00";
					arr.push(v);
				});

				dispatch({
					type: "FLOWDISTRIBUTION_EXCEL1",
					payload: arr
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

const getDownLoadData2 = (data) => {
	return function(dispatch) {
		//发送请求
		reqwest({
			url: '/data/flow/hour/down.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {
			if (msg.status) {

				var arr = [];

				msg.data.map((v, k) => {
					v.hour = v.hour + ":00";
					arr.push(v);
				});

				dispatch({
					type: "FLOWDISTRIBUTION_EXCEL2",
					payload: arr
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

const getDownLoadData3 = (data) => {
	return function(dispatch) {
		//发送请求
		reqwest({
			url: '/data/flow/deviceModel/down.do?type=1',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {
			if (msg.status) {



				dispatch({
					type: "FLOWDISTRIBUTION_EXCEL3",
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

const getDownLoadData4 = (data) => {
	return function(dispatch) {
		//发送请求
		reqwest({
			url: '/data/flow/deviceModel/down.do?type=2',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {
			if (msg.status) {
				dispatch({
					type: "FLOWDISTRIBUTION_EXCEL4",
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

const getDownLoadData5 = (data) => {
	return function(dispatch) {
		//发送请求
		reqwest({
			url: '/data/flow/net/down.do?type=1',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {
			if (msg.status) {

				console.log(msg.data, 'msg.data');

				dispatch({
					type: "FLOWDISTRIBUTION_EXCEL5",
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

const getDownLoadData6 = (data) => {
	return function(dispatch) {
		//发送请求
		reqwest({
			url: '/data/flow/net/down.do?type=2',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {
			if (msg.status) {

				console.log(msg.data, 'msg.data');

				dispatch({
					type: "FLOWDISTRIBUTION_EXCEL6",
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

const getDownLoadData7 = (data) => {
	return function(dispatch) {
		//发送请求
		reqwest({
			url: '/data/flow/area/down.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {
			if (msg.status) {

				console.log(msg.data, 'msg.data');

				dispatch({
					type: "FLOWDISTRIBUTION_EXCEL7",
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

const getDownLoadData8 = (data) => {
	return function(dispatch) {
		//发送请求
		reqwest({
			url: '/data/flow/area/down.do',
			method: 'post',
			data: data,
			type: 'json',
			cache: true
		}).then((msg) => {
			if (msg.status) {

				console.log(msg.data, 'msg.data');

				dispatch({
					type: "FLOWDISTRIBUTION_EXCEL8",
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
	getChannelGroup,
	changeChannelCategory,
	changeChannelGroup,
	searchChannel,
	setDate,
	getHour,
	newModal,
	activeModal,
	netNewUser,
	getArea,
	getDownLoadData1,
	getDownLoadData2,
	getDownLoadData3,
	getDownLoadData4,
	getDownLoadData5,
	getDownLoadData6,
	getDownLoadData7,
	getDownLoadData8
}