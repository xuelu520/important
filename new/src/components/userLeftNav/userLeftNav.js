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
export default class userLeftNav extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props.location.pathname, 'this.props.location.pathname');
		return (
			<Layout>
				<Sider width={180} style={{ overflow: 'auto', height: '100vh', position: 'fixed', top:60, left:0}}>
		        <Menu
		          mode="inline"
		          selectedKeys={this.props.location.pathname.split("/")}
		          style={{ height: '100%', borderRight: 0 }}
		        >
			    	<Menu.Item key="list">
			    		<IndexLink to="/user/list" activeClassName="active"><Icon type="team" />用户列表</IndexLink>
			    	</Menu.Item>
		        </Menu>
		      </Sider>
		      {this.props.children}
	      </Layout>
		);
	}
}