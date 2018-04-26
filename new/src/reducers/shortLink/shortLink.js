import { combineReducers } from 'redux';

import { CreateParam } from './CreateParam';
import { Param } from './Param';
import { Result } from './Result';
import { TableColumns } from "./TableColumns";

const shortLink = combineReducers({
    CreateParam,
    Param,
    Result,
    TableColumns
});

export {
    shortLink
};