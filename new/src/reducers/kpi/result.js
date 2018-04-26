/**
 * 请求参数
 * @method Param
 * @param state {Object} 装态
 * @param action (Object) 动作
 */
const Result = (state, action) => {
	if (typeof state === "undefined") {
		//初始化
		return {
			chartsResult: [],
			tableResult: [],
			total: 10,
			excelData: []
		};
	}

	switch (action.type) {

		case "KPI_CHARTSRESULT":
			//操作系统状态
			return Object.assign({}, state, {
				chartsResult: action.payload
			});

		case "KPI_TABLERESULT":
			//渠道组
			return Object.assign({}, state, {
				tableResult: action.payload
			});
		case "KPI_TABLETOTAL":
			//渠道组
			return Object.assign({}, state, {
				total: action.payload
			});

		case "KPI_EXCELDATA":
			//渠道组
			return Object.assign({}, state, {
				excelData: action.payload
			});

		default:
			//返回初始化
			return state;

	}
}

export {
	Result
}