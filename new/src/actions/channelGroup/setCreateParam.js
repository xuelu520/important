
/**
 * 设置create参数
 * @method setCreateParam
 * @channel channel 单渠道名称
 */
const setCreateParam = (data) => {
    return function (dispatch) {
        console.log('###设置Create参数###',data);

        if(data.channelName){
            dispatch({
                type: "CREATE_GROUP_CHANNELNAME",
                payload: data.channelName
            });
        }

        if(data.channelCategory){
            dispatch({
                type: "CREATE_GROUP_CHANNELCATEGORY",
                payload: data.channelCategory
            });
        }

        if(data.channelTypeId){
            dispatch({
                type: "CREATE_GROUP_CHANNELTYPEID",
                payload: data.channelTypeId
            });
        }

        if(data.description){
            dispatch({
                type: "CREATE_GROUP_DESCRIPTION",
                payload: data.description
            });
        }

        if(data.appCode){
            dispatch({
                type: "CREATE_GROUP_APPCODE",
                payload: data.appCode
            });
        }

        if(data.isFree){
            dispatch({
                type: "CREATE_GROUP_ISFREE",
                payload: data.isFree
            });
        }

        if(data.password){
            dispatch({
                type: "CREATE_GROUP_PASSWORD",
                payload: data.password
            });
        }

    }
}

export {
    setCreateParam
}