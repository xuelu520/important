import reqwest from 'reqwest';

/**
 * 获取渠道列表
 * @method getChanneList
 * @param data {Object} 参数
 * @return {Function}
 */
const getChannelList = (data) => {

    return function(dispatch) {

        dispatch({
            type: "CHANNELLIST_CHANNELNAME",
            payload: data.channelName
        })

        console.log('###获取渠道列表参数###', data);

        //发送请求
        reqwest({
            url: '/data/overview/channel.do',
            method: 'post',
            data: data,
            type: 'json'
        }).then((msg) => {

            console.log("---获取渠道列表参数---", msg);

            if (msg.status) {
                //设置state中的channelList
                dispatch({
                    type: "CHANNELLIST_CHANNELLIST",
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
    getChannelList
}