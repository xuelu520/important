import React from 'react';

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

import Taffy from 'taffy';

import {
	getDownloadName,
	downloadExcle,
	dealDownloadTitle,
	dealDownloadData,
	dealDownloadColumns
} from '../../common/channelManagerUtil';

//asdfasd

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
	notification,
	Alert,
	Divider,
	Modal,
	Card,
	LocaleProvider
} from 'antd';

const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;

// //Echarts 组件
import echarts from 'echarts';



import {
	Line
} from '../../common/chartConfigs';

const {
	SubMenu
} = Menu;
const {
	Content
} = Layout;

const FormItem = Form.Item;
const Option = Select.Option;

import Moment from 'moment';

// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
Moment.locale('zh-cn');

const thunk = require('redux-thunk').default;

const {
	MonthPicker,
	RangePicker
} = DatePicker;

import moment from 'moment';

import NProgress from 'nprogress';

const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM';

//用户权限列表
import {
	renderGroupList,
	addKey,
	getChannelList,
	dealConfigColumns
} from '../../common/utils';

import * as actionCreators from '../../actions/userMass/userMass';


class userMass extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		NProgress.start();

		var dataCharts = {
			appCode: this.props.userMass.appCode,
			channelName: this.props.userMass.channelName,
			startDate: this.props.userMass.startDate,
			endDate: this.props.userMass.endDate,
			tab: this.props.userMass.tab
		}
		this.getCharts(dataCharts);

		var dataTables = {
			appCode: this.props.userMass.appCode,
			channelName: this.props.userMass.channelName,
			startDate: this.props.userMass.startDate,
			endDate: this.props.userMass.endDate,
			offset: this.props.userMass.offset,
			limit: this.props.userMass.limit
		}

		this.getTables(dataTables);
	}

	componentDidUpdate() {
		this.getChartShow();
	}

	componentDidMount() {
		NProgress.done();
	}

	componentWillUpdate(nextProps) {


		console.log(nextProps.userMass, 'nextProps.userMass');

		if (nextProps.userMass.excelData != this.props.userMass.excelData) {
			let downloadTitles = dealDownloadTitle(this.props.userMass.columns);
			let helperColumns = dealDownloadColumns(this.props.userMass.columns);
			let downloadDatas = dealDownloadData(nextProps.userMass.excelData, helperColumns);

			downloadExcle(downloadDatas, downloadTitles, this.fileName);
		}



	}

	getTables(data) {
		this.props.getTables(data);
	}

	getCharts(data) {
		this.props.getCharts(data);
	}

	getChartShow() {
		var tabId = this.props.userMass.tab;

		var name = "全部";
		if (this.props.userMass.chartsName) {
			name = this.props.userMass.chartsName;
		} else {
			name = "全部";
		}


		if (this.props.userMass.chartsData.length != 0) {
			var series = [];
			series.push({
				"name": name,
				"type": "line",
				"stack": name,
				"data": this.props.userMass.chartsData[0].value
			});

			var data = {
				"names": [name],
				"xAxis": this.props.userMass.chartsData[0].key,
				"series": series
			}

			//todo initToinit  EchartUpdate

			var myChart = echarts.init(this.refs['charts' + tabId]);
			var config = Line(data);
			myChart.setOption(config);
			window.onresize = myChart.resize;

		} else {

			if (this.props.userMass.chartsNoData) {
				this.refs['charts' + tabId].innerHTML = '<div style="text-align:center">没有查询到相关数据</div>';
			}

		}
	}

	changeOs(value) {

		var data = {
			appCode: value
		}

		if (value == "24") {
			data.channelName = "huawei_news";
		} else {
			data.channelName = "appstore";
		}

		this.props.changeOs(data);
	}

	searchChannel(value) {
		console.log(value);

		var data = {
			appCode: this.props.userMass.appCode,
			channelName: value
		}

		this.props.searchChannel(data);
	}

	/**
	 * 开始时间和结束时间切换
	 * @method changeDate
	 * @param value {Object}
	 * @param dateString {Array}
	 */
	changeDate(value, dateString) {
		console.log(dateString);

		if (dateString[1] > this.props.userMass.maxDate) {

			notification['error']({
				message: '日期错误',
				description: '超出日期选择范围',
			});

		} else {
			this.props.setDate(dateString);
		}

	}

	clickQuery() {
		var dataCharts = {
			appCode: this.props.userMass.appCode,
			channelName: this.props.userMass.channelName,
			startDate: this.props.userMass.startDate,
			endDate: this.props.userMass.endDate,
			tab: this.props.userMass.tab
		}

		this.getCharts(dataCharts);

		var dataTables = {
			appCode: this.props.userMass.appCode,
			channelName: this.props.userMass.channelName,
			startDate: this.props.userMass.startDate,
			endDate: this.props.userMass.endDate,
			offset: 1,
			limit: this.props.userMass.limit
		}

		this.getTables(dataTables);
	}

	changeTab(value) {
		var dataCharts = {
			appCode: this.props.userMass.appCode,
			channelName: this.props.userMass.chartsName,
			startDate: this.props.userMass.startDate,
			endDate: this.props.userMass.endDate,
			tab: value
		}
		this.getCharts(dataCharts);
	}


	handleTableChange(pagination, filters, sorter) {

		var tableData = {
			appCode: this.props.userMass.appCode,
			channelCategory: this.props.userMass.channelCategory,
			channelName: this.props.userMass.chartsName,
			endDate: this.props.userMass.endDate,
			startDate: this.props.userMass.endDate,
			limit: pagination.pageSize,
			offset: pagination.current
		}

		this.getTables(tableData);

	}

	getDownloadName(data) {
		let prefix = '用户质量-';
		let fileName = '全部';

		if (data.channelName) {
			fileName = data.channelName;
		} else if (data.appCode) {
			fileName = data.appCode == '24' ? 'Android' : 'iOS';
		}

		return prefix + fileName + '-(' + data.startDate + '至' + data.endDate + ')';
	}

	downloadExcel() {

		let data = {
			appCode: this.props.userMass.appCode,
			channelName: this.props.userMass.channelName,
			startDate: this.props.userMass.startDate,
			endDate: this.props.userMass.endDate,
			offset: 1,
			limit: -1
		}
		this.fileName = this.getDownloadName(data);

		this.props.getDownLoadData(data);
	}


	render() {

		var pagination = {
			current: this.props.userMass.offset,
			pageSize: this.props.userMass.limit,
			total: this.props.userMass.total,
			defaultPageSize: this.props.userMass.limit,
			showSizeChanger: true
		}

		addKey(this.props.userMass.tableData, 'userMass' + new Date().getTime());

		return (
			<Layout style={{marginLeft: 180,position: "relative", marginTop:60, overflow:"hidden"}}>
				{ /*筛选区域开始*/ }
  				<Content className="channel_filter">
  					<Form layout="inline">
  					{/*操作系统开始*/}
	                <FormItem label="操作系统">
	                  <Select 
	                    placeholder="操作系统选择" 
	                    dropdownMatchSelectWidth={true}  
	                    value={this.props.userMass.appCode}
	                    className="online"
	                    onChange={this.changeOs.bind(this)}>
	                    <Option value="24">Android</Option>
	                    <Option value="27">iOS</Option>
	                  </Select>
	                </FormItem>
	                {/*操作系统结束*/}


	                {/*搜索渠道开始*/}
	                <FormItem label="渠道">
	                    <Select 
	                    mode="combobox"
	                    placeholder="搜索渠道名称"
	                    notFoundContent="暂无相关数据"
	                    className="searchChannel"
	                    defaultActiveFirstOption={false}
	                    showArrow={false}
	                    value={this.props.userMass.channelName}
	                    filterOption={false}
	                    onChange={this.searchChannel.bind(this)}
	                     >
	                     {/* {options}*/}
	                     {getChannelList(this.props.userMass.channelList)}
	                  </Select>
	                </FormItem>
	                {/*搜索渠道结束*/}

	            	{/*日历组件开始*/}
	                <FormItem label="" >
	                  <RangePicker 
	                    value={[moment(this.props.userMass.startDate, dateFormat), moment(this.props.userMass.endDate, dateFormat)]}
	                    format={dateFormat}
	                    allowClear={false}
	                    onChange={this.changeDate.bind(this)}
	                    className = "channel_DataPicker"
	                  />
	                </FormItem>
	                {/*日历组件结束*/}
					<FormItem label="" >
	            	{/*查询开始*/}
	                <Button type="primary" size={"default"} onClick={this.clickQuery.bind(this)} >查询</Button>
	                {/*查询结束*/}
					</FormItem>
	                </Form>
  				</Content>
	  			{ /*图表模块开始*/ }
	          	<Content className="channel_charts">
		            {/*todo TabPane */}
		            <Tabs onChange={this.changeTab.bind(this)} type="card" activeKey={this.props.userMass.tab +''}>
		              <TabPane tab="健康度" key="1">
		                <Spin spinning={this.props.userMass.chartsLoading}>
		                  <div id="chart1" ref="charts1" style={{width:"100%", minHeight: "300px" }}>
		                    
		                  </div>
		                </Spin>
		              </TabPane>
		              <TabPane tab="活跃度" key="2">
		                <Spin spinning={this.props.userMass.chartsLoading}>
		                  <div id="chart2" ref="charts2" style={{width:"100%", minHeight: "300px" }}>
		                    
		                  </div>
		                </Spin>
		              </TabPane>
		              <TabPane tab="二次启动比" key="3">
		                <Spin spinning={this.props.userMass.chartsLoading}>
		                  <div id="chart3" ref="charts3" style={{width:"100%", minHeight: "300px" }}>
		                    
		                  </div>
		                </Spin>
		              </TabPane>

		              <TabPane tab="全量新增用户" key="4">
		                <Spin spinning={this.props.userMass.chartsLoading}>
		                  <div id="chart4" ref="charts4" style={{width:"100%", minHeight: "300px" }}>
		                    
		                  </div>
		                </Spin>
		              </TabPane>

		              <TabPane tab="新增用户作弊占比" key="5">
		                <Spin spinning={this.props.userMass.chartsLoading}>
		                  <div id="chart5" ref="charts5" style={{width:"100%", minHeight: "300px" }}>
		                    
		                  </div>
		                </Spin>
		              </TabPane>

		              <TabPane tab="核减后新增用户" key="6">
		                <Spin spinning={this.props.userMass.chartsLoading}>
		                  <div id="chart6" ref="charts6" style={{width:"100%", minHeight: "300px" }}>
		                    
		                  </div>
		                </Spin>
		              </TabPane>
		            </Tabs>
	          </Content>
	          {/*图表模块结束*/}

				{ /*表格模块开始*/ }
				  <Content className="channel_table">
				    <div style={{width:"100%", marginBottom: "20px"}} className="clearfix">
				      {/*下载Excel*/}
				      <Button type="primary" style={{float:"right"}} onClick={this.downloadExcel.bind(this)} icon="download">下载</Button>
				    </div>

				    <Table 
				      loading={this.props.userMass.tablesLoading} 
				      locale={{"emptyText": "暂无数据"}} 
				      columns={dealConfigColumns(this.props.userMass.columns)} 
				      dataSource={this.props.userMass.tableData}
				      pagination={pagination}  
				      onChange={this.handleTableChange.bind(this)}
				    />
				  </Content>
				{ /*表格模块结束*/ }
  			</Layout>
		);
	}
}

//将state.counter绑定到props的counter
const mapStateToProps = (state) => {
	return {
		userMass: state.qReducer.userMass
	}
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
	//全量
	return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(userMass);