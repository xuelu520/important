import reqwest from 'reqwest';

/**
 * 获取渠道类型列表
 * @method getChannelType
 * @param data {Object} 参数
 * @return {Function}
 */
const getChannelTypeList = (data) => {

    return function(dispatch) {

        console.log('###获取渠道类型列表参数###', data);

        //发送请求
        reqwest({
            url: '/manage/channelType.do',
            method: 'post',
            data: data,
            type: 'json'
        }).then((msg) => {

            console.log("---获取渠道类型列表参数---", msg);

            if (msg.status) {
                //设置state中的channelType
                dispatch({
                    type: "CHANNELLIST_CHANNELTYPELIST",
                    payload: msg.data
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
    getChannelTypeList
}