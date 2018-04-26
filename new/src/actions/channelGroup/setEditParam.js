
/**
 * 设置Edit参数
 * @method setCreateParam
 * @channel channel 单渠道名称
 */
const setEditParam = (data) => {

    return function (dispatch) {
        console.log('###设置Edit参数###',data);

        if(data.id){
            dispatch({
                type: "EDIT_GROUP_ID",
                payload: data.id
            });
        }
        if(data.channelName){
            dispatch({
                type: "EDIT_GROUP_CHANNELNAME",
                payload: data.channelName
            });
        }

        if(data.channelCategory){
            dispatch({
                type: "EDIT_GROUP_CHANNELCATEGORY",
                payload: data.channelCategory
            });
        }

        if(data.channelTypeId){
            dispatch({
                type: "EDIT_GROUP_CHANNELTYPEID",
                payload: data.channelTypeId
            });
        }

        if(data.description){
            dispatch({
                type: "EDIT_GROUP_DESCRIPTION",
                payload: data.description
            });
        }

        if(data.appCode){
            dispatch({
                type: "EDIT_GROUP_APPCODE",
                payload: data.appCode
            });
        }

        if(data.isFree){
            dispatch({
                type: "EDIT_GROUP_ISFREE",
                payload: data.isFree
            });
        }

        if(data.password){
            dispatch({
                type: "EDIT_GROUP_PASSWORD",
                payload: data.password
            });
        }

    }
}

export {
    setEditParam
}