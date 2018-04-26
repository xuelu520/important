const EditParam = (state, action) => {

    if(state === undefined){
        return {
            channelName: "",
            password: "",
            appCode: "",
            channelCategory: "",
            channelTypeId: "",
            isFree: "",
            description: "",
            id:""
        };
    }
    switch (action.type) {
        //当前id
        case "EDIT_GROUP_ID":
            return Object.assign({}, state, {
                id: action.payload
            });
        //渠道名称
        case "EDIT_GROUP_CHANNELNAME":
            return Object.assign({}, state, {
                channelName: action.payload
            });
        //登录密码
        case "EDIT_GROUP_PASSWORD":
            return Object.assign({}, state, {
                password: action.payload
            });
        case "EDIT_GROUP_APPCODE":
            //操作系统
            return Object.assign({}, state, {
                appCode: action.payload
            });
        case "EDIT_GROUP_CHANNELCATEGORY":
            //线上线下
            return Object.assign({}, state, {
                channelCategory: action.payload
            });
        case "EDIT_GROUP_CHANNELTYPEID":
            //渠道类型
            return Object.assign({}, state, {
                channelTypeId: action.payload
            });
        case "EDIT_GROUP_ISFREE":
            //是否付费
            return Object.assign({}, state, {
                isFree: action.payload
            });
        //描述
        case "EDIT_GROUP_DESCRIPTION":
            return Object.assign({}, state, {
                description: action.payload
            });
        default:
            return state;
    }

};
export { EditParam };