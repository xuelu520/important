 "use strict"

 import React from 'react';
 import ReactDOM from 'react-dom';
 import PropTypes from 'prop-types';

 import {
 	createStore,
 	applyMiddleware,
 	combineReducers,
 	compose
 } from 'redux';

 import {
 	connect,
 	Provider
 } from 'react-redux';

 import {
 	historyMiddleware,
 	syncHistoryWithStore,
 	routerReducer
 } from 'react-router-redux';


 const thunk = require('redux-thunk').default;

 import {
 	Router,
 	Route,
 	IndexRoute,
 	IndexRedirect,
 	hashHistory,
 	useRouterHistory
 } from 'react-router';

 import Routers from './routers/config';

 // import './theme/antd.css';

 import 'antd/dist/antd.css';

 import './theme/channel.css';
 import './theme/channelManage.css';


 import {
 	Reducer,
 	channelList,
 } from './reducers/data';

 import {
 	qReducer
 } from './reducers/qdata';


 const root = combineReducers({
 	Reducer,
 	qReducer,
 	channelList,
 	routing: routerReducer
 });



 // const store = createStore(root, applyMiddleware(thunk));

 console.log(window.__REDUX_DEVTOOLS_EXTENSION__);

 // if (window.__REDUX_DEVTOOLS_EXTENSION__ == undefined) {
 // 	const store = createStore(root, applyMiddleware(thunk));
 // } else {
 // 	const store = createStore(root, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
 // }

 let store;
 if (!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)) {
 	store = createStore(
 		root,
 		applyMiddleware(thunk)
 	);
 } else {
 	store = createStore(
 		root,
 		compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) //插件调试，未安装会报错
 	);
 }



 // if (!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__())) {
 // 	let store = createStore(root, applyMiddleware(thunk));
 // } else {
 // 	let store = createStore(root, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

 // }

 const history = syncHistoryWithStore(hashHistory, store);

 ReactDOM.render(
 	<Provider store = {store}>
 		<Routers history={history} />
 	</Provider>,
 	document.getElementById('main')
 );