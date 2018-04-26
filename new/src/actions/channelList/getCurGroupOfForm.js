import reqwest from 'reqwest';

/**
 * 获取所选的渠道组对应的数据
 * @method getChanneGroupList
 * @param data {Object} 参数
 * @return {Function}
 */
const getCurGroupOfForm = (data, callback) => {

    return function(dispatch) {

        console.log('###获取所选的渠道组对应的数据###', data);

        //发送请求
        reqwest({
            url: '/manage/get.do',
            method: 'post',
            data: data,
            type: 'json'
        }).then((msg) => {

            console.log("---获取所选的渠道组对应的数据---", msg);

            if (msg.status) {
                dispatch({
                    type: "CREATE_APPCODE",
                    payload: msg.data.appCode
                })
                dispatch({
                    type: "CREATE_CHANNELCATEGORY",
                    payload: msg.data.channelCategory
                })
                dispatch({
                    type: "CREATE_CHANNELTYPE",
                    payload: msg.data.channelType
                })
                dispatch({
                    type: "CREATE_CHANNELTYPEID",
                    payload: msg.data.channelTypeId
                })
                dispatch({
                    type: "CREATE_ISFREE",
                    payload: msg.data.isFree
                })
            } else {
                if (msg.code == -1) {
                    window.location.href = "/"
                }
            }
            
            callback();
        });

    }
}

export {
    getCurGroupOfForm
}