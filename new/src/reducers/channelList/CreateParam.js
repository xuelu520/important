const CreateParam = (state, action) => {

    if(state === undefined){
        return {
            channelName: "",
            password: "",
            appCode: "",
            channelCategory: "",
            channelType: "",
            channelTypeId: "",
            isFree: "",
            description: "",
            channelGroupId: "",
            channelGroup: "",
            showCol: ""
        };
    }
    switch (action.type) {
        //渠道名称
        case "CREATE_CHANNELNAME":
            return Object.assign({}, state, {
                channelName: action.payload
            });
        //登录密码
        case "CREATE_PASSWORD":
            return Object.assign({}, state, {
                password: action.payload
            });
        //渠道组id
        case "CREATE_CHANNELGROUPID":
            return Object.assign({}, state, {
                channelGroupId: action.payload
            });
        //渠道组
        case "CREATE_CHANNELGROUP":
            return Object.assign({}, state, {
                channelGroup: action.payload
            });
        case "CREATE_APPCODE":
            //操作系统
            return Object.assign({}, state, {
                appCode: action.payload
            });
        case "CREATE_CHANNELCATEGORY":
            //线上线下
            return Object.assign({}, state, {
                channelCategory: action.payload
            });
        case "CREATE_CHANNELTYPE":
            //渠道类型
            return Object.assign({}, state, {
                channelType: action.payload
            });
        case "CREATE_CHANNELTYPEID":
            //渠道类型
            return Object.assign({}, state, {
                channelTypeId: action.payload
            });
        case "CREATE_ISFREE":
            //是否付费
            return Object.assign({}, state, {
                isFree: action.payload
            });
        case "CREATE_DESCRIPTION":
            return Object.assign({}, state, {
                description: action.payload
            });
        case "CREATE_SHOWCOL":
            return Object.assign({}, state, {
                showCol: action.payload
            });
        default:
            return state;
    }

};
export { CreateParam };