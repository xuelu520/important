import React from 'react';

// 日期组件 
import moment from 'moment';
/**
 * 请求参数
 * @method Param
 * @param state {Object} 装态
 * @param action (Object) 动作
 */
const awaken = (state, action) => {
	if (typeof state === "undefined") {
		//初始化
		return {
			appCode: "",
			startDate: moment().subtract(30, 'days').format("YYYY-MM-DD"),
			endDate: moment().subtract(1, 'days').format("YYYY-MM-DD"),
			maxDate: moment().subtract(1, 'days').format("YYYY-MM-DD"),
			limit: 10,
			offset: 1,
			paramValue: "",
			columns: [{
				title: '日期',
				dataIndex: 'day',
				key: 'day',
			}, {
				title: '操作系统',
				dataIndex: 'os',
				key: 'os',
			}, {
				title: '唤醒渠道名称',
				dataIndex: 'awakeChannel',
				key: 'awakeChannel'
			}, {
				title: '渠道一级参数',
				dataIndex: 'firstParam',
				key: 'firstParam'
			}, {
				title: '渠道二级参数',
				dataIndex: 'secondParam',
				key: 'secondParam'
			}, {
				title: '唤醒次数',
				dataIndex: 'awakenTimes',
				key: 'awakenTimes'
			}, {
				title: '唤醒用户数',
				dataIndex: 'awakenUser',
				key: 'awakenUser'
			}, {
				title: '首次启动数',
				dataIndex: 'firstBootUser',
				key: 'firstBootUser'
			}, {
				title: '首启用户占比',
				dataIndex: 'fisrtBootUserPer',
				key: 'fisrtBootUserPer',
				render: (text) => (<span> {(Number(text) * 100).toFixed(2) + '%'} </span>)
			}, {
				title: '与其它渠道重叠用户数',
				dataIndex: 'overlapUser',
				key: 'overlapUser'
			}, {
				title: '与主动打开重叠用户数',
				dataIndex: 'openlapUser',
				key: 'openlapUser'
			}, {
				title: '与主站Push重叠用户数',
				dataIndex: 'pushlapUser',
				key: 'pushlapUser'
			}],
			tableData: [],
			tableLoading: false,
			total: 1,
			excelData: []
		};
	}



	switch (action.type) {



		case "AWAKEN_APPCODE":
			//操作系统状态
			return Object.assign({}, state, {
				appCode: action.payload
			});


		case "AWAKEN_STARTDATE":
			//charts 没有数据的情况
			return Object.assign({}, state, {
				startDate: action.payload
			});


		case "AWAKEN_ENDDATE":
			//charts 没有数据的情况
			return Object.assign({}, state, {
				endDate: action.payload
			});


		case "AWAKEN_LIMIT":
			//charts 没有数据的情况
			return Object.assign({}, state, {
				limit: action.payload
			});

		case "AWAKEN_OFFSET":
			//charts 没有数据的情况
			return Object.assign({}, state, {
				offset: action.payload
			});

		case "AWAKEN_PARAMVALUE":
			//charts 没有数据的情况
			return Object.assign({}, state, {
				paramValue: action.payload
			});

		case "AWAKEN_COLUMNS":
			//charts 没有数据的情况
			return Object.assign({}, state, {
				columns: action.payload
			});
		case "AWAKEN_TABLEDATA":
			//charts 没有数据的情况
			return Object.assign({}, state, {
				tableData: action.payload
			});
		case "AWAKEN_TABLELOADING":
			//charts 没有数据的情况
			return Object.assign({}, state, {
				tableLoading: action.payload
			});
		case "AWAKEN_TOTAL":
			//charts 没有数据的情况
			return Object.assign({}, state, {
				total: action.payload
			});

		case "AWAKEN_EXCELDATA":
			//charts 没有数据的情况
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
	awaken
}