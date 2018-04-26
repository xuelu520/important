const CreateParam = (state, action) => {

    if(typeof state == 'undefined'){
        return {
            channelName: '',
            password: '',
            appCode: '',
            channelCategory: '',
            channelTypeId: '',
            isFree: '',
            description: '',
            channelGroup: '',
            channelGroupId: ''
        };
    }
    switch (action.type) {
        //channelName
        case "SHORTLINK_CREATE_CHANNELNAME":
            return Object.assign({}, state, {
                channelName: action.payload
            });
        case "SHORTLINK_CREATE_PASSWORD":
            return Object.assign({}, state, {
                password: action.payload
            });
        case "SHORTLINK_CREATE_APPCODE":
            return Object.assign({}, state, {
                appCode: action.payload
            });
        case "SHORTLINK_CREATE_CHANNELCATEGORY":
            return Object.assign({}, state, {
                channelCategory: action.payload
            });
        case "SHORTLINK_CREATE_CHANNELTYPEID":
            return Object.assign({}, state, {
                channelTypeId: action.payload
            });
        case "SHORTLINK_CREATE_ISFREE":
            return Object.assign({}, state, {
                isFree: action.payload
            });
        case "SHORTLINK_CREATE_DESCRIPTION":
            return Object.assign({}, state, {
                description: action.payload
            });
        case "SHORTLINK_CREATE_CHANNELGROUP":
            return Object.assign({}, state, {
                channelGroup: action.payload
            });
        case "SHORTLINK_CREATE_CHANNELGROUPID":
            return Object.assign({}, state, {
                channelGroupId: action.payload
            });
        default:
            return state;
    }
};

export {
    CreateParam
}