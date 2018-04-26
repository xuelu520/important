import React from 'react';

import {
	Layout,
	Menu,
	Breadcrumb,
	Icon,
	Affix
} from 'antd';

const {
	SubMenu
} = Menu;
const {
	Header,
	Content,
	Sider
} = Layout;

import {
	Router,
	Route,
	IndexRoute,
	IndexLink
} from 'react-router';

import {
	connect
} from 'react-redux';

import {
	bindActionCreators
} from 'redux';


import * as actionCreators from '../../actions/userList/userList';

import "../../theme/topNav/topNav.css";

class topNav extends React.Component {


	constructor(props) {
		super(props);
	}

	numberToString() {

		var key = this.props.value + '';

		return key;
	}


	topNavList() {

		var arr = [];
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

		winArr.map((v, k) => {
			list.map((av, ak) => {
				if (v == av.key) {
					arr.push(<Menu.Item key={av.value}>
							<IndexLink to={av.url} activeClassName="active">{av.cnName}</IndexLink>
						</Menu.Item>)
				}
			});
		});

		return arr;
	}

	clickLogout() {
		window.location.href = "/logout.do";
	}



	render() {

		console.log(this.props.children, 'this.props.children');

		var topNavList = this.topNavList();

		return (
			<Affix offsetTop={120} onChange={affixed => console.log(affixed)}>
			<Header className = "header" >



			<div className="logo" /> <
			Menu theme = "dark"
			mode = "horizontal"
			defaultSelectedKeys = {
				[this.props.value]
			}
			style = {
				{
					lineHeight: '64px',
					float: "left",
					marginLeft: "30%"
				}
			} >
			{
				topNavList
			} 
			</Menu> 
			<div className = "header-user" >
			<span className="userName">{window.userInfo.data.name}</span> | <a href="javascript:void(0);" onClick={this.clickLogout.bind(this)} className="logout">退出</a> 
			</div> 
			</Header>
			</Affix>

		);
	}
}

//redux state
const mapStateToProps = (state) => {
	return {
		userList: state.userList
	}
};

//redux action
const mapDispatchToProps = (dispatch, ownProps) => {
	//全量
	return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(topNav);