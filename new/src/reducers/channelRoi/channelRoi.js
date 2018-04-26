// 日期组件 
import moment from 'moment';
/**
 * 请求参数
 * @method Param
 * @param state {Object} 装态
 * @param action (Object) 动作
 */
const channelRoi = (state, action) => {
	if (typeof state === "undefined") {
		//初始化
		return {
			appCode: "",
			channelName: "",
			startDate: moment().subtract(38, 'days').format("YYYY-MM-DD"),
			endDate: moment().subtract(8, 'days').format("YYYY-MM-DD"),
			maxDate: moment().subtract(8, 'days').format("YYYY-MM-DD"),
			offset: 1,
			limit: 10,
			channelList: [],
			columns: [{
				title: '日期',
				dataIndex: 'day',
				key: 'day',
			}, {
				title: '渠道名称',
				dataIndex: 'channelName',
				key: 'channelName',
			}, {
				title: '全量新增用户',
				dataIndex: 'newUser',
				key: 'newUser'
			}, {
				title: '激活单价（元）',
				dataIndex: 'unitPrice',
				key: 'unitPrice'
			}, {
				title: '人均广告收入（元）',
				dataIndex: 'adIncome',
				key: 'adIncome'
			}, {
				title: 'ROI',
				dataIndex: 'roi',
				key: 'roi'
			}],
			tableData: [],
			chartsData: [],
			chartsNoData: false,
			tablesLoading: false,
			chartsLoading: false,
			total: 1,
			excelData: []
		};
	}


	switch (action.type) {

		case "CHANNELROI_APPCODE":
			//操作系统状态
			return Object.assign({}, state, {
				appCode: action.payload
			});

		case "CHANNELROI_TOTAL":
			//操作系统状态
			return Object.assign({}, state, {
				total: action.payload
			});

		case "CHANNELROI_CHANNELNAME":
			//操作系统状态
			return Object.assign({}, state, {
				channelName: action.payload
			});

		case "CHANNELROI_ENDDATE":
			//操作系统状态
			return Object.assign({}, state, {
				endDate: action.payload
			});

		case "CHANNELROI_STARTDATE":
			//操作系统状态
			return Object.assign({}, state, {
				startDate: action.payload
			});


		case "CHANNELROI_OFFSET":
			//操作系统状态
			return Object.assign({}, state, {
				offset: action.payload
			});

		case "CHANNELROI_LIMIT":
			//操作系统状态
			return Object.assign({}, state, {
				limit: action.payload
			});

		case "CHANNELROI_COLUMNS":
			//操作系统状态
			return Object.assign({}, state, {
				columns: action.payload
			});

		case "CHANNELROI_TABLEDATA":
			//操作系统状态
			return Object.assign({}, state, {
				tableData: action.payload
			});

		case "CHANNELROI_CHARTSDATA":
			//操作系统状态
			return Object.assign({}, state, {
				chartsData: action.payload
			});

		case "CHANNELROI_TABLESLOADING":
			//操作系统状态
			return Object.assign({}, state, {
				tablesLoading: action.payload
			});

		case "CHANNELROI_CHARTSLOADING":
			//操作系统状态
			return Object.assign({}, state, {
				chartsLoading: action.payload
			});

		case "CHANNELROI_CHANNELIST":
			//操作系统状态
			return Object.assign({}, state, {
				channelList: action.payload
			});
			// channelList
		case "CHANNELROI_EXCELDATA":
			//操作系统状态
			return Object.assign({}, state, {
				excelData: action.payload
			});

		case "CHANNELROI_CHARTSNODATA":
			//操作系统状态
			return Object.assign({}, state, {
				chartsNoData: action.payload
			});

		default:
			//返回初始化
			return state;
	}
}

export {
	channelRoi
}