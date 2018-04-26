import reqwest from 'reqwest';

/**
 * 获取当前渠道组id所对应的详情
 * @method getCurChannelGroupDetail
 * @param data {Object} 参数
 * @return {Function}
 */
const getCurChannelGroupDetail = (data) => {

    return function(dispatch) {

        console.log('###获取当前渠道组id所对应的详情###', data);

        //发送请求
        reqwest({
            url: '/manage/get.do',
            method: 'post',
            data: data,
            type: 'json'
        }).then((msg) => {

            console.log("---获取当前渠道组id所对应的详情---", msg);

            if (msg.status) {
                dispatch({
                    type: "EDIT_GROUP_ID",
                    payload: msg.data.id
                })
                dispatch({
                    type: "EDIT_GROUP_CHANNELNAME",
                    payload: msg.data.channelName
                })
                dispatch({
                    type: "EDIT_GROUP_DESCRIPTION",
                    payload: msg.data.description
                })
                dispatch({
                    type: "EDIT_GROUP_APPCODE",
                    payload: msg.data.appCode
                })
                dispatch({
                    type: "EDIT_GROUP_CHANNELCATEGORY",
                    payload: msg.data.channelCategory
                })
                dispatch({
                    type: "EDIT_CHANNELTYPE",
                    payload: msg.data.channelType
                })
                dispatch({
                    type: "EDIT_GROUP_CHANNELTYPEID",
                    payload: msg.data.channelTypeId
                })
                dispatch({
                    type: "EDIT_GROUP_ISFREE",
                    payload: msg.data.isFree
                })
                dispatch({
                    type: "EDIT_GROUP_PASSWORD",
                    payload: msg.data.password
                })
            } else {
                if (msg.code == -1) {
                    window.location.href = "/"
                }
            }
        });

    }
}

export {
    getCurChannelGroupDetail
}