import React from 'react';
// 日期组件 
import moment from 'moment';

/**
 * 请求参数
 * @method Param
 * @param state {Object} 装态
 * @param action (Object) 动作
 */
const Param = (state, action) => {
	if (typeof state === "undefined") {
		//初始化
		return {
			channelGroup: "",
			dateType: 1,
			endDate: moment().subtract(1, 'days').format("YYYY-MM-DD"),
			startDate: moment().subtract(60, 'days').format("YYYY-MM-DD"),
			maxDate: moment().subtract(1, 'days').format("YYYY-MM-DD"),
			offset: 1,
			limit: 10,
			tab: 1,
			tableLoading: false,
			chartLoading: false,
			groupList: [],
			chartsNoData: false,

			columns: [{
				title: '日期',
				dataIndex: 'day',
				key: 'day',
			}, {
				title: '新增用户',
				dataIndex: 'newUser',
				key: 'newUser',
			}, {
				title: '付费新增',
				dataIndex: 'feeUser',
				key: 'feeUser'
			}, {
				title: '免费新增',
				dataIndex: 'freeUser',
				key: 'freeUser'
			}, {
				title: '用户质量',
				dataIndex: 'qualityPer',
				key: 'qualityPer',
				render: (text) => (<span> {(Number(text) * 100).toFixed(2) + '%'} </span>)
			}, {
				title: '次日留存率',
				dataIndex: 'dayLeftRate',
				key: 'dayLeftRate',
				render: (text) => (<span> {(Number(text) * 100).toFixed(2) + '%'} </span>)
			}, {
				title: '7日留存率',
				dataIndex: 'sevenLeftRate',
				key: 'sevenLeftRate',
				render: (text) => (<span> {(Number(text) * 100).toFixed(2) + '%'} </span>)
			}],
			channelGroupResultName: "",
		};
	}

	switch (action.type) {

		case "KPI_CHANNELGROUP":
			//操作系统状态
			return Object.assign({}, state, {
				channelGroup: action.payload
			});

		case "KPI_DATETYPE":
			//渠道组
			return Object.assign({}, state, {
				dateType: action.payload
			});

		case "KPI_STARTDATE":
			//搜索渠道
			return Object.assign({}, state, {
				startDate: action.payload
			});
		case "KPI_ENTDATE":
			//搜索渠道
			return Object.assign({}, state, {
				endDate: action.payload
			});

		case "KPI_OFFSET":
			//搜索渠道
			return Object.assign({}, state, {
				offset: action.payload
			});
		case "KPI_LIMIT":
			//搜索渠道
			return Object.assign({}, state, {
				limit: action.payload
			});
		case "KPI_TAB":
			//搜索渠道
			return Object.assign({}, state, {
				tab: action.payload
			});
		case "KPI_TABLE_LOADING":
			//搜索渠道
			return Object.assign({}, state, {
				tableLoading: action.payload
			});
		case "KPI_CHART_LOADING":
			//搜索渠道
			return Object.assign({}, state, {
				chartLoading: action.payload
			});
		case "KPI_GROUPLIST":
			//搜索渠道
			return Object.assign({}, state, {
				groupList: action.payload
			});
		case "KPI_CHARTS_NODATA":
			//charts 没有数据的情况
			return Object.assign({}, state, {
				chartsNoData: action.payload
			});

		case "KPI_CHARTS_CHANNELGROUPRESULTNAME":
			//charts 没有数据的情况
			return Object.assign({}, state, {
				channelGroupResultName: action.payload
			});


		default:
			//返回初始化
			return state;
	}
}

export {
	Param
}