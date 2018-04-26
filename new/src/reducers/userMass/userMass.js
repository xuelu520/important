import React from 'react';

// 日期组件 
import moment from 'moment';
/**
 * 请求参数
 * @method Param
 * @param state {Object} 装态
 * @param action (Object) 动作
 */

const userMass = (state, action) => {
	if (typeof state === "undefined") {
		//初始化
		return {
			appCode: "27",
			channelName: "appstore",
			startDate: moment().subtract(30, 'days').format("YYYY-MM-DD"),
			endDate: moment().subtract(1, 'days').format("YYYY-MM-DD"),
			maxDate: moment().subtract(1, 'days').format("YYYY-MM-DD"),
			limit: 10,
			offset: 1,
			tab: 1,
			channelList: [],
			columns: [{
				title: '日期',
				dataIndex: 'day',
				key: 'day',
			}, {
				title: '健康度',
				dataIndex: 'healthy',
				key: 'healthy',
			}, {
				title: '活跃度',
				dataIndex: 'activity',
				key: 'activity'
			}, {
				title: '二次启动比',
				dataIndex: 'secondActivePercent',
				key: 'secondActivePercent',
				render: (text) => (<span> {(Number(text) * 100).toFixed(2) + '%'} </span>)
			}, {
				title: '全量新增用户',
				dataIndex: 'newUser',
				key: 'newUser'
			}, {
				title: '新增用户作弊占比 ',
				dataIndex: 'cheatUserPercent',
				key: 'cheatUserPercent',
				render: (text) => (<span> {(Number(text) * 100).toFixed(2)  + '%'} </span>)
			}, {
				title: '核减后新增用户',
				dataIndex: 'outCheatUser',
				key: 'outCheatUser'
			}],
			tableData: [],
			chartsData: [],
			chartsNoData: false,
			tablesLoading: false,
			chartsLoading: false,
			total: 1,
			chartsName: "",
			excelData: []
		};
	}


	switch (action.type) {

		case "USERMASS_APPCODE":
			//操作系统状态
			return Object.assign({}, state, {
				appCode: action.payload
			});

		case "USERMASS_CHANNELNAME":
			//操作系统状态
			return Object.assign({}, state, {
				channelName: action.payload
			});

		case "USERMASS_STARTDATE":
			//操作系统状态
			return Object.assign({}, state, {
				startDate: action.payload
			});


		case "USERMASS_ENDDATE":
			//操作系统状态
			return Object.assign({}, state, {
				endDate: action.payload
			});

		case "USERMASS_LIMIT":
			//操作系统状态
			return Object.assign({}, state, {
				limit: action.payload
			});

		case "USERMASS_OFFSET":
			//操作系统状态
			return Object.assign({}, state, {
				offset: action.payload
			});

		case "USERMASS_CHANNELLIST":
			//操作系统状态
			return Object.assign({}, state, {
				channelList: action.payload
			});

		case "USERMASS_TOTAL":
			//操作系统状态
			return Object.assign({}, state, {
				total: action.payload
			});

		case "USERMASS_COLUMNS":
			//操作系统状态
			return Object.assign({}, state, {
				columns: action.payload
			});

		case "USERMASS_TABLEDATA":
			//操作系统状态
			return Object.assign({}, state, {
				tableData: action.payload
			});

		case "USERMASS_CHARTSDATA":
			//操作系统状态
			return Object.assign({}, state, {
				chartsData: action.payload
			});

		case "USERMASS_CHARTSNODATA":
			//操作系统状态
			return Object.assign({}, state, {
				chartsNoData: action.payload
			});



		case "USERMASS_TABLESLOADING":
			//操作系统状态
			return Object.assign({}, state, {
				tablesLoading: action.payload
			});

		case "USERMASS_CHARTSLOADING":
			//操作系统状态
			return Object.assign({}, state, {
				chartsLoading: action.payload
			});

		case "USERMASS_TAB":
			//操作系统状态
			return Object.assign({}, state, {
				tab: action.payload
			});

		case "USERMASS_CHARTSNAME":
			//操作系统状态
			return Object.assign({}, state, {
				chartsName: action.payload
			});
		case "USERMASS_EXCELDATA":
			//操作系统状态
			return Object.assign({}, state, {
				excelData: action.payload
			});

			//excelData

		default:
			//返回初始化
			return state;
	}
}

export {
	userMass
}