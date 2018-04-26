
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
                type: "EDIT_ID",
                payload: data.id
            });
        }
        if(data.channelName){
            dispatch({
                type: "EDIT_CHANNELNAME",
                payload: data.channelName
            });
        }
        if(data.password){
            dispatch({
                type: "EDIT_PASSWORD",
                payload: data.password
            });
        }
        if(data.channelGroupId){
            dispatch({
                type: "EDIT_CHANNELGROUPID",
                payload: data.channelGroupId
            });
        }
        if(data.channelGroup){
            dispatch({
                type: "EDIT_CHANNELGROUP",
                payload: data.channelGroup
            });
        }
        if(data.appCode){
            dispatch({
                type: "EDIT_APPCODE",
                payload: data.appCode
            });
        }
        if(data.channelCategory){
            dispatch({
                type: "EDIT_CHANNELCATEGORY",
                payload: data.channelCategory
            });
        }
        if(data.channelTypeId){
            dispatch({
                type: "EDIT_CHANNELTYPE",
                payload: data.channelTypeId
            });
        }
        if(data.channelDescribe){
            dispatch({
                type: "EDIT_CHANNELDESCRIBE",
                payload: data.channelDescribe
            });
        }
        if(data.isFree){
            dispatch({
                type: "EDIT_ISFREE",
                payload: data.isFree
            });
        }
        if(data.description){
            dispatch({
                type: "EDIT_DESCRIPTION",
                payload: data.description
            });
        }

        if(data.showCol){
            dispatch({
                type: "EDIT_SHOWCOL",
                payload: data.showCol
            });
        }
        if(data.reduce){
            dispatch({
                type: "EDIT_REDUCE",
                payload: data.reduce
            });
        }
    }
}

export {
    setEditParam
}