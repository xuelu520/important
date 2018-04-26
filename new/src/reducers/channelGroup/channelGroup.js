import { combineReducers } from 'redux';

import {ChannelTypeList} from "./ChannelTypeList";
import {CreateParam} from "./CreateParam";
import {EditParam} from "./EditParam";
import {Loading} from "./Loading";
import {Pagination} from "./Pagination";
import {Param} from "./Param";
import {Result} from "./Result";
import {TableColumns} from "./TableColumns";

const channelGroup = combineReducers({
    ChannelTypeList,
    CreateParam,
    EditParam,
    Loading,
    Pagination,
    Param,
    Result,
    TableColumns
});

export {
    channelGroup
};