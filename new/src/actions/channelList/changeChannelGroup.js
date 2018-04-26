import {getChannelList} from "./getChannelList";

/**
 * 切换渠道组
 * @method changeChannelGroup
 * @param param {Object} 参数
 * @param id {String} 参数
 * @return {Function}
 */
const changeChannelGroup = (data) => {

    return function(dispatch) {

        //切换渠道组
        dispatch({
            type: "CHANNELLIST_CHANNELGROUP",
            payload: data.channelGroupId
        });

        //重置渠道
        dispatch({
            type: "CHANNELLIST_CHANNELNAME",
            payload: data.channelName
        });

        //获取渠道列表
        var channelListdata = {
            appCode: data.appCode,
            channelCategory: data.channelCategory,
            channelTypeId: data.channelTypeId,
            channelGroupId: data.channelGroupId,
            channelName: data.channelName
        }
        dispatch(getChannelList(channelListdata));

    }
}

export {
    changeChannelGroup
}