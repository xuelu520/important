import '../../mock/common/global';
import '../../mock/modelManager/modelManager';


import reqwest from 'reqwest';
import React from 'react';
import {
    notification
} from 'antd';



const getFirmList = (data) => {
    return function(dispatch) {
        console.log('###获取厂商列表参数###', data);

        //发送请求
        reqwest({
            url: '/common/firm.do',
            method: 'post',
            data: data,
            type: 'json'
        }).then((msg) => {

            console.log("---获取厂商列表参数---", msg);

            if (msg.status) {
                dispatch({
                    type: "MODELMANAGER_FIRMLIST",
                    payload: msg.data
                })
            } else {
                if (msg.code == -1) {
                    window.location.href = "/"
                }
            }
        });
    };
};
const getBrandList = (data) => {
    return function(dispatch) {
        console.log('###获取品牌列表参数###', data);

        //发送请求
        reqwest({
            url: '/common/brand.do',
            method: 'post',
            data: data,
            type: 'json'
        }).then((msg) => {

            console.log("---获取品牌列表参数---", msg);

            if (msg.status) {
                dispatch({
                    type: "MODELMANAGER_BRANDLIST",
                    payload: msg.data
                })
            } else {
                if (msg.code == -1) {
                    window.location.href = "/"
                }
            }
        });
    };
};
const getEditBrandList = (data) => {
    return function(dispatch) {
        console.log('###获取品牌列表参数###', data);

        //发送请求
        reqwest({
            url: '/common/brand.do',
            method: 'post',
            data: data,
            type: 'json'
        }).then((msg) => {

            console.log("---获取品牌列表参数---", msg);

            if (msg.status) {

                dispatch({
                    type: "MODELMANAGER_BRANDLIST",
                    payload: msg.data
                });

                console.log("###设置品牌开始###", msg);

                dispatch(setUpdateParam({
                    editBrand: msg.data[0].brand
                }));

                console.log("---设置品牌结束---", msg);
            } else {
                if (msg.code == -1) {
                    window.location.href = "/"
                }
            }
        });
    };
};
const getTableData = (data) => {
    return function(dispatch) {

        console.log('###获取表格参数###', data);

        dispatch({
            type: "MODELMANAGER_LOADING",
            payload: true
        })
        dispatch({
            type: "MODELMANAGER_OFFSET",
            payload: data.offset
        })
        dispatch({
            type: "MODELMANAGER_LIMIT",
            payload: data.limit
        })

        //发送请求
        reqwest({
            url: '/os/model/table.do',
            method: 'post',
            data: data,
            type: 'json'
        }).then((msg) => {

            console.log("---获取表格参数---", msg);

            if (msg.status) {
                dispatch({
                    type: "MODELMANAGER_TOTAL",
                    payload: msg.total
                })
                dispatch({
                    type: "MODELMANAGER_TABLE",
                    payload: addKey(msg.data, 'huizhong-')
                })
                dispatch({
                    type: "MODELMANAGER_LOADING",
                    payload: false
                })

            } else {
                if (msg.code == -1) {
                    window.location.href = "/"
                }
            }
        });
    };
};

const getDownLoadData = (data) => {
    return function(dispatch) {

        console.log("###下载表格参数###", data);

        //发送请求
        reqwest({
            url: '/os/model/table.do',
            method: 'post',
            data: data,
            type: 'json'
        }).then((msg) => {

            console.log("---下载表格参数---", msg);

            if (msg.status) {
                dispatch({
                    type: "MODELMANAGER_DOWNLOAD_DATA",
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

const changeOs = (data) => {
    return function(dispatch) {
        //切换操作系统
        dispatch({
            type: 'MODELMANAGER_APPCODE',
            payload: data.appCode
        });
        //重置设备机型
        dispatch({
            type: 'MODELMANAGER_DEVICEMODEL',
            payload: data.deviceModel
        });
        //重置厂商
        dispatch({
            type: 'MODELMANAGER_FIRM',
            payload: data.firm
        });
        //重置品牌
        dispatch({
            type: 'MODELMANAGER_BRAND',
            payload: data.brand
        });
    };
};
const changeModel = (data) => {
    return function(dispatch) {
        //切换设备机型
        dispatch({
            type: 'MODELMANAGER_DEVICEMODEL',
            payload: data.deviceModel
        });
    };
};
const changeFirm = (data) => {
    return function(dispatch) {
        //切换厂商
        dispatch({
            type: 'MODELMANAGER_FIRM',
            payload: data.firm
        });
        //重置品牌
        dispatch({
            type: 'MODELMANAGER_BRAND',
            payload: data.brand
        });
        //重新获取品牌列表数据
        let postData = {
            firm: data.firm
        };
        dispatch(getBrandList(postData));
    };
};

const changeEditFirm = (data) => {
    return function(dispatch) {
        //重新获取品牌列表数据
        let postData = {
            firm: data.editFirm
        };
        dispatch(getEditBrandList(postData));
    };
};

const changeBrand = (data) => {
    return function(dispatch) {
        //切换品牌
        dispatch({
            type: 'MODELMANAGER_BRAND',
            payload: data.brand
        });
    };
};
const setUpdateParam = (data) => {
    return function(dispatch) {
        if (data.createFirm) {
            dispatch({
                type: "MODELMANAGER_CREATE_FIRM",
                payload: data.createFirm
            })
        }
        if (data.createBrand) {
            dispatch({
                type: "MODELMANAGER_CREATE_BRAND",
                payload: data.createBrand
            })
        }
        if (data.editFirm) {
            dispatch({
                type: "MODELMANAGER_EDIT_FIRM",
                payload: data.editFirm
            })
        }
        if (data.editBrand) {
            dispatch({
                type: "MODELMANAGER_EDIT_BRAND",
                payload: data.editBrand
            })
        }
        if (data.editId) {
            dispatch({
                type: "MODELMANAGER_EDIT_ID",
                payload: data.editId
            })
        }
    };
};
const create = (data) => {
    return function(dispatch) {
        console.log('###add请求参数###', data);

        reqwest({
            url: '/os/firm/add.do',
            method: 'post',
            data: data,
            type: 'json'
        }).then((msg) => {
            console.log('---add请返回---', msg);
            window.location.href = '/#/sys/modal';
        });
    };
};
const edit = (data) => {
    return function(dispatch) {
        console.log('###edit请求参数###', data);

        reqwest({
            url: '/os/model/updateFirm.do',
            method: 'post',
            data: data,
            type: 'json'
        }).then((msg) => {
            console.log('---edit请返回---', msg);
            window.location.href = '/#/sys/modal';
        });
    };
};
const addKey = (data, str) => {
    var arr = [];

    data.map((v, k) => {
        v.key = str + k;
        arr.push(v);
    });

    return arr;
};

const check = (checkData, createData) => {
    return function(dispatch) {
        console.log('###check请求参数###', checkData);

        reqwest({
            url: '/os/firm/check.do',
            method: 'post',
            data: checkData,
            type: 'json'
        }).then((msg) => {
            console.log('---check请返回---', msg);
            if (msg.state == 'error') {
                notification.open({
                    message: msg.error
                });
            } else {
                dispatch(create(createData));
            }
        });
    };
};

export {
    getFirmList,
    getBrandList,
    getTableData,
    changeOs,
    changeModel,
    changeFirm,
    changeBrand,
    setUpdateParam,
    create,
    edit,
    changeEditFirm,
    getDownLoadData,
    check
};