import {
    getTableData
} from './getTableData';

/**
 * 每页显示多少条
 * @method setLimit
 * @param param {Object} 参数
 * @param pagination {Object} 分页信息
 * @return {Function}
 */
const setLimit = (param, pagination) => {

    return function (dispatch) {
        // 当前页
        dispatch({
            type: "CHANNEL_GROUP_CURRENT",
            payload: 1
        })

        //设置每页显示多少条
        dispatch({
            type: "CHANNEL_GROUP_PAGE_SIZE",
            payload: pagination.pageSize
        })

        var data = {
            appCode: "",
            sortField: "",
            sortOrder: "",
            channelGroup: "",
            channelCategory: "",
            fatherFlag: "",
            channelTypeId: "",
            isFree: "",
            offset:1,
            limit: pagination.pageSize
        }
        getTableData(data, dispatch);
    }
}

export {
    setLimit
}