const TableColumns = (state, action) => {
    if (typeof state == 'undefined') {
        return {
            tableColumns: [{
                title: '操作系统',
                dataIndex: 'os'
            }, {
                title: '机型',
                dataIndex: 'deviceModel'
            }, {
                title: '厂商',
                dataIndex: 'firm'
            }, {
                title: '品牌',
                dataIndex: 'brand'
            }, {
                title: '操作',
                dataIndex: ''
            }]
        };
    }
    switch (action.type) {
        case 'MODELMANAGER_TABLECOLUMNS':
            return Object.assign({}, state, {
                tableColumns: action.payload
            });
        default:
            return state;
    }
};

export {
    TableColumns
};