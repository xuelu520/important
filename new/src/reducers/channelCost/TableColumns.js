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
                title: '日期',
                dataIndex: 'day'
            }, {
                title: '操作系统',
                dataIndex: 'os'
            }, {
                title: '渠道名称',
                dataIndex: 'channelName'
            }, {
                title: '渠道组名称',
                dataIndex: 'channelGroup'
            }, {
                title: '激活单价（元）',
                dataIndex: 'unitPrice',
                render:(text)=>(<span>{ Number(text).toFixed(2) }</span>)
            }]
        };
    }

    switch (action.type) {
        case "CHANNELCOST_TABLE_COLUMNS":
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