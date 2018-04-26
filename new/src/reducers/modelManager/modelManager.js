import { combineReducers } from 'redux';

import {Param} from './Param';
import {Result} from "./Result";
import {UpdateParam} from "./UpdateParam";
import {TableColumns} from "./TableColumns";

const modelManager = combineReducers({
    Param,
    Result,
    UpdateParam,
    TableColumns
});

export {
  modelManager
};