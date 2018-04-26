import {getChannelGroupList} from "./getChannelGroupList";
import {getChannelList} from "./getChannelList";

/**
 * 切换渠道类型
 * @method changeChannelType
 * @param param {Object} 参数
 * @param id {String} 参数
 * @return {Function}
 */
const changeChannelType = (data) => {

    return function(dispatch) {

        //切换渠道类型
        dispatch({
            type: "CHANNELLIST_CHANNELTYPE",
            payload: data.channelTypeId
        });

        //重置渠道组
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

        //获取渠道组列表
        var channelGroupData = {
            appCode: data.appCode,
            channelCategory: data.channelCategory,
            channelGroupId: data.channelGroupId,
            channelTypeId: data.channelTypeId
        }
        dispatch(getChannelGroupList(channelGroupData));
    }
}

export {
    changeChannelType
}