/**
 * 切换线上线下
 * @method changeChannelCategory
 * @param param {Object} 参数
 * @param id {String} 参数
 * @return {Function}
 */
const changeChannelCategory = (data) => {

    return function(dispatch) {
        //切换线上线下
        dispatch({
            type: "CHANNELGROUP_CHANNELCATEGORY",
            payload: data.channelCategory
        });

        //重置渠道类型
        dispatch({
            type: "CHANNELGROUP_CHANNELTYPEID",
            payload: data.channelTypeId
        });

    }
}

export {
    changeChannelCategory
}