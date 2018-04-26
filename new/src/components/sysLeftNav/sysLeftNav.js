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
	    	<Menu.Item key="modal">
	    		<IndexLink to="/sys/modal" activeClassName="active"><Icon type="mobile" />机型管理</IndexLink>
	    	</Menu.Item>


        </Menu>
      </Sider>

      {this.props.children}
      </Layout>
		);
	}
}