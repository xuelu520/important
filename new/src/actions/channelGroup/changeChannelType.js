/**
 * 切换渠道类型
 * @method changeChannelType
 * @param param {Object} 参数
 * @param id {String} 参数
 * @return {Function}
 */
const changeChannelType = (data) => {

    return function(dispatch) {

        //重置渠道类型
        dispatch({
            type: "CHANNELGROUP_CHANNELTYPEID",
            payload: data.channelTypeId
        });

    }
}

export {
    changeChannelType
}