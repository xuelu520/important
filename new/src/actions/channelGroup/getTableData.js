import reqwest from 'reqwest';

//给Table 组件数据加key
import {
    addKey
} from './addKey';

/**
 * @method getTableData
 * @param data {Object} 参数
 * @param dispatch {Function} 触发改变状态
 */
const getTableData = (data) => {

    console.log('###getTable参数###', data);

    return function(dispatch) {
        // 更新表格loading
        dispatch({
            type: "CHANNELGROUP_LOADING",
            payload: true
        })

        //发送请求
        reqwest({
            url: '/manage/list/index.do',
            method: 'post',
            data: data,
            type: 'json',
            header: {
                "aaa": "bbb"
            }
        }).then((msg) => {
            if (msg.status) {

                console.log("---获取表格数据参数---", msg);

                dispatch({
                    type: "CHANNEL_GROUP_TABLE",
                    payload: addKey(msg.data, 'huizhong-')
                })

                dispatch({
                    type: "CHANNEL_GROUP_TOTAL",
                    payload: msg.total
                })

                dispatch({
                    type: "CHANNELGROUP_LOADING",
                    payload: false
                })

            } else {
                if (msg.code == -1) {
                    alert(-1);
                    window.location.href = "/"
                }
            }
        });
    }
}

export {
    getTableData
}