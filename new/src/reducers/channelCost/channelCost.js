import { combineReducers } from 'redux';

import {Param} from "./Param";
import {Result} from "./Result";
import {TableColumns} from "./TableColumns";

const channelCost = combineReducers({
    Param,
    Result,
    TableColumns
});

export {
    channelCost
};