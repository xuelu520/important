// 日期组件 
import moment from 'moment';
/**
 * 请求参数
 * @method Param
 * @param state {Object} 装态
 * @param action (Object) 动作
 */

const flowDistribution = (state, action) => {
	if (typeof state === "undefined") {
		//初始化
		return {
			appCode: "",
			channelCategory: "",
			channelName: "",
			endDate: moment().subtract(1, 'days').format("YYYY-MM-DD"),
			maxDate: moment().subtract(1, 'days').format("YYYY-MM-DD"),
			channelGroup: "",
			channelGroupList: [],
			channelList: [],
			//新增用户启动时间分布
			newUserActiveTime: [],
			//新增用户激活时间分布
			activeUserStartTime: [],
			//新增用户机型分布
			newUserModel: [],
			//活跃用户机型分布
			activeUserModel: [],
			//新增用户联网方式
			newUserNetType: [],
			//活跃用户联网方式
			activeUserNetType: [],
			//新增用户地域分布
			newUserArea: [],
			//活跃用户地址分布
			activeUserArea: [],
			chartsDataloading1: false,
			chartsNoData1: false,

			chartsDataloading2: false,
			chartsNoData2: false,

			chartsDataloading3: false,
			chartsNoData3: false,

			chartsDataloading4: false,
			chartsNoData4: false,
			chartsDataloading5: false,
			chartsNoData5: false,
			chartsDataloading6: false,
			chartsNoData6: false,
			chartsDataloading7: false,
			chartsNoData7: false,
			chartsDataloading8: false,
			chartsNoData8: false,
			type: 1,
			excelHead1: [{
				title: '日期',
				dataIndex: 'day',
				key: 'day',
			}, {
				title: '时间',
				dataIndex: 'hour',
				key: 'hour',
			}, {
				title: '新增用户',
				dataIndex: 'newUser',
				key: 'newUser'
			}],
			excelHead2: [{
				title: '日期',
				dataIndex: 'day',
				key: 'day',
			}, {
				title: '时间',
				dataIndex: 'hour',
				key: 'hour',
			}, {
				title: '启动次数',
				dataIndex: 'bootTimes',
				key: 'bootTimes'
			}],

			excelHead3: [{
				title: '日期',
				dataIndex: 'day',
				key: 'day',
			}, {
				title: '机型',
				dataIndex: 'deviceModel',
				key: 'deviceModel',
			}, {
				title: '新增用户',
				dataIndex: 'newUser',
				key: 'newUser'
			}],
			excelHead4: [{
				title: '日期',
				dataIndex: 'day',
				key: 'day',
			}, {
				title: '机型',
				dataIndex: 'deviceModel',
				key: 'deviceModel',
			}, {
				title: '活跃用户',
				dataIndex: 'activeUser',
				key: 'activeUser'
			}],
			excelHead5: [{
				title: '联网方式',
				dataIndex: 'netType',
				key: 'netType',
			}, {
				title: '新增用户',
				dataIndex: 'newUser',
				key: 'newUser'
			}],
			excelHead6: [{
				title: '联网方式',
				dataIndex: 'netType',
				key: 'netType',
			}, {
				title: '活跃用户',
				dataIndex: 'activeUser',
				key: 'activeUser'
			}],
			excelHead7: [{
				title: '省份',
				dataIndex: 'province',
				key: 'province',
			}, {
				title: '城市',
				dataIndex: 'city',
				key: 'city'
			}, {
				title: '新增用户',
				dataIndex: 'newUser',
				key: 'newUser'
			}],
			excelHead8: [{
				title: '省份',
				dataIndex: 'province',
				key: 'province',
			}, {
				title: '城市',
				dataIndex: 'city',
				key: 'city'
			}, {
				title: '活跃用户',
				dataIndex: 'activeUser',
				key: 'activeUser'
			}],
			excel1: [],
			excel2: [],
			excel3: [],
			excel4: [],
			excel5: [],
			excel6: [],
			excel7: [],
			excel8: []
		};
	}

	switch (action.type) {

		case "FLOWDISTRIBUTION_APPCODE":
			//操作系统状态
			return Object.assign({}, state, {
				appCode: action.payload
			});

		case "FLOWDISTRIBUTION_CHANNELCATEGORY":
			//操作系统状态
			return Object.assign({}, state, {
				channelCategory: action.payload
			});

		case "FLOWDISTRIBUTION_CHANNELNAME":
			//操作系统状态
			return Object.assign({}, state, {
				channelName: action.payload
			});

		case "FLOWDISTRIBUTION_ENDDATE":
			//操作系统状态
			return Object.assign({}, state, {
				endDate: action.payload
			});

		case "FLOWDISTRIBUTION_CHANNELGROUP":
			//操作系统状态
			return Object.assign({}, state, {
				channelGroup: action.payload
			});


		case "FLOWDISTRIBUTION_CHANNELGROUPLIST":
			//操作系统状态
			return Object.assign({}, state, {
				channelGroupList: action.payload
			});

		case "FLOWDISTRIBUTION_CHANNELLIST":
			//操作系统状态
			return Object.assign({}, state, {
				channelList: action.payload
			});

		case "FLOWDISTRIBUTION_NEWUSERACTIVETIME":
			//操作系统状态
			return Object.assign({}, state, {
				newUserActiveTime: action.payload
			});

		case "FLOWDISTRIBUTION_ACTIVEUSERSTARTTIME":
			//操作系统状态
			return Object.assign({}, state, {
				activeUserStartTime: action.payload
			});

		case "FLOWDISTRIBUTION_NEWUSERMODEL":
			//操作系统状态
			return Object.assign({}, state, {
				newUserModel: action.payload
			});

		case "FLOWDISTRIBUTION_ACTIVEUSERMODEL":
			//操作系统状态
			return Object.assign({}, state, {
				activeUserModel: action.payload
			});

		case "FLOWDISTRIBUTION_NEWUSERNETTYPE":
			//操作系统状态
			return Object.assign({}, state, {
				newUserNetType: action.payload
			});

		case "FLOWDISTRIBUTION_ACTIVEUSERNETTYPE":
			//操作系统状态
			return Object.assign({}, state, {
				activeUserNetType: action.payload
			});

		case "FLOWDISTRIBUTION_NEWUSERAREA":
			//操作系统状态
			return Object.assign({}, state, {
				newUserArea: action.payload
			});

		case "FLOWDISTRIBUTION_ACTIVEUSERAREA":
			//操作系统状态
			return Object.assign({}, state, {
				activeUserArea: action.payload
			});

		case "FLOWDISTRIBUTION_EXCEL1":
			//操作系统状态
			return Object.assign({}, state, {
				excel1: action.payload
			});

		case "FLOWDISTRIBUTION_EXCEL2":
			//操作系统状态
			return Object.assign({}, state, {
				excel2: action.payload
			});


		case "FLOWDISTRIBUTION_EXCEL3":
			//操作系统状态
			return Object.assign({}, state, {
				excel3: action.payload
			});

		case "FLOWDISTRIBUTION_EXCEL4":
			//操作系统状态
			return Object.assign({}, state, {
				excel4: action.payload
			});

		case "FLOWDISTRIBUTION_EXCEL5":
			//操作系统状态
			return Object.assign({}, state, {
				excel5: action.payload
			});

		case "FLOWDISTRIBUTION_EXCEL6":
			//操作系统状态
			return Object.assign({}, state, {
				excel6: action.payload
			});

		case "FLOWDISTRIBUTION_EXCEL7":
			//操作系统状态
			return Object.assign({}, state, {
				excel7: action.payload
			});

		case "FLOWDISTRIBUTION_EXCEL8":
			//操作系统状态
			return Object.assign({}, state, {
				excel8: action.payload
			});

		case "FLOWDISTRIBUTION_CHARTSDATALOADING1":
			//操作系统状态
			return Object.assign({}, state, {
				chartsDataloading1: action.payload
			});

		case "FLOWDISTRIBUTION_CHARTSNODATA1":
			//操作系统状态
			return Object.assign({}, state, {
				chartsNoData1: action.payload
			});

		case "FLOWDISTRIBUTION_CHARTSDATALOADING2":
			//操作系统状态
			return Object.assign({}, state, {
				chartsDataloading2: action.payload
			});

		case "FLOWDISTRIBUTION_CHARTSNODATA2":
			//操作系统状态
			return Object.assign({}, state, {
				chartsNoData2: action.payload
			});


		case "FLOWDISTRIBUTION_CHARTSDATALOADING3":
			//操作系统状态
			return Object.assign({}, state, {
				chartsDataloading3: action.payload
			});

		case "FLOWDISTRIBUTION_CHARTSNODATA3":
			//操作系统状态
			return Object.assign({}, state, {
				chartsNoData3: action.payload
			});


		case "FLOWDISTRIBUTION_CHARTSDATALOADING4":
			//操作系统状态
			return Object.assign({}, state, {
				chartsDataloading4: action.payload
			});

		case "FLOWDISTRIBUTION_CHARTSNODATA4":
			//操作系统状态
			return Object.assign({}, state, {
				chartsNoData4: action.payload
			});


		case "FLOWDISTRIBUTION_CHARTSDATALOADING5":
			//操作系统状态
			return Object.assign({}, state, {
				chartsDataloading5: action.payload
			});

		case "FLOWDISTRIBUTION_CHARTSNODATA5":
			//操作系统状态
			return Object.assign({}, state, {
				chartsNoData5: action.payload
			});


		case "FLOWDISTRIBUTION_CHARTSDATALOADING6":
			//操作系统状态
			return Object.assign({}, state, {
				chartsDataloading6: action.payload
			});

		case "FLOWDISTRIBUTION_CHARTSNODATA6":
			//操作系统状态
			return Object.assign({}, state, {
				chartsNoData6: action.payload
			});


		case "FLOWDISTRIBUTION_CHARTSDATALOADING7":
			//操作系统状态
			return Object.assign({}, state, {
				chartsDataloading7: action.payload
			});

		case "FLOWDISTRIBUTION_CHARTSNODATA7":
			//操作系统状态
			return Object.assign({}, state, {
				chartsNoData7: action.payload
			});


		case "FLOWDISTRIBUTION_CHARTSDATALOADING8":
			//操作系统状态
			return Object.assign({}, state, {
				chartsDataloading8: action.payload
			});

		case "FLOWDISTRIBUTION_CHARTSNODATA8":
			//操作系统状态
			return Object.assign({}, state, {
				chartsNoData8: action.payload
			});

		case "FLOWDISTRIBUTION_TYPE":
			//操作系统状态
			return Object.assign({}, state, {
				type: action.payload
			});

			// type

		default:
			//返回初始化
			return state;
	}

}

export {
	flowDistribution
}