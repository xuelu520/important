import reqwest from 'reqwest';

/**
 * 新建->获取组列表
 * @method getGroupList
 * @param data {Object} 参数
 * @return {Function}
 */
const getGroupList = (data) => {

    return function(dispatch) {

        console.log('###groupList###', data);

        //发送请求
        reqwest({
            url: '/manage/channel/groupList.do',
            method: 'post',
            data: data,
            type: 'json'
        }).then((msg) => {
            if (msg.status) {
                console.log("---获取groupList参数---", msg);
                dispatch({
                    type: "CHANNELLIST_GROUPLIST",
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
    getGroupList
}