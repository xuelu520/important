import React from 'react';
import {
	Layout,
	Menu,
	Icon,
	Affix
} from 'antd';
const {
	SubMenu
} = Menu;
const {
	Sider
} = Layout;

import {
	IndexLink,
	Link
} from 'react-router';
export default class dataLeftNav extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		var hashValue = '?' + this.props.location.key;

		return (
			<Layout>
			<Sider width={180} className="leftNav"  style={{ overflow: 'hidden', height: '100vh', position: 'fixed',top:60, left: 0 }}>
        <Menu
          mode="inline"
          selectedKeys={this.props.location.pathname.split("/")}
          style={{ height: '100%', borderRight: 0 }}
        >
	    	<Menu.Item key="profile">
	    		<IndexLink to="/data/profile" activeClassName="active"><Icon type="profile" />用户概况</IndexLink>

	    		{/*<IndexLink to={{pathname: "/data/profile/newUser/2",hash: '?'+Math.random().toString(15).substr(3).slice(1,7)}} activeClassName="active"><Icon type="team" />用户概况</IndexLink>*/}
	    		
	    	</Menu.Item>

	    	<Menu.Item key="allTrend">
	    		<IndexLink to="/data/allTrend" activeClassName="active"><Icon type="line-chart" />整体趋势</IndexLink>
	    	</Menu.Item>

	    	<Menu.Item key="retentionAnalysis">
	    		<IndexLink to="/data/retentionAnalysis" activeClassName="active"><Icon type="exception" />留存分析</IndexLink>
	    	</Menu.Item>

	    	<Menu.Item key="userCompose">
	    		{/*<IndexLink to="/data/userCompose" activeClassName="active"><Icon type="team" />用户构成</IndexLink>*/}
	    		<IndexLink to="/data/userCompose" activeClassName="active"><Icon type="bar-chart" />用户构成</IndexLink>
	    	</Menu.Item>

	    	<Menu.Item key="flowDistribution">
	    		<IndexLink to="/data/flowDistribution" activeClassName="active"><Icon type="pie-chart" />流量分布</IndexLink>
	    	</Menu.Item>

	    	<Menu.Item key="userMass">
	    		<Link to="/data/userMass" activeClassName="active"><Icon type="safety" />用户质量</Link>
	    	</Menu.Item>

	    	<Menu.Item key="awaken">
	    		<IndexLink to="/data/awaken" activeClassName="active"><Icon type="fork" />站外唤醒</IndexLink>
	    	</Menu.Item>

	    	<Menu.Item key="terminalBrand">
	    		<IndexLink to="/data/terminalBrand" activeClassName="active"><Icon type="trademark" />终端品牌</IndexLink>
	    	</Menu.Item>

	    	<Menu.Item key="adImpression">
	    		<IndexLink to="/data/adImpression" activeClassName="active"><Icon type="laptop" />广告曝光</IndexLink>
	    	</Menu.Item>

	    	<Menu.Item key="channelRoi">
	    		<IndexLink to="/data/channelRoi" activeClassName="active"><Icon type="wallet" />渠道ROI</IndexLink>
	    	</Menu.Item>

	    	<Menu.Item key="kpi">
	    		<IndexLink to="/data/kpi" activeClassName="active" ><Icon type="area-chart" />KPI报表</IndexLink>
	    	</Menu.Item>	    	

        </Menu>
      </Sider>

      {this.props.children}
      </Layout>
		);
	}
}