import {
    getTableData
} from './getTableData';

/**
 * 分页调用模块
 * @method setPagination
 * @param param {Object} 请求参数
 * @param pagination {Object} 分页参数
 * @channel channel 单渠道名称
 */
const setPagination = (data) => {

    return function (dispatch) {
        //更新当前页数状态
        dispatch({
            type: "CHANNEL_LIST_CURRENT",
            payload: data.offset
        })
        //更新每页显示多少条状态
        dispatch({
            type: "CHANNEL_LIST_PAGE_SIZE",
            payload: data.limit
        })

        var dataAjax = {
            appCode: data.appCode,
            sortField: data.sortField,
            sortOrder: data.sortOrder,
            channelGroupId: data.channelGroupId,
            channelCategory: data.channelCategory,
            fatherFlag: data.fatherFlag,
            channelName: data.channelName,
            channelTypeId: data.channelTypeId,
            isFree: data.isFree,
            offset: data.offset,
            limit: data.limit
        }
        getTableData(dataAjax, dispatch);
    }
}

export {
    setPagination
}