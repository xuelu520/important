import reqwest from 'reqwest';

/**
 * 获取当前渠道id所对应的详情
 * @method getCurChannelDetail
 * @param data {Object} 参数
 * @return {Function}
 */
const getCurChannelDetail = (data) => {

    return function(dispatch) {

        console.log('###获取当前渠道id所对应的详情###', data);

        //发送请求
        reqwest({
            url: '/manage/get.do',
            method: 'post',
            data: data,
            type: 'json'
        }).then((msg) => {

            console.log("---获取当前渠道id所对应的详情---", msg);

            if (msg.status) {
                dispatch({
                    type: "EDIT_ID",
                    payload: msg.data.id
                })
                dispatch({
                    type: "EDIT_CHANNELNAME",
                    payload: msg.data.channelName
                })
                dispatch({
                    type: "EDIT_CHANNELGROUP",
                    payload: msg.data.channelGroup
                })
                dispatch({
                    type: "EDIT_APPCODE",
                    payload: msg.data.appCode
                })
                dispatch({
                    type: "EDIT_CHANNELCATEGORY",
                    payload: msg.data.channelCategory
                })
                dispatch({
                    type: "EDIT_CHANNELTYPE",
                    payload: msg.data.channelType
                })
                dispatch({
                    type: "EDIT_CHANNELTYPEID",
                    payload: msg.data.channelTypeId
                })
                dispatch({
                    type: "EDIT_CHANNELDESCRIBE",
                    payload: msg.data.channelDescribe
                })
                dispatch({
                    type: "EDIT_ISFREE",
                    payload: msg.data.isFree
                })
                dispatch({
                    type: "EDIT_SHOWCOL",
                    payload: msg.data.showCol
                })
                dispatch({
                    type: "EDIT_REDUCE",
                    payload: msg.data.reduce
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
    getCurChannelDetail
}