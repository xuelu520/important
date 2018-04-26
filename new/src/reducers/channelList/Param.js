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
            channelTypeId: "",
            channelGroupId: "",
            channelName: ""
        };
    }

    switch (action.type) {

        case "CHANNELLIST_APPCODE":
            //操作系统状态
            return Object.assign({}, state, {
                appCode: action.payload
            });

        case "CHANNELLIST_CHANNELCATEGORY":
            //线上、线下
            return Object.assign({}, state, {
                channelCategory: action.payload
            });

        case "CHANNELLIST_CHANNELTYPE":
            //渠道类型
            return Object.assign({}, state, {
                channelTypeId: action.payload
            });

        case "CHANNELLIST_CHANNELGROUP":
            //渠道组
            return Object.assign({}, state, {
                channelGroupId: action.payload
            });

        case "CHANNELLIST_CHANNELNAME":
            //搜索渠道
            return Object.assign({}, state, {
                channelName: action.payload
            });

        default:
            //返回初始化
            return state;
    }

}


export {
    Param
}