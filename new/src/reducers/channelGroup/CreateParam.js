const CreateParam = (state, action) => {

    if(state === undefined){
        return {
            channelName: "",
            password: "",
            appCode: "",
            channelCategory: "",
            channelTypeId: "",
            isFree: "",
            description: ""
        };
    }
    switch (action.type) {
        //渠道名称
        case "CREATE_GROUP_CHANNELNAME":
            return Object.assign({}, state, {
                channelName: action.payload
            });
        //登录密码
        case "CREATE_GROUP_PASSWORD":
            return Object.assign({}, state, {
                password: action.payload
            });
        case "CREATE_GROUP_APPCODE":
            //操作系统
            return Object.assign({}, state, {
                appCode: action.payload
            });
        case "CREATE_GROUP_CHANNELCATEGORY":
            //线上线下
            return Object.assign({}, state, {
                channelCategory: action.payload
            });
        case "CREATE_GROUP_CHANNELTYPEID":
            //渠道类型
            return Object.assign({}, state, {
                channelTypeId: action.payload
            });
        case "CREATE_GROUP_ISFREE":
            //是否付费
            return Object.assign({}, state, {
                isFree: action.payload
            });
            //描述
        case "CREATE_GROUP_DESCRIPTION":
            return Object.assign({}, state, {
                description: action.payload
            });
        default:
            return state;
    }

};
export { CreateParam };