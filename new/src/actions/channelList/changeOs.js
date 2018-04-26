import {getChannelTypeList} from "./getChannelTypeList";
import {getChannelGroupList} from "./getChannelGroupList";
import {getChannelList} from "./getChannelList";

/**
 * 切换操作系统
 * @method changeOs
 * @param param {Object} 参数
 * @param id {String} 参数
 * @return {Function}
 */
const changeOs = (data) => {

    return function(dispatch) {

        //切换 appCode
        dispatch({
            type: "CHANNELLIST_APPCODE",
            payload: data.appCode
        });

        //重置线上线下
        dispatch({
            type: "CHANNELLIST_CHANNELCATEGORY",
            payload: data.channelCategory
        });

        //重置渠道类型
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
            channelTypeId: data.channelTypeId,
            channelGroupId: data.channelGroupId,
            channelCategory: data.channelCategory
        }
        dispatch(getChannelGroupList(channelGroupData));

        //获取渠道类型列表
        var channelTypeData = {
            appCode: data.appCode
        };
        dispatch(getChannelTypeList(channelTypeData));
    }
}

export {
    changeOs
}