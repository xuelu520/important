import "../../mock/common/global";
import '../../mock/channelList/channelList';
import '../../mock/shortLink/shortLink';

import reqwest from 'reqwest';



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
                dispatch({
                    type: "SHORTLINK_CHANNELTYPELIST",
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
                    type: "SHORTLINK_CHANNELGROUPLIST",
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
                    type: "SHORTLINK_GROUP_LIST",
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
const getChannelLinkList = (data) => {

    return function(dispatch) {

        console.log('###获取渠道链参数###', data);

        //发送请求
        reqwest({
            url: '/manage/getLink.do',
            method: 'post',
            data: data,
            type: 'json'
        }).then((msg) => {

            console.log("---获取渠道链列表参数---", msg);

            if (msg.status) {
                dispatch({
                    type: "SHORTLINK_CHANNELLINKLIST",
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

const getTableData = (data) => {
    return function(dispatch) {

        console.log('###获取表格参数###', data);

        dispatch({
            type: "SHORTLINK_TABLE_LOADING",
            payload: true
        })

        dispatch({
            type: "SHORTLINK_TABLE_LIMIT",
            payload: data.limit
        })

        dispatch({
            type: "SHORTLINK_TABLE_OFFSET",
            payload: data.offset
        })

        //发送请求
        reqwest({
            url: '/manage/link/index.do',
            method: 'post',
            data: data,
            type: 'json'
        }).then((msg) => {

            console.log("---获取表格参数---", msg);

            if (msg.status) {

                dispatch({
                    type: "SHORTLINK_TABLE_LOADING",
                    payload: false
                })



                dispatch({
                    type: " SHORTLINK_TABLE_TOTAL",
                    payload: msg.total
                })

                dispatch({
                    type: "SHORTLINK_TABLE",
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

const setAppCode = (data) => {
    return function(dispatch) {
        dispatch({
            type: "SHORTLINK_APPCODE",
            payload: data.appCode
        });
    }
};

const changeChannelCategory = (data) => {
    return function(dispatch) {
        //切换线上线下
        dispatch({
            type: "SHORTLINK_CHANNELCATEGORY",
            payload: data.channelCategory
        });

        //重置渠道类型
        dispatch({
            type: "SHORTLINK_CHANNELTYPEID",
            payload: data.channelTypeId
        });

        //重置渠道组
        dispatch({
            type: "SHORTLINK_CHANNELGROUP",
            payload: data.channelGroupId
        });

        //重置渠道
        dispatch({
            type: "SHORTLINK_CHANNELNAME",
            payload: data.channelName
        });

        //获取渠道类型列表
        let data1 = {
            appCode: data.appCode
        };
        dispatch(getChannelTypeList(data1));

        //获取渠道组列表
        let data2 = {
            appCode: data.appCode,
            channelGroupId: data.channelGroupId,
            channelTypeId: data.channelTypeId,
            channelCategory: data.channelCategory
        };
        dispatch(getChannelGroupList(data2));
    }
};
const changeChannelType = (data) => {
    return function(dispatch) {

        //切换渠道类型
        dispatch({
            type: "SHORTLINK_CHANNELTYPEID",
            payload: data.channelTypeId
        });

        //重置渠道组
        dispatch({
            type: "SHORTLINK_CHANNELGROUP",
            payload: data.channelGroupId
        });

        //重置渠道
        dispatch({
            type: "SHORTLINK_CHANNELNAME",
            payload: data.channelName
        });

        //获取渠道组列表
        let postData = {
            appCode: data.appCode,
            channelGroupId: data.channelGroupId,
            channelTypeId: data.channelTypeId,
            channelCategory: data.channelCategory
        };
        dispatch(getChannelGroupList(postData));
    }
};
const changeChannelGroup = (data) => {
    return function(dispatch) {
        //切换渠道组
        dispatch({
            type: "SHORTLINK_CHANNELGROUP",
            payload: data.channelGroupId
        });

        //重置渠道
        dispatch({
            type: "SHORTLINK_CHANNELNAME",
            payload: data.channelName
        });
    }
};
const changeChannelName = (data) => {
    return function(dispatch) {
        //切换渠道
        dispatch({
            type: "SHORTLINK_CHANNELNAME",
            payload: data.channelName
        });

        let postData = {
            appCode: data.appCode,
            channelGroupId: data.channelGroupId,
            channelTypeId: data.channelTypeId,
            channelCategory: data.channelCategory,
            channelName: data.channelName
        };
        dispatch(getChannelLinkList(postData));
    }
};
const setCreateParam = (data) => {
    return function(dispatch) {
        if (data.channelName) {
            dispatch({
                type: "SHORTLINK_CREATE_CHANNELNAME",
                payload: data.channelName
            })
        }
        if (data.password) {
            dispatch({
                type: "SHORTLINK_CREATE_PASSWORD",
                payload: data.password
            })
        }
        if (data.appCode) {
            dispatch({
                type: "SHORTLINK_CREATE_APPCODE",
                payload: data.appCode
            })
        }
        if (data.channelCategory) {
            dispatch({
                type: "SHORTLINK_CREATE_CHANNELCATEGORY",
                payload: data.channelCategory
            })
        }
        if (data.channelTypeId) {
            dispatch({
                type: "SHORTLINK_CREATE_CHANNELTYPEID",
                payload: data.channelTypeId
            })
        }
        if (data.isFree) {
            dispatch({
                type: "SHORTLINK_CREATE_ISFREE",
                payload: data.isFree
            })
        }
        if (data.description) {
            dispatch({
                type: "SHORTLINK_CREATE_DESCRIPTION",
                payload: data.description
            })
        }
        if (data.channelGroup) {
            dispatch({
                type: "SHORTLINK_CREATE_CHANNELGROUP",
                payload: data.channelGroup
            })
        }
        if (data.channelGroupId) {
            dispatch({
                type: "SHORTLINK_CREATE_CHANNELGROUPID",
                payload: data.channelGroupId
            })
        }
    }
};
const create = (data) => {
    return function(dispatch) {

        console.log('###add请求参数###', data);

        reqwest({
            url: '/manage/link/add.do',
            method: 'post',
            data: data,
            type: 'json'
        }).then((msg) => {
            console.log('---add请返回---', msg);
            window.location.href = '/#/manager/shortLink';
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

const getCurFormByGroupId = (data) => {
    return function(dispatch) {

        console.log('###根据渠道组id请求表单数据###', data);

        reqwest({
            url: '/manage/get.do',
            method: 'post',
            data: data,
            type: 'json'
        }).then((msg) => {

            console.log('---根据渠道组id请求表单数据---', msg);

            if (msg.status) {
                dispatch({
                    type: "SHORTLINK_CREATE_APPCODE",
                    payload: msg.data.appCode
                })
                dispatch({
                    type: "SHORTLINK_CREATE_CHANNELCATEGORY",
                    payload: msg.data.channelCategory
                })
                dispatch({
                    type: "SHORTLINK_CREATE_CHANNELTYPEID",
                    payload: msg.data.channelTypeId
                })
                dispatch({
                    type: "SHORTLINK_CREATE_ISFREE",
                    payload: msg.data.isFree
                })
            }
        });
    }
};

export {
    getChannelTypeList,
    getChannelGroupList,
    getChannelLinkList,
    getTableData,
    changeChannelCategory,
    changeChannelType,
    changeChannelGroup,
    changeChannelName,
    setCreateParam,
    create,
    setAppCode,
    getGroupList,
    getCurFormByGroupId
};