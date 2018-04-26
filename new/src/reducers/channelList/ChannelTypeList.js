/**
 * 渠道类型状态
 * @method ChannelTypeList
 * @param state {Object} 状态
 * @param action {Object} 动作
 */


const ChannelTypeList = (state, action) => {
    //初始化
    if (typeof state === "undefined") {
        return {
            channelTypeList: []
        };
    }

    switch (action.type) {
        case "CHANNELLIST_CHANNELTYPELIST":
            return Object.assign({}, state, {
                channelTypeList: action.payload
            });
        default:
            return state;
    }
}

export {
    ChannelTypeList
}