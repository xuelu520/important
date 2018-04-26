 /**
  * 图表tab切换
  * @method ClickTab 
  * @param state {Object} 状态
  * @param action {Object} 动作
  */


 const ClickTab = (state, action) => {
 	//初始化
 	if (typeof state === "undefined") {
 		return {
 			clickTab: "1",
 			legendName: "全部"
 		};
 	}


 	switch (action.type) {
 		case "PROFILELIST_CLICKTAB":
 			return Object.assign({}, state, {
 				clickTab: action.payload
 			});

 		case "PROFILELIST_LEGENDNAME":
 			return Object.assign({}, state, {
 				legendName: action.payload
 			});
 		default:
 			return state;
 	}
 }

 export {
 	ClickTab
 }