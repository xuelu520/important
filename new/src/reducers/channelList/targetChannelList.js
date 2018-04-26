import { combineReducers } from 'redux';

import { Param } from "./Param";
import { ChannelTypeList } from "./ChannelTypeList";
import { ChannelGroupList } from "./ChannelGroupList";
import { ChannelList } from './ChannelList';
import { Loading } from './Loading';
import { Pagination } from './Pagination';
import { Result } from './Result';
import { TableColumns } from './TableColumns';
import { GroupList } from "./GroupList";
import { CreateParam } from "./CreateParam";
import { EditParam } from "./EditParam";

const channelList = combineReducers({
    Param,
    ChannelTypeList,
    ChannelGroupList,
    ChannelList,
    Loading,
    Pagination,
    Result,
    TableColumns,
    GroupList,
    CreateParam,
    EditParam
});

export {
    channelList
};

