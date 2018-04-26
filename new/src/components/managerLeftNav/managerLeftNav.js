import React from 'react';
import {
	Layout,
	Menu,
	Icon
} from 'antd';
const {
	SubMenu
} = Menu;
const {
	Sider
} = Layout;

import {
	IndexLink
} from 'react-router';
export default class dataLeftNav extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Layout>
			<Sider width={180} style={{ overflow: 'hidden', height: '100vh', position: 'fixed',top:60, left: 0 }}>
	        <Menu
	          mode="inline"
	          selectedKeys={this.props.location.pathname.split("/")}
	          style={{ height: '100%', borderRight: 0 }}
	        >
	    	<Menu.Item key="channelList">
	    		<IndexLink to="/manager/channelList" activeClassName="active"><Icon type="appstore-o" />渠道列表</IndexLink>
	    	</Menu.Item>

	    	<Menu.Item key="channelGroup">
	    		<IndexLink to="/manager/channelGroup" activeClassName="active"><Icon type="bars" />渠道分组</IndexLink>
	    	</Menu.Item>

	    	<Menu.Item key="shortLink">
	    		<IndexLink to="/manager/shortLink" activeClassName="active"><Icon type="link" />短链管理</IndexLink>
	    	</Menu.Item>

	    	<Menu.Item key="channelCost">
	    		<IndexLink to="/manager/channelCost" activeClassName="active"><Icon type="pay-circle-o" />渠道成本</IndexLink>
	    	</Menu.Item>

        </Menu>
      </Sider>

      {this.props.children}
      </Layout>
		);
	}
}