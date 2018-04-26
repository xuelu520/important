import React from 'react';
// 日期组件 
import moment from 'moment';
/**
 * 请求参数
 * @method Param
 * @param state {Object} 装态
 * @param action (Object) 动作
 */
const retentionAnalysis = (state, action) => {
	if (typeof state === "undefined") {
		//初始化
		return {
			appCode: "",
			channelCategory: "",
			channelName: "",
			startDate: moment().subtract(30, 'days').format("YYYY-MM-DD"),
			endDate: moment().subtract(1, 'days').format("YYYY-MM-DD"),
			maxDate: moment().subtract(1, 'days').format("YYYY-MM-DD"),
			limit: 10,
			channelGroup: "",
			offset: 1,
			channelGroupList: [],
			channelList: [],
			firm: "",
			firmList: [],
			brand: "",
			brandList: [],
			trendType: "1",
			type: "1",
			tableTotal: [],
			columns: [{
				title: '激活日期',
				dataIndex: 'day',
				key: 'day',
			}, {
				title: '新增用户',
				dataIndex: 'newUser',
				key: 'newUser',
			}, {
				title: '次日留存率',
				dataIndex: 'n2',
				key: 'n2',
				render: (text) => (<span> {Number(text) * 100 + '%'} </span>)
			}, {
				title: '2日留存率',
				dataIndex: 'n3',
				key: 'n3',
				render: (text) => (<span> {Number(text) * 100 + '%'} </span>)
			}, {
				title: '3日留存率',
				dataIndex: 'n4',
				key: 'n4',
				render: (text) => (<span> {Number(text) * 100 + '%'} </span>)
			}, {
				title: '4日留存率 ',
				dataIndex: 'n5',
				key: 'n5',
				render: (text) => (<span> {Number(text) * 100 + '%'} </span>)
			}, {
				title: '5日留存率',
				dataIndex: 'n6',
				key: 'n6',
				render: (text) => (<span> {Number(text) * 100 + '%'} </span>)
			}, {
				title: '6日留存率',
				dataIndex: 'n7',
				key: 'n7',
				render: (text) => (<span> {Number(text) * 100 + '%'} </span>)
			}, {
				title: '7日留存率',
				dataIndex: 'n8',
				key: 'n8',
				render: (text) => (<span> {Number(text) * 100 + '%'} </span>)
			}],
			tableData: [],
			tablesLoading: false,
			excelData: []
		};
	}


	switch (action.type) {

		case "RETENTANALYSIS_APPCODE":
			//操作系统状态
			return Object.assign({}, state, {
				appCode: action.payload
			});

		case "RETENTANALYSIS_CHANNELCATEGORY":
			//操作系统状态
			return Object.assign({}, state, {
				channelCategory: action.payload
			});

		case "RETENTANALYSIS_CHANNELNAME":
			//操作系统状态
			return Object.assign({}, state, {
				channelName: action.payload
			});

		case "RETENTANALYSIS_STARTDATE":
			//操作系统状态
			return Object.assign({}, state, {
				startDate: action.payload
			});

		case "RETENTANALYSIS_ENDDATE":
			//操作系统状态
			return Object.assign({}, state, {
				endDate: action.payload
			});


		case "RETENTANALYSIS_LIMIT":
			//操作系统状态
			return Object.assign({}, state, {
				limit: action.payload
			});


		case "RETENTANALYSIS_CHANNELGROUP":
			//操作系统状态
			return Object.assign({}, state, {
				channelGroup: action.payload
			});

		case "RETENTANALYSIS_OFFSET":
			//操作系统状态
			return Object.assign({}, state, {
				offset: action.payload
			});

		case "RETENTANALYSIS_CHANNELGROUPLIST":
			//操作系统状态
			return Object.assign({}, state, {
				channelGroupList: action.payload
			});


		case "RETENTANALYSIS_CHANNELLIST":
			//操作系统状态
			return Object.assign({}, state, {
				channelList: action.payload
			});

		case "RETENTANALYSIS_FIRM":
			//操作系统状态
			return Object.assign({}, state, {
				firm: action.payload
			});


		case "RETENTANALYSIS_FIRMLIST":
			//操作系统状态
			return Object.assign({}, state, {
				firmList: action.payload
			});

		case "RETENTANALYSIS_BRAND":
			//操作系统状态
			return Object.assign({}, state, {
				brand: action.payload
			});

		case "RETENTANALYSIS_BRANDLIST":
			//操作系统状态
			return Object.assign({}, state, {
				brandList: action.payload
			});

		case "RETENTANALYSIS_TRENDTYPE":
			//操作系统状态
			return Object.assign({}, state, {
				trendType: action.payload
			});

		case "RETENTANALYSIS_TYPE":
			//操作系统状态
			return Object.assign({}, state, {
				type: action.payload
			});

		case "RETENTANALYSIS_COLUMNS":
			//操作系统状态
			return Object.assign({}, state, {
				columns: action.payload
			});

		case "RETENTANALYSIS_TABLEDATA":
			//操作系统状态
			return Object.assign({}, state, {
				tableData: action.payload
			});

		case "RETENTANALYSIS_EXCELDATA":
			//操作系统状态
			return Object.assign({}, state, {
				excelData: action.payload
			});

		case "RETENTANALYSIS_TABLESLOADING":
			//操作系统状态
			return Object.assign({}, state, {
				tablesLoading: action.payload
			});

		case "RETENTANALYSIS_TABLETOTAL":
			//操作系统状态
			return Object.assign({}, state, {
				tableTotal: action.payload
			});


		default:
			//返回初始化
			return state;
	}
}

export {
	retentionAnalysis
}