import {getChannelTypeList} from "./getChannelTypeList";

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
            type: "CHANNELGROUP_APPCODE",
            payload: data.appCode
        });

        //重置线上线下
        dispatch({
            type: "CHANNELGROUP_CHANNELCATEGORY",
            payload: data.channelCategory
        });

        //重置渠道类型
        dispatch({
            type: "CHANNELGROUP_CHANNELTYPEID",
            payload: data.channelTypeId
        });

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