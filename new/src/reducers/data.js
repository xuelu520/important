 import {
 	combineReducers
 } from 'redux';

 import {
 	profileList
 } from './profileList/profileList';

 import {
 	userList
 } from './userList/list';

 import {
 	Kpi
 } from './kpi/kpi';

 import {
 	awaken
 } from './awaken/awaken';

 import {
 	allTrend
 } from "./allTrend/allTrend";

 import {
 	userCompose
 } from "./userCompose/userCompose";

 import {
 	channelList
 } from "./channelList/targetChannelList";

 import {
 	channelGroup
 } from './channelGroup/channelGroup';
 import {
 	shortLink
 } from "./shortLink/shortLink";

 import {
 	adImpression
 } from './adImpression/adImpression';

 import {channelCost} from "./channelCost/channelCost";
 import {modelManager} from "./modelManager/modelManager";


 var Reducer = combineReducers({
 	profileList,
 	userList,
 	Kpi,
 	shortLink,
 	channelGroup,
 	awaken,
 	allTrend,
 	userCompose,
 	adImpression,
 	userCompose,
    channelCost,
     modelManager
 });

 // const rootReducer = combineReducers({
 // 	reducer,
 // 	routing: routerReducer
 // });



 export {
 	Reducer,
 	channelList
 };