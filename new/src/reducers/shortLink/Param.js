const Param = (state,action) => {
    if(typeof state == 'undefined'){
        return {
            appCode: '',
            channelCategory: '',
            channelTypeId: '',
            channelGroup: '',
            channelName: ''
        };
    }
    switch (action.type) {
        //appCode状态
        case "SHORTLINK_APPCODE":
            return Object.assign({}, state, {
                appCode: action.payload
            });
        case "SHORTLINK_CHANNELCATEGORY":
            return Object.assign({}, state, {
                channelCategory: action.payload
            });
        case "SHORTLINK_CHANNELTYPEID":
            return Object.assign({}, state, {
                channelTypeId: action.payload
            });
        case "SHORTLINK_CHANNELGROUP":
            return Object.assign({}, state, {
                channelGroup: action.payload
            });
        case "SHORTLINK_CHANNELNAME":
            return Object.assign({}, state, {
                channelName: action.payload
            });
        default:
            return state;
    }
};

export {
    Param
}