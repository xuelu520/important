// 日期组件 
import moment from 'moment';
/**
 * 请求参数
 * @method Param
 * @param state {Object} 装态
 * @param action (Object) 动作
 */
const userCompose = (state, action) => {
	if (typeof state === "undefined") {

		//初始化
		return {
			appCode: "",
			channelCategory: "",
			channelGroup: "",
			channelName: "",
			startDate: moment().subtract(15, 'days').format("YYYY-MM-DD"),
			endDate: moment().subtract(1, 'days').format("YYYY-MM-DD"),
			maxDate: moment().subtract(1, 'days').format("YYYY-MM-DD"),
			limit: 10,
			offset: 1,
			type: 1,
			tableLoading: false,
			chartsLoading: false,
			columns: [{
				title: '日期',
				dataIndex: 'day',
				key: 'day',
			}, {
				title: 'MTD MAU',
				dataIndex: 'mtdMau',
				key: 'mtdMau',
			}, {
				title: '上月MAU',
				dataIndex: 'lmMau',
				key: 'lmMau',
			}, {
				title: '本月新增',
				dataIndex: 'mtdMnu',
				key: 'mtdMnu'
			}, {
				title: '上月新增本月回访',
				dataIndex: 'maLmn',
				key: 'maLmn'
			}, {
				title: '上上月活跃上月活跃本月回访',
				dataIndex: 'maLta',
				key: 'maLta'
			}, {
				title: '历史活跃上月活跃本月回访',
				dataIndex: 'maLha',
				key: 'maLha'
			}, {
				title: '历史活跃本月回访',
				dataIndex: 'maHa',
				key: 'maHa'
			}],
			groupList: [],
			chartsNoData: false,
			chartsData: [],
			tableData: [],
			total: 1,
			excelData: []

		};
	}

	switch (action.type) {
		case "USERCOMPOSE_APPCODE":
			//操作系统状态
			return Object.assign({}, state, {
				appCode: action.payload
			});

		case "USERCOMPOSE_CHANNELCATEGORY":
			//操作系统状态
			return Object.assign({}, state, {
				channelCategory: action.payload
			});

		case "USERCOMPOSE_CHANNELGROUP":
			//操作系统状态
			return Object.assign({}, state, {
				channelGroup: action.payload
			});

		case "USERCOMPOSE_CHANNELNAME":
			//操作系统状态
			return Object.assign({}, state, {
				channelName: action.payload
			});

		case "USERCOMPOSE_ENDDATE":
			//操作系统状态
			return Object.assign({}, state, {
				endDate: action.payload
			});

		case "USERCOMPOSE_STARTDATE":
			//操作系统状态
			return Object.assign({}, state, {
				startDate: action.payload
			});

		case "USERCOMPOSE_LIMIT":
			//操作系统状态
			return Object.assign({}, state, {
				limit: action.payload
			});

		case "USERCOMPOSE_OFFSET":
			//操作系统状态
			return Object.assign({}, state, {
				offset: action.payload
			});
		case "USERCOMPOSE_TYPE":
			//操作系统状态
			return Object.assign({}, state, {
				type: action.payload
			});

		case "USERCOMPOSE_TABLELOADING":
			//操作系统状态
			return Object.assign({}, state, {
				tableLoading: action.payload
			});

		case "USERCOMPOSE_CHARTSLOADING":
			//操作系统状态
			return Object.assign({}, state, {
				chartsLoading: action.payload
			});

		case "USERCOMPOSE_COLUMNS":
			//操作系统状态
			return Object.assign({}, state, {
				columns: action.payload
			});

		case "USERCOMPOSE_GROUPLIST":
			//操作系统状态
			return Object.assign({}, state, {
				groupList: action.payload
			});

		case "USERCOMPOSE_CHARTSNODATA":
			//操作系统状态
			return Object.assign({}, state, {
				chartsNoData: action.payload
			});

		case "USERCOMPOSE_CHARTSDATA":
			//操作系统状态
			return Object.assign({}, state, {
				chartsData: action.payload
			});

		case "USERCOMPOSE_TABLEDATA":
			//操作系统状态
			return Object.assign({}, state, {
				tableData: action.payload
			});
		case "USERCOMPOSE_TOTAL":
			//操作系统状态
			return Object.assign({}, state, {
				total: action.payload
			});

		case "USERCOMPOSE_EXCELDATA":
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
	userCompose
}