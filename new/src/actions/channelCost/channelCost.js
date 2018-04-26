import "../../mock/channelCost/channelCost";
import "../../mock/channelList/channelList";
import "../../mock/common/global";

import reqwest from 'reqwest';



const getChannelGroupList = (data) => {

    return function(dispatch) {

        console.log('###获取渠道组参数###', data);

        //发送请求
        reqwest({
            url: '/data/overview/channelGroup.do',
            method: 'post',
            data: data,
            type: 'json'
        }).then((msg) => {

            console.log("---获取渠道组列表参数---", msg);

            if (msg.status) {
                dispatch({
                    type: "CHANNELCOST_CHANNELGROUPLIST",
                    payload: msg.data
                })
            } else {
                if (msg.code == -1) {
                    window.location.href = "/"
                }
            }
        });
    }
};
const getChannelList = (data) => {

    return function(dispatch) {

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
                    type: "CHANNELCOST_CHANNELLIST",
                    payload: msg.data
                })
            } else {
                if (msg.code == -1) {
                    window.location.href = "/"
                }
            }
        });

    }
};
const changeChannelGroup = (data) => {
    return function(dispatch) {
        //切换渠道组
        dispatch({
            type: "CHANNELCOST_CHANNELGROUP",
            payload: data.channelGroup
        })
        //重置渠道名称
        dispatch({
            type: "CHANNELCOST_CHANNELNAME",
            payload: data.channelName
        })
    }
};
const changeChannelName = (data) => {
    return function(dispatch) {
        //切换渠道名称
        dispatch({
            type: "CHANNELCOST_CHANNELNAME",
            payload: data.channelName
        })

        //请求渠道数据
        let postData = {
            appCode: data.appCode,
            channelCategory: data.channelCategory,
            channelGroup: data.channelGroup,
            channelName: data.channelName
        };
        dispatch(getChannelList(postData));
    }
};
const setSelectDate = (data) => {

    return function(dispatch) {
        dispatch({
            type: "CHANNELCOST_STARTDATE",
            payload: data.startDate
        })
        dispatch({
            type: "CHANNELCOST_ENDDATE",
            payload: data.endDate
        })
    }
};
const getTableData = (data) => {

    return function(dispatch) {

        console.log('###获取表格参数###', data);

        dispatch({
            type: "CHANNELCOST_LOADING",
            payload: true
        })

        dispatch({
            type: "CHANNELCOST_LIMIT",
            payload: data.limit
        })

        dispatch({
            type: "CHANNELCOST_OFFSET",
            payload: data.offset
        })

        //发送请求
        reqwest({
            url: '/manage/channel/costList.do',
            method: 'post',
            data: data,
            type: 'json'
        }).then((msg) => {

            console.log("---获取表格参数---", msg);

            if (msg.status) {

                dispatch({
                    type: "CHANNELCOST_LOADING",
                    payload: false
                })

                dispatch({
                    type: " CHANNELCOST_TOTAL",
                    payload: msg.total
                })

                dispatch({
                    type: "CHANNELCOST_TABLE",
                    payload: addKey(msg.data, 'huizhong-')
                })

            } else {
                if (msg.code == -1) {
                    window.location.href = "/"
                }
            }
        });
    }
};

const addKey = (data, str) => {
    var arr = [];

    data.map((v, k) => {
        v.key = str + k;
        arr.push(v);
    });

    return arr;
};

export {
    getChannelGroupList,
    getChannelList,
    changeChannelGroup,
    changeChannelName,
    setSelectDate,
    getTableData
};