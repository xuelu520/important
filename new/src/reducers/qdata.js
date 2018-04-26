 import {
 	combineReducers
 } from 'redux';

 import {
 	channelRoi
 } from './channelRoi/channelRoi';

 import {
 	userMass
 } from './userMass/userMass';

 import {
 	terminalBrand
 } from './terminalBrand/terminalBrand';

 import {
 	retentionAnalysis
 } from './retentionAnalysis/retentionAnalysis';

 import {
 	flowDistribution
 } from './flowDistribution/flowDistribution';

 var qReducer = combineReducers({
 	channelRoi,
 	userMass,
 	retentionAnalysis,
 	terminalBrand,
 	flowDistribution
 });

 export {
 	qReducer
 };