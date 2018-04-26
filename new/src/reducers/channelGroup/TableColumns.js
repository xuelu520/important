import React from 'react';
/**
 * table 数据配置信息
 * @method TableColumns
 * @param state {Object} 状态
 * @param action {Object} 动作
 */

const TableColumns = (state, action) => {
    if (typeof state === "undefined") {
        //初始化数据
        return {
            tableColumns: [{
                title: '渠道组名称',
                dataIndex: 'channelName'
            },{
                title: '操作系统',
                dataIndex: 'appCode',
                render: (text) => (<span>{text == '24' ? 'Android' : 'iOS'}</span>)
            }, {
                title: '线上/线下',
                dataIndex: 'channelCategory',
                render: (text) => (<span>{text == '1' ? '线上' : '线下'}</span>)
            }, {
                title: '渠道类型',
                dataIndex: 'channelType'
            }, {
                title: '是否付费',
                dataIndex: 'isFree',
                render: (text) => (<span>{text == '0' ? '是' : '否'}</span>)
            }, {
                title: '描述',
                dataIndex: 'channelDescribe'
            }, {
                title: '操作',
                dataIndex: ''
            }]
        };
    }

    switch (action.type) {
        case "CHANNELGROUP_TABLE_COLUMNS":
            return Object.assign({}, state, {
                tableColumns: action.payload
            });
        default:
            return state;
    }
}

export {
    TableColumns
}