/**
 * GroupList状态
 * @method GroupList
 * @param state {Object} 状态
 * @param action {Object} 动作
 */


const GroupList = (state, action) => {
    //初始化
    if (typeof state === "undefined") {
        return {
            groupList: []
        };
    }

    switch (action.type) {
        case "CHANNELLIST_GROUPLIST":
            return Object.assign({}, state, {
                groupList: action.payload
            });
        default:
            return state;
    }
}

export {
    GroupList
}