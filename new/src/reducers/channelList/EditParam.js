const EditParam = (state, action) => {

    if(state === undefined){
        return {
            id: "",
            channelName: "",
            password: "",
            appCode: "",
            channelCategory: "",
            channelTypeId: "",
            channelType: "",
            channelDescribe: "",
            isFree: "",
            description: "",
            channelGroupId: "",
            channelGroup: "",
            showCol: "",
            reduce: ""
        };
    }
    switch (action.type) {
        //id
        case "EDIT_ID":
            return Object.assign({}, state, {
                id: action.payload
            });
        //渠道名称
        case "EDIT_CHANNELNAME":
            return Object.assign({}, state, {
                channelName: action.payload
            });
        //登录密码
        case "EDIT_PASSWORD":
            return Object.assign({}, state, {
                password: action.payload
            });
        //渠道组id
        case "EDIT_CHANNELGROUPID":
            return Object.assign({}, state, {
                channelGroupId: action.payload
            });
        //渠道组
        case "EDIT_CHANNELGROUP":
            return Object.assign({}, state, {
                channelGroup: action.payload
            });
        case "EDIT_APPCODE":
            //操作系统
            return Object.assign({}, state, {
                appCode: action.payload
            });
        case "EDIT_CHANNELCATEGORY":
            //线上线下
            return Object.assign({}, state, {
                channelCategory: action.payload
            });
            
        case "EDIT_CHANNELTYPEID":
            //渠道类型
            return Object.assign({}, state, {
                channelTypeId: action.payload
            });
        case "EDIT_CHANNELTYPE":
            //渠道类型
            return Object.assign({}, state, {
                channelType: action.payload
            });
        case "EDIT_CHANNELDESCRIBE":
            //渠道类型
            return Object.assign({}, state, {
                channelDescribe: action.payload
            });
        case "EDIT_ISFREE":
            //是否付费
            return Object.assign({}, state, {
                isFree: action.payload
            });
            //描述
        case "EDIT_DESCRIPTION":
            return Object.assign({}, state, {
                description: action.payload
            });
            //健康度
        case "EDIT_SHOWCOL":
            return Object.assign({}, state, {
                showCol: action.payload
            });
            //扣量系数
        case "EDIT_REDUCE":
            return Object.assign({},state,{
                reduce: action.payload
            })
        default:
            return state;
    }

};
export { EditParam };