
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
                type: "CREATE_CHANNELNAME",
                payload: data.channelName
            });
        }
        if(data.password){
            dispatch({
                type: "CREATE_PASSWORD",
                payload: data.password
            });
        }
        if(data.description){
            dispatch({
                type: "CREATE_DESCRIPTION",
                payload: data.description
            });
        }
        if(data.showCol){
            dispatch({
                type: "CREATE_SHOWCOL",
                payload: data.showCol
            });
        }
        if(data.channelGroup){
            dispatch({
                type: "CREATE_CHANNELGROUP",
                payload: data.channelGroup
            });
        }
        if(data.channelGroupId){
            dispatch({
                type: "CREATE_CHANNELGROUPID",
                payload: data.channelGroupId
            });
        }
    }
}

export {
    setCreateParam
}