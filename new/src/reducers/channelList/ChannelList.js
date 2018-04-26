/**
 * 渠道列表状态
 * @method ChannelList
 * @param state {Object} 状态
 * @param action {Object} 动作
 */


const ChannelList = (state, action) => {
    //初始化
    if (typeof state === "undefined") {
        return {
            channelList: []
        };
    }

    switch (action.type) {
        case "CHANNELLIST_CHANNELLIST":
            return Object.assign({}, state, {
                channelList: action.payload
            });
        default:
            return state;
    }
}

export {
    ChannelList
}