// 日期组件 
import moment from 'moment';

/**
 * 请求参数
 * @method Param
 * @param state {Object} 装态
 * @param action (Object) 动作
 */

const terminalBrand = (state, action) => {
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
			trendType: 1,
			chartsData: [],
			tablesData: [],
			echartLoading: false,
			tableLoading: false,
			chartNoData: false,
			columns: [{
				title: '日期',
				dataIndex: 'day',
				key: 'day',
			}, {
				title: '品牌',
				dataIndex: 'brand',
				key: 'brand',
			}, {
				title: '新增用户',
				dataIndex: 'newUser',
				key: 'newUser'
			}, {
				title: '活跃用户',
				dataIndex: 'activeUser',
				key: 'activeUser'
			}, {
				title: '流失用户',
				dataIndex: 'loseUser',
				key: 'loseUser'
			}],
			excelData: []
		}
	}

	switch (action.type) {

		case "TERMINALBRAND_APPCODE":
			//操作系统状态
			return Object.assign({}, state, {
				appCode: action.payload
			});

		case "TERMINALBRAND_CHANNELCATEGORY":
			//操作系统状态
			return Object.assign({}, state, {
				channelCategory: action.payload
			});

		case "TERMINALBRAND_CHANNELNAME":
			//操作系统状态
			return Object.assign({}, state, {
				channelName: action.payload
			});

		case "TERMINALBRAND_STARTDATE":
			//操作系统状态
			return Object.assign({}, state, {
				startDate: action.payload
			});

		case "TERMINALBRAND_ENDDATE":
			//操作系统状态
			return Object.assign({}, state, {
				endDate: action.payload
			});


		case "TERMINALBRAND_LIMIT":
			//操作系统状态
			return Object.assign({}, state, {
				limit: action.payload
			});

		case "TERMINALBRAND_CHANNELGROUP":
			//操作系统状态
			return Object.assign({}, state, {
				channelGroup: action.payload
			});

		case "TERMINALBRAND_OFFSET":
			//操作系统状态
			return Object.assign({}, state, {
				offset: action.payload
			});

		case "TERMINALBRAND_CHANNELGROUPLIST":
			//操作系统状态
			return Object.assign({}, state, {
				channelGroupList: action.payload
			});

		case "TERMINALBRAND_CHANNELLIST":
			//操作系统状态
			return Object.assign({}, state, {
				channelList: action.payload
			});


		case "TERMINALBRAND_FIRM":
			//操作系统状态
			return Object.assign({}, state, {
				firm: action.payload
			});

		case "TERMINALBRAND_FIRMLIST":
			//操作系统状态
			return Object.assign({}, state, {
				firmList: action.payload
			});

		case "TERMINALBRAND_BRAND":
			//操作系统状态
			return Object.assign({}, state, {
				brand: action.payload
			});

		case "TERMINALBRAND_BRANDLIST":
			//操作系统状态
			return Object.assign({}, state, {
				brandList: action.payload
			});


		case "TERMINALBRAND_TRENDTYPE":
			//操作系统状态
			return Object.assign({}, state, {
				trendType: action.payload
			});

		case "TERMINALBRAND_CHARTSDATA":
			//操作系统状态
			return Object.assign({}, state, {
				chartsData: action.payload
			});


		case "TERMINALBRAND_TABLESDATA":
			//操作系统状态
			return Object.assign({}, state, {
				tablesData: action.payload
			});

		case "TERMINALBRAND_COLUMNS":
			//操作系统状态
			return Object.assign({}, state, {
				columns: action.payload
			});

		case "TERMINALBRAND_ECHARTLOADING":
			//操作系统状态
			return Object.assign({}, state, {
				echartLoading: action.payload
			});


		case "TERMINALBRAND_TABLELOADING":
			//操作系统状态
			return Object.assign({}, state, {
				tableLoading: action.payload
			});

		case "TERMINALBRAND_CHARTNODATA":
			//操作系统状态
			return Object.assign({}, state, {
				chartNoData: action.payload
			});

		case "TERMINALBRAND_EXCELDATA":
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
	terminalBrand
}