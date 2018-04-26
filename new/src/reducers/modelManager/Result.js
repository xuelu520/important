const Result = (state, action) => {
    if (typeof state == 'undefined') {
        return {
            tableList: [],
            firmList:[],
            brandList:[],
            downloadDataList:[],
            offset: 1,
            limit: 10,
            total: 0,
            tableLoading: false,
        };
    }
    switch (action.type){
        case 'MODELMANAGER_TABLE':
            return Object.assign({},state,{
                tableList:action.payload
            });
        case 'MODELMANAGER_FIRMLIST':
            return Object.assign({},state,{
                firmList:action.payload
            });
        case 'MODELMANAGER_BRANDLIST':
            return Object.assign({},state,{
                brandList:action.payload
            });
        case 'MODELMANAGER_OFFSET':
            return Object.assign({},state,{
                offset:action.payload
            });
        case 'MODELMANAGER_LIMIT':
            return Object.assign({},state,{
                limit:action.payload
            });
        case 'MODELMANAGER_TOTAL':
            return Object.assign({},state,{
                total:action.payload
            });
        case 'MODELMANAGER_LOADING':
            return Object.assign({},state,{
                tableLoading:action.payload
            });
        case 'MODELMANAGER_DOWNLOAD_DATA':
            return Object.assign({},state,{
                downloadDataList:action.payload
            });
        default:
            return state;
    }
};

export {
    Result
}