import React from 'react';

import {
	Layout,
	Menu,
	Breadcrumb,
	Icon,
	Form,
	Button,
	Select,
	Table,
	DatePicker,
	Tabs,
	Spin,
	Alert,
	Divider,
	Modal,
	Input,
	LocaleProvider
} from 'antd';

const {
	Content
} = Layout;



export default class noAllow extends React.Component {


	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Layout>
 <Content style={{ background: '#ffffff', padding: 24, paddingTop:"80px", margin: 0, minHeight:'0px'}}>

 	 <Alert
      message="没有权限"
      description="请联系杜鑫（bjduxin@corp.netease.com）开通！"
      type="warning"
      showIcon
    />
 </Content>


			</Layout>
		);
	}
}