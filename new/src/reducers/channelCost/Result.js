const Result = (state,action) => {
    if(typeof state == 'undefined'){
        return {
            tableList: [],
            channelGroupList:[],
            channelList:[],
            offset: 1,
            limit: 10,
            total: 0,
            tableLoading: false,
        };
    }
    switch (action.type) {
        case "CHANNELCOST_TABLE":
            return Object.assign({}, state, {
                tableList: action.payload
            });
        case "CHANNELCOST_CHANNELGROUPLIST":
            return Object.assign({}, state, {
                channelGroupList: action.payload
            });
        case "CHANNELCOST_CHANNELLIST":
            return Object.assign({}, state, {
                channelList: action.payload
            });
        case "CHANNELCOST_TOTAL":
            return Object.assign({}, state, {
                total: action.payload
            });
        case "CHANNELCOST_OFFSET":
            return Object.assign({}, state, {
                offset: action.payload
            });
        case "CHANNELCOST_LIMIT":
            return Object.assign({}, state, {
                limit: action.payload
            });
        case "CHANNELCOST_LOADING":
            return Object.assign({}, state, {
                tableLoading: action.payload
            });
        default:
            return state;
    }
};

export {
    Result
}