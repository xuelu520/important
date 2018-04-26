 import {
 	combineReducers
 } from 'redux';

 import {
 	Param
 } from './params';

 import {
 	Result
 } from './result';

 const Kpi = combineReducers({
 	Param,
 	Result
 });

 export {
 	Kpi
 }