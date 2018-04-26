 import React from 'react';

 import {
 	Router,
 	Route,
 	IndexRoute,
 	IndexRedirect,
 	Redirect
 } from 'react-router';


 import Nesting from '../common/nesting';

 /**
  * 根路由组件
  */
 import Main from '../components/main';

 /**
  * 渠道数据
  */

 import DataLeftNav from '../components/dataLeftNav/dataLeftNav';


 //渠道数据 -- 用户概况
 const ProfileList = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/profile/profileList').default
 		)
 	}, 'profileList')
 }

 //渠道数据 -- 整体趋势
 const AllTrend = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/allTrend/allTrend').default
 		)
 	}, 'kpiDetail')
 }


 //渠道数据 -- 留存分析
 const RetentionAnalysis = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/retentionAnalysis/retentionAnalysis').default
 		)
 	}, 'retentionAnalysis')
 }

 //渠道数据 -- 用户构成
 const UserCompose = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/userCompose/userCompose').default
 		)
 	}, 'userCompose')
 }


 //渠道数据 -- 用户构成
 const FlowDistribution = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/flowDistribution/flowDistribution').default
 		)
 	}, 'flowDistribution')
 }

 //渠道数据 -- 用户质量
 const UserMass = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/userMass/userMass').default
 		)
 	}, 'userMass')
 }

 //渠道数据 -- 站外唤醒
 const Awaken = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/awaken/awaken').default
 		)
 	}, 'awaken')
 }

 //渠道数据 -- 终端品牌
 const TerminalBrand = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/terminalBrand/terminalBrand').default
 		)
 	}, 'terminalBrand')
 }

 //渠道数据 -- 广告曝光
 const AdImpression = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/adImpression/adImpression').default
 		)
 	}, 'adImpression')
 }


 //渠道数据 -- 渠道ROI
 const ChannelRoi = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/channelRoi/channelRoi').default
 		)
 	}, 'channelRoi')
 }


 //渠道数据 -- KPI报表
 const KpiDetail = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/kpi/kpiDetail').default
 		)
 	}, 'kpiDetail')
 }

 /**
  * 渠道管理
  */
 import ManagerLeftNav from '../components/managerLeftNav/managerLeftNav';

 //渠道管理 -- 渠道列表

 const ChannelList = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/channelList/channelList').default
 		)
 	}, 'channelList')
 }


 //渠道管理 -- 渠道列表 -- 新建

 const ChannelListCreate = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/channelList/create').default
 		)
 	}, 'channelListcreate')
 }

 //渠道管理 -- 渠道列表 -- 修改

 const ChannelListEdit = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/channelList/edit').default
 		)
 	}, 'channelListEdit')
 }

 //渠道管理 -- 渠道分组


 const ChannelGroup = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/channelGroup/channelGroup').default
 		)
 	}, 'channelGroup')
 }
 //渠道管理 -- 渠道分组 -- 新建

 const ChannelGroupCreate = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/channelGroup/create').default
 		)
 	}, 'channelGroupCreate')
 }

 //渠道管理 -- 渠道分组 -- 修改

 const ChannelGroupEdit = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/channelGroup/edit').default
 		)
 	}, 'channelGroupEdit')
 }

 //渠道管理 -- 短链管理
 const ShortLink = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/shortLink/shortLink').default
 		)
 	}, 'shortLink')
 }

 //渠道管理 -- 短链管理 -- 新建

 const ShortLinkCreate = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/shortLink/create').default
 		)
 	}, 'shortLinkCreate')
 }

 //渠道管理 -- 渠道成本

 const ChannelCost = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/channelCost/channelCost').default
 		)
 	}, 'channelCost')
 }

 /**
  * 系统管理
  */
 import SysLeftNav from '../components/sysLeftNav/sysLeftNav';

 //系统管理 -- 机型管理

 const ModalManager = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/modalManager/modalManager').default
 		)
 	}, 'modalManager')
 }
 //渠道管理 -- 渠道分组 -- 新建

 const ModalManagerCreate = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/modalManager/create').default
 		)
 	}, 'modalManagerCreate')
 }

 //渠道管理 -- 渠道分组 -- 修改
 const ModalManagerEdit = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/modalManager/edit').default
 		)
 	}, 'modalManagerEdit')
 }

 /**
  * 用户管理
  */

 import UserLeftNav from '../components/userLeftNav/userLeftNav';

 // 用户管理 -- 用户列表
 const UserListIndex = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/user/userListIndex').default
 		)
 	}, 'userListIndex')
 }

 // 用户管理 -- 用户列表 -- 新建用户
 const CreateUser = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/user/createUser').default
 		)
 	}, 'createUser')
 }


 // 用户管理 -- 用户列表 -- 修改用户
 const EditUser = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/user/editUser').default
 		)
 	}, 'editUser')
 }


 // 没有权限 
 const NoAllow = (location, cb) => {
 	require.ensure([], require => {
 		cb(null,
 			require('../components/noAllow/noAllow').default
 		)
 	}, 'noAllow')
 }


 const doAllow = (replace) => {

 	var list = [{
 		key: "1",
 		value: "data",
 		cnName: "渠道数据",
 		url: "/data"
 	}, {
 		key: "2",
 		value: "manager",
 		cnName: "渠道管理",
 		url: "/manager"
 	}, {
 		key: "3",
 		value: "sys",
 		cnName: "系统管理",
 		url: "/sys"
 	}, {
 		key: "4",
 		value: "user",
 		cnName: "用户管理",
 		url: "/user"
 	}];


 	if (window.userInfo.data.auth != "") {
 		let winArr = window.userInfo.data.auth.split(",");

 		var firstNum = winArr[0];
 		var path = "";
 		list.map((v, k) => {
 			if (firstNum == v.key) {
 				path = v.url;
 			}
 		});

 		if (path != "") {
 			replace({
 				pathname: path
 			})
 		}
 	}
 }


 const isAllow = (data, replace) => {
 	console.log(data, 'data');

 	var list = [{
 		key: "1",
 		value: "data",
 		cnName: "渠道数据",
 		url: "/data"
 	}, {
 		key: "2",
 		value: "manager",
 		cnName: "渠道管理",
 		url: "/manager"
 	}, {
 		key: "3",
 		value: "sys",
 		cnName: "系统管理",
 		url: "/sys"
 	}, {
 		key: "4",
 		value: "user",
 		cnName: "用户管理",
 		url: "/user"
 	}];

 	var winArr = window.userInfo.data.auth.split(",");

 	var bl = false;
 	winArr.map((v, k) => {
 		if (v == data) {
 			bl = true;
 		}
 	});

 	if (!bl) {
 		var firstNum = winArr[0];
 		var path = "";
 		list.map((v, k) => {
 			if (firstNum == v.key) {
 				path = v.url;
 			}
 		});

 		if (path != "") {
 			replace({
 				pathname: path
 			})
 		} else {

 			replace({
 				pathname: '/noallow'
 			})

 		}

 	}

 }


 export default class Routers extends React.Component {

 	constructor(props) {
 		super(props);
 	}


 	render() {;
 		return (
 			<div>
 			<Router history={this.props.history}>	
			  <Route path="/" component={Main}>	
				 <IndexRedirect to="data" />
	          
	          	{/*渠道数据开始*/}
	            <Route path="data" component={DataLeftNav} onEnter={
	            	(nextState, replace) => {
	            		let key = "1";
	            		isAllow(key, replace);
	            	}
	            }>
					<IndexRedirect to="profile"  />
	            	{/*用户概况*/}
	            	<Route path="profile(/:tab)(/:page)" component={Nesting}>
	            		<IndexRoute getComponent={ProfileList} />
	            		<Redirect from='*' to='/data/profile' />
	            	</Route>
	            	{/*整体趋势*/}
	            	<Route path="allTrend" component={Nesting}>
	            		<IndexRoute getComponent={AllTrend} />
	            		<Redirect from='*' to='/data/allTrend' />
	            	</Route>

	            	{/*留存分析*/}
	            	<Route path="retentionAnalysis" component={Nesting}>
	            		<IndexRoute getComponent={RetentionAnalysis} />
	            		<Redirect from='*' to='/data/retentionAnalysis' />
	            	</Route>

	            	{/*用户构成*/}
	            	<Route path="userCompose" component={Nesting}>
	            		<IndexRoute getComponent={UserCompose} />
	            		<Redirect from='*' to='/data/userCompose' />
	            	</Route>

	            	{/*流量分布*/}
	            	<Route path="flowDistribution" component={Nesting}>
	            		<IndexRoute getComponent={FlowDistribution} />
	            		<Redirect from='*' to='/data/FlowDistribution' />
	            	</Route>

	            	{/*用户质量*/}
	            	<Route path="userMass" component={Nesting}>
	            		<IndexRoute getComponent={UserMass} />
	            		<Redirect from='*' to='/data/userMass' />
	            	</Route>

	            	{/*站外唤醒*/}
	            	<Route path="awaken" component={Nesting}>
	            		<IndexRoute getComponent={Awaken} />
	            		<Redirect from='*' to='/data/awaken' />
	            	</Route>

	            	{/*终端品牌*/}
	            	<Route path="terminalBrand" component={Nesting}>
	            		<IndexRoute getComponent={TerminalBrand} />
	            		<Redirect from='*' to='/data/terminalBrand' />
	            	</Route>
	            	
	            	{/*广告曝光*/}
	            	<Route path="adImpression" component={Nesting}>
	            		<IndexRoute getComponent={AdImpression} />
	            		<Redirect from='*' to='/data/adImpression' />
	            	</Route>

	            	{/*渠道ROI*/}
	            	<Route path="channelRoi" component={Nesting}>
	            		<IndexRoute getComponent={ChannelRoi} />
	            		<Redirect from='*' to='/data/channelRoi' />
	            	</Route>

	            	{/*KPI报表*/}
	            	<Route path="kpi" component={Nesting}>
	            		<IndexRoute getComponent={KpiDetail} />
	            	</Route>
	            </Route>

	        	{/*渠道管理开始*/}
	            <Route path="manager" component={ManagerLeftNav} 
	            	onEnter={
		            	(nextState, replace) => {
		            		let key = "2"; 		
		            		isAllow(key, replace);
		            	}
	            }>
	            	<IndexRedirect to="channelList" />
	            	{/*渠道列表*/}
					<Route  path="channelList" component={Nesting}>
	            		<IndexRoute getComponent={ChannelList} />

	            		<Route path="create" getComponent={ChannelListCreate}></Route>

	            		<Route path="edit/:id" getComponent={ChannelListEdit}></Route>

	            		<Redirect from='*' to='/manager/channelList' />
	            	</Route>
	            	{/*渠道分组*/}
	            	<Route  path="channelGroup" component={Nesting}>

	            		<IndexRoute getComponent={ChannelGroup} />

	            		<Route path="create" getComponent={ChannelGroupCreate}></Route>

	            		<Route path="edit/:id" getComponent={ChannelGroupEdit}></Route>

	            		<Redirect from='*' to='/manager/channelGroup' />
	            	</Route>
	            	{/*短链管理*/}
	            	<Route  path="shortLink" component={Nesting}>
	            		<IndexRoute getComponent={ShortLink} />
	            		<Route path="create" getComponent={ShortLinkCreate}></Route>
	            		<Redirect from='*' to='/manager/shortLink' />
	            	</Route>

	            	{/*渠道成本*/}
	            	<Route  path="channelCost" component={Nesting}>
	            		<IndexRoute getComponent={ChannelCost} />
	            		<Redirect from='*' to='/manager/channelCost' />
	            	</Route>
	            </Route>

	        	{/*系统管理开始*/}
	            <Route path="sys" component={SysLeftNav} onEnter={
	            	(nextState, replace) => {
	            		let key = "3"; 
	            		isAllow(key, replace);
	            	}
	            }>
	            	<IndexRedirect to="modal" />
	            	{/*机型管理*/}
					<Route  path="modal" component={Nesting}>
	            		<IndexRoute getComponent={ModalManager} />
	            		<Route path="create" getComponent={ModalManagerCreate}></Route>
	            		<Route path="edit/:firm/:brand" getComponent={ModalManagerEdit}></Route>
	            		<Redirect from='*' to='/sys/modal' />
	            	</Route>

	            </Route>

	        	{/*用户管理开始*/}
	            <Route path="user" component={UserLeftNav} onEnter={
	            	(nextState, replace) => {
	            		let key = "4"; 		
	            		isAllow(key, replace);
	            	}
	            }>
	            	<IndexRedirect to="list" />
	            	{/*用户列表*/}
	            	<Route path="list" component={Nesting}>

	            		<IndexRoute getComponent={UserListIndex} />

	            		<Route  path="create" getComponent={CreateUser}></Route>
	            		<Route  path="edit/:id" getComponent={EditUser}></Route>

	            		<Redirect from='*' to='/user/list' />

	            	</Route>
	            </Route>


	            <Route path="noallow" getComponent={NoAllow} onEnter={
	            	(nextState, replace) => {
	            		doAllow(replace);
	            	}
	            }></Route>
			  
			  </Route>
			  <Redirect from='*' to='data' />
			</Router>
			</div>
 		);
 	}
 }