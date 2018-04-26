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
            appCode: "24",
            channelCategory: "",
            channelTypeId: ""
        };
    }

    switch (action.type) {

        case "CHANNELGROUP_APPCODE":
            //操作系统状态
            return Object.assign({}, state, {
                appCode: action.payload
            });

        case "CHANNELGROUP_CHANNELCATEGORY":
            //线上、线下
            return Object.assign({}, state, {
                channelCategory: action.payload
            });

        case "CHANNELGROUP_CHANNELTYPEID":
            //渠道类型
            return Object.assign({}, state, {
                channelTypeId: action.payload
            });
        default:
            //返回初始化
            return state;
    }

}


export {
    Param
}