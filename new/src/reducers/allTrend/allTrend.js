// 日期组件 
import moment from 'moment';
/**
 * 请求参数
 * @method Param
 * @param state {Object} 装态
 * @param action (Object) 动作
 */
const allTrend = (state, action) => {
	if (typeof state === "undefined") {
		//初始化
		return {
			appCode: "",
			channelCategory: "",
			top: 10,
			startDate: moment().subtract(30, 'days').format("YYYY-MM-DD"),
			endDate: moment().subtract(1, 'days').format("YYYY-MM-DD"),
			maxDate: moment().subtract(1, 'days').format("YYYY-MM-DD"),
			tab: 1,
			chartsResult1: [],
			chartsResult2: [],
			chartsResult3: [],
			chartsResultNoData1: false,
			chartsResultNoData2: false,
			chartsResultNoData3: false,
			columns1: [{
				title: '日期',
				dataIndex: 'day',
				key: 'day',
			}, {
				title: '渠道组名称',
				dataIndex: 'channelGroup',
				key: 'channelGroup',
			}, {
				title: '新增用户',
				dataIndex: 'newUser',
				key: 'newUser'
			}],
			columns2: [{
				title: '日期',
				dataIndex: 'day',
				key: 'day',
			}, {
				title: '渠道组名称',
				dataIndex: 'channelGroup',
				key: 'channelGroup',
			}, {
				title: '新增用户',
				dataIndex: 'newUser',
				key: 'newUser'
			}, {
				title: '次日留存率',
				dataIndex: 'dayLeftRate',
				key: 'dayLeftRate'
			}],
			columns3: [{
				title: '日期',
				dataIndex: 'day',
				key: 'day',
			}, {
				title: '渠道组名称',
				dataIndex: 'channelGroup',
				key: 'channelGroup',
			}, {
				title: '新增用户',
				dataIndex: 'newUser',
				key: 'newUser'
			}, {
				title: '7日留存率',
				dataIndex: 'sevenLeftRate',
				key: 'sevenLeftRate'
			}],

			chartsLoading1: false,
			chartsLoading2: false,
			chartsLoading3: false,
			tableData1: [],
			tableData2: [],
			tableData3: [],
			excelData1: [],
			excelData2: [],
			excelData3: []
		};
	}



	switch (action.type) {

		case "ALLTREND_APPCODE":
			//操作系统状态
			return Object.assign({}, state, {
				appCode: action.payload
			});


		case "ALLTREND_CHANNELCATEGORY":
			//操作系统状态
			return Object.assign({}, state, {
				channelCategory: action.payload
			});


		case "ALLTREND_TOP":
			//操作系统状态
			return Object.assign({}, state, {
				top: action.payload
			});

		case "ALLTREND_STARTDATE":
			//操作系统状态
			return Object.assign({}, state, {
				startDate: action.payload
			});

		case "ALLTREND_ENDDATE":
			//操作系统状态
			return Object.assign({}, state, {
				endDate: action.payload
			});


		case "ALLTREND_TAB":
			//操作系统状态
			return Object.assign({}, state, {
				tab: action.payload
			});

		case "ALLTREND_CHARTSLOADING1":
			//操作系统状态
			return Object.assign({}, state, {
				chartsLoading1: action.payload
			});

		case "ALLTREND_CHARTSLOADING2":
			//操作系统状态
			return Object.assign({}, state, {
				chartsLoading2: action.payload
			});
		case "ALLTREND_CHARTSLOADING3":
			//操作系统状态
			return Object.assign({}, state, {
				chartsLoading3: action.payload
			});

		case "ALLTREND_TABLEDATA1":
			//操作系统状态
			return Object.assign({}, state, {
				tableData1: action.payload
			});


		case "ALLTREND_TABLEDATA2":
			//操作系统状态
			return Object.assign({}, state, {
				tableData2: action.payload
			});


		case "ALLTREND_TABLEDATA3":
			//操作系统状态
			return Object.assign({}, state, {
				tableData3: action.payload
			});

		case "ALLTREND_CHARTSRESULT1":
			//操作系统状态
			return Object.assign({}, state, {
				chartsResult1: action.payload
			});

		case "ALLTREND_CHARTSRESULT2":
			//操作系统状态
			return Object.assign({}, state, {
				chartsResult2: action.payload
			});

		case "ALLTREND_CHARTSRESULT3":
			//操作系统状态
			return Object.assign({}, state, {
				chartsResult3: action.payload
			});


		case "ALLTREND_CHARTSRESULTNODATA1":
			//操作系统状态
			return Object.assign({}, state, {
				chartsResultNoData1: action.payload
			});

		case "ALLTREND_CHARTSRESULTNODATA2":
			//操作系统状态
			return Object.assign({}, state, {
				chartsResultNoData2: action.payload
			});

		case "ALLTREND_CHARTSRESULTNODATA3":
			//操作系统状态
			return Object.assign({}, state, {
				chartsResultNoData3: action.payload
			});


		case "ALLTREND_EXCELDATA1":
			//操作系统状态
			return Object.assign({}, state, {
				excelData1: action.payload
			});

		case "ALLTREND_EXCELDATA2":
			//操作系统状态
			return Object.assign({}, state, {
				excelData2: action.payload
			});

		case "ALLTREND_EXCELDATA3":
			//操作系统状态
			return Object.assign({}, state, {
				excelData3: action.payload
			});

		case "ALLTREND_COLUMNS1":
			//操作系统状态
			return Object.assign({}, state, {
				columns1: action.payload
			});
		case "ALLTREND_COLUMNS2":
			//操作系统状态
			return Object.assign({}, state, {
				columns2: action.payload
			});

			// columns1



		default:
			//返回初始化
			return state;
	}
}

export {
	allTrend
}