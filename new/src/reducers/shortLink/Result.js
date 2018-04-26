const Result = (state,action) => {
    if(typeof state == 'undefined'){
        return {
            tableList: [],
            channelTypeList:[],
            channelGroupList:[],
            channelLinkList:[],
            groupList:[],
            offset: 1,
            limit: 10,
            total: 0,
            tableLoading: false,
        };
    }
    switch (action.type) {
        //tableList
        case "SHORTLINK_TABLE":
            return Object.assign({}, state, {
                tableList: action.payload
            });
        case "SHORTLINK_CHANNELTYPELIST":
            return Object.assign({}, state, {
                channelTypeList: action.payload
            });
        case "SHORTLINK_CHANNELGROUPLIST":
            return Object.assign({}, state, {
                channelGroupList: action.payload
            });
        case "SHORTLINK_CHANNELLINKLIST":
            return Object.assign({}, state, {
                channelLinkList: action.payload
            });
        case "SHORTLINK_TABLE_OFFSET":
            return Object.assign({}, state, {
                offset: action.payload
            });
        case "SHORTLINK_TABLE_LIMIT":
            return Object.assign({}, state, {
                limit: action.payload
            });
        case "SHORTLINK_TABLE_LOADING":
            return Object.assign({}, state, {
                tableLoading: action.payload
            });
        case "SHORTLINK_TABLE_TOTAL":
            return Object.assign({}, state, {
                total: action.payload
            });
        case "SHORTLINK_GROUP_LIST":
            return Object.assign({}, state, {
                groupList: action.payload
            });
        default:
            return state;
    }
};

export {
    Result
}