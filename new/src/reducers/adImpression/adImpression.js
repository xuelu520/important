// 日期组件 
import moment from 'moment';
/**
 * 请求参数
 * @method Param
 * @param state {Object} 装态
 * @param action (Object) 动作
 */
const adImpression = (state, action) => {
	if (typeof state === "undefined") {
		//初始化
		return {
			appCode: "",
			channelCategory: "",
			channelName: "",
			// startDate: moment().subtract(30, 'days').format("YYYY-MM-DD"),
			// endDate: moment().subtract(1, 'days').format("YYYY-MM-DD"),
			startDate: moment().subtract(38, 'days').format("YYYY-MM-DD"),
			endDate: moment().subtract(8, 'days').format("YYYY-MM-DD"),
			maxDate: moment().subtract(8, 'days').format("YYYY-MM-DD"),
			limit: 10,
			channelGroup: "",
			offset: 1,
			channelGroupList: [],
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
				title: '全量新增用户激活单价（元）',
				dataIndex: 'newUser',
				key: 'newUser'
			}, {
				title: '次日人均广告曝光',
				dataIndex: 'expo1',
				key: 'expo1'
			}, {
				title: '2日人均广告曝光',
				dataIndex: 'expo2',
				key: 'expo2'
			}, {
				title: '3日人均广告曝光 ',
				dataIndex: 'expo3',
				key: 'expo3'
			}, {
				title: '4日人均广告曝光',
				dataIndex: 'expo4',
				key: 'expo4'
			}, {
				title: '5日人均广告曝光',
				dataIndex: 'expo5',
				key: 'expo5'
			}, {
				title: '6日人均广告曝光',
				dataIndex: 'expo6',
				key: 'expo6'
			}, {
				title: '7日人均广告曝光',
				dataIndex: 'expo7',
				key: 'expo7'
			}, {
				title: '60日内人均广告曝光',
				dataIndex: 'expo60',
				key: 'expo60'
			}, {
				title: '60日内人均广告曝光/激活单价',
				dataIndex: 'roi',
				key: 'roi',
				fixed: 'right',
				width: 137
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

		case "ADIMPRESSION_APPCODE":
			//操作系统状态
			return Object.assign({}, state, {
				appCode: action.payload
			});

		case "ADIMPRESSION_CHANNELCATEGORY":
			//操作系统状态
			return Object.assign({}, state, {
				channelCategory: action.payload
			});

		case "ADIMPRESSION_CHANNELNAME":
			//操作系统状态
			return Object.assign({}, state, {
				channelName: action.payload
			});

		case "ADIMPRESSION_STARTDATE":
			//操作系统状态
			return Object.assign({}, state, {
				startDate: action.payload
			});

		case "ADIMPRESSION_ENDDATE":
			//操作系统状态
			return Object.assign({}, state, {
				endDate: action.payload
			});

		case "ADIMPRESSION_LIMIT":
			//操作系统状态
			return Object.assign({}, state, {
				limit: action.payload
			});
		case "ADIMPRESSION_CHANNELGROUP":
			//操作系统状态
			return Object.assign({}, state, {
				channelGroup: action.payload
			});

		case "ADIMPRESSION_OFFSET":
			//操作系统状态
			return Object.assign({}, state, {
				offset: action.payload
			});

		case "ADIMPRESSION_COLUMNS":
			//操作系统状态
			return Object.assign({}, state, {
				columns: action.payload
			});

		case "ADIMPRESSION_TABLEDATA":
			//操作系统状态
			return Object.assign({}, state, {
				tableData: action.payload
			});

		case "ADIMPRESSION_CHARTSDATA":
			//操作系统状态
			return Object.assign({}, state, {
				chartsData: action.payload
			});

		case "ADIMPRESSION_CHARTSNODATA":
			//操作系统状态
			return Object.assign({}, state, {
				chartsNoData: action.payload
			});

		case "ADIMPRESSION_TABLESLOADING":
			//操作系统状态
			return Object.assign({}, state, {
				tablesLoading: action.payload
			});

		case "ADIMPRESSION_CHARTSLOADING":
			//操作系统状态
			return Object.assign({}, state, {
				chartsLoading: action.payload
			});


		case "ADIMPRESSION_CHANNELGROUPLIST":
			//操作系统状态
			return Object.assign({}, state, {
				channelGroupList: action.payload
			});

		case "ADIMPRESSION_CHANNELLIST":
			//操作系统状态
			return Object.assign({}, state, {
				channelList: action.payload
			});

		case "ADIMPRESSION_TOTAL":
			//操作系统状态
			return Object.assign({}, state, {
				total: action.payload
			});

		case "ADIMPRESSION_EXCELDATA":
			//操作系统状态
			return Object.assign({}, state, {
				excelData: action.payload
			});

			// excelData

		default:
			//返回初始化
			return state;
	}
}

export {
	adImpression
}