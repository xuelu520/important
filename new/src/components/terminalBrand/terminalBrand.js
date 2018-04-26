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
	Alert,
	Divider,
	notification,
	Modal,
	Card,
	Radio,
	LocaleProvider
} from 'antd';

const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;

import {
	getDownloadName,
	downloadExcle,
	dealDownloadTitle,
	dealDownloadData,
	dealDownloadColumns
} from '../../common/channelManagerUtil';

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
	getFirmList,
	getBrandList,
	dealConfigColumns
} from '../../common/utils';

import * as actionCreators from '../../actions/terminalBrand/terminalBrand';

class terminalBrand extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		NProgress.start();

		var groupListData = {
			appCode: this.props.terminalBrand.appCode,
			channelGroup: this.props.terminalBrand.channelGroup,
			channelCategory: this.props.terminalBrand.channelCategory
		}

		this.props.getChannelGroupList(groupListData);

		var firmData = {
			firm: this.props.terminalBrand.firm,
			brand: this.props.terminalBrand.brand
		}

		this.getFirmList(firmData);

		var chartsData = {
			appCode: this.props.terminalBrand.appCode,
			brand: this.props.terminalBrand.brand,
			channelCategory: this.props.terminalBrand.channelCategory,
			channelName: this.props.terminalBrand.channelName,
			endDate: this.props.terminalBrand.endDate,
			firm: this.props.terminalBrand.firm,
			startDate: this.props.terminalBrand.startDate,
			trendType: this.props.terminalBrand.trendType
		}

		this.getCharts(chartsData);

		var tablesData = {
			appCode: this.props.terminalBrand.appCode,
			brand: this.props.terminalBrand.brand,
			channelCategory: this.props.terminalBrand.channelCategory,
			channelName: this.props.terminalBrand.channelName,
			endDate: this.props.terminalBrand.endDate,
			firm: this.props.terminalBrand.firm,
			startDate: this.props.terminalBrand.startDate
		}

		this.getTables(tablesData);
	}

	componentDidUpdate() {
		this.getChartShow();
		console.log(this.props.terminalBrand.chartsData, 'this.props.terminalBrand.chartsData');
	}

	componentDidMount() {
		NProgress.done();
	}

	componentWillUpdate(nextProps) {

		if (nextProps.terminalBrand.excelData != this.props.terminalBrand.excelData) {
			let downloadTitles = dealDownloadTitle(this.props.terminalBrand.columns);
			let helperColumns = dealDownloadColumns(this.props.terminalBrand.columns);
			let downloadDatas = dealDownloadData(nextProps.terminalBrand.excelData, helperColumns);

			downloadExcle(downloadDatas, downloadTitles, this.fileName);
		}
	}

	getTables(data) {
		this.props.getTables(data);
	}

	getChartShow() {

		if (this.props.terminalBrand.chartsData.length != 0) {

			var data = this.parseData();
			var myChart = echarts.init(this.refs['charts' + this.props.terminalBrand.trendType]);
			var config = Line(data);
			myChart.setOption(config);
			window.onresize = myChart.resize;
		} else {
			if (this.props.terminalBrand.chartNoData) {
				this.refs.charts.innerHTML = '<div style="text-align:center">没有查询到相关数据</div>';
			}
		}
	}


	parseData() {

		var trendType = this.props.terminalBrand.trendType;

		var db = Taffy(this.props.terminalBrand.chartsData);
		var data = db().order("day").get();
		db = Taffy(data);
		var xAxis = db().distinct("day");
		var series = [];

		if (trendType == '1') {
			name = '新增用户';
			series.push({
				"name": name,
				"type": "line",
				"stack": name,
				"data": db().select('newUser')
			});
		} else if (trendType == '2') {
			name = '新增用户';
			series.push({
				"name": name,
				"type": "line",
				"stack": name,
				"data": db().select('activeUser')
			});
		} else {
			name = '流失用户';
			series.push({
				"name": name,
				"type": "line",
				"stack": name,
				"data": db().select('loseUser')
			});
		}



		var data = {
			"names": name,
			"xAxis": xAxis,
			"series": series
		}

		return data;
	}

	getCharts(data) {
		this.props.getCharts(data);
	}

	handleTableChange(pagination, filters, sorter) {
		var data = {

			offset: pagination.current

		}

		this.props.setOffset(data)
	}

	getFirmList(data) {
		this.props.getFirmList(data, this.getBrandList.bind(this));
	}

	getBrandList(data) {
		console.log(data);

		this.props.getBrandList(data);
	}

	getChannelGroupList(data) {

		this.props.getChannelGroupList(data);
	}

	getChannelList(data) {
		console.log(data, 'getChannelList');
	}

	changeOs(value) {

		var data = {
			appCode: value,
			channelCategory: "",
			channelGroup: "",
			channelName: ""
		}

		this.props.changeOs(data, this.getChannelGroupList.bind(this));
	}

	changeChannelCategory(value) {
		var data = {
			appCode: this.props.terminalBrand.appCode,
			channelCategory: value,
			channelGroup: "",
			channelName: ""
		}

		this.props.changeChannelCategory(data, this.getChannelGroupList.bind(this));
	}

	handleChange(value) {

		console.log(value, 'value');

		var data = {
			appCode: this.props.terminalBrand.appCode,
			channelGroup: value,
			channelCategory: this.props.terminalBrand.channelCategory
		}

		this.props.getChannelGroupList(data)
	}

	searchChannel(value) {
		console.log(value, 'value');
		var data = {
			appCode: this.props.terminalBrand.appCode,
			channelCategory: this.props.terminalBrand.channelCategory,
			channelGroup: this.props.terminalBrand.channelGroup,
			channelName: value
		}

		this.props.searchChannel(data);
	}

	changeFirm(value) {
		console.log(value, 'value');
		var firmData = {
			firm: value,
			brand: ""
		}

		this.getFirmList(firmData);

	}

	changeBrand(value) {
		console.log(value, 'value');
		var data = {
			firm: this.props.terminalBrand.firm,
			brand: value
		}

		this.props.getBrandList(data);

	}

	/**
	 * 开始时间和结束时间切换
	 * @method changeDate
	 * @param value {Object}
	 * @param dateString {Array}
	 */
	changeDate(value, dateString) {
		console.log(dateString);
		if (dateString[1] > this.props.terminalBrand.maxDate) {
			notification['error']({
				message: '日期错误',
				description: '超出日期选择范围',
			});
		} else {
			this.props.setDate(dateString);
		}


	}

	clickQuery() {
		console.log('查询');
		var chartsData = {
			appCode: this.props.terminalBrand.appCode,
			brand: this.props.terminalBrand.brand,
			channelCategory: this.props.terminalBrand.channelCategory,
			channelName: this.props.terminalBrand.channelName,
			endDate: this.props.terminalBrand.endDate,
			firm: this.props.terminalBrand.firm,
			startDate: this.props.terminalBrand.startDate,
			trendType: this.props.terminalBrand.trendType
		}

		this.getCharts(chartsData);

		var tablesData = {
			appCode: this.props.terminalBrand.appCode,
			brand: this.props.terminalBrand.brand,
			channelCategory: this.props.terminalBrand.channelCategory,
			channelName: this.props.terminalBrand.channelName,
			endDate: this.props.terminalBrand.endName,
			firm: this.props.terminalBrand.firm,
			startDate: this.props.terminalBrand.startDate
		}

		this.props.setOffset({
			offset: 1
		});

		this.getTables(tablesData);
	}

	changeTab(value) {
		console.log(value, 'value');

		var chartsData = {
			appCode: this.props.terminalBrand.appCode,
			brand: this.props.terminalBrand.brand,
			channelCategory: this.props.terminalBrand.channelCategory,
			channelName: this.props.terminalBrand.channelName,
			endDate: this.props.terminalBrand.endDate,
			firm: this.props.terminalBrand.firm,
			startDate: this.props.terminalBrand.startDate,
			trendType: value
		}

		this.getCharts(chartsData);

	}

	getDownloadName(data) {
		let prefix = '终端品牌-';
		let fileName = '全部';

		if (data.brand) {
			fileName = data.brand;
		} else if (data.firm) {
			fileName = data.firm;
		} else if (data.channelName) {
			fileName = data.channelName;
		} else if (data.channelGroup) {
			fileName = data.channelGroup;
		} else if (data.channelCategory) {
			fileName = data.channelCategory == '1' ? '线上' : '线下';
		} else if (data.appCode) {
			fileName = data.appCode == '24' ? 'Android' : 'iOS';
		}

		return prefix + fileName + '-(' + data.startDate + '至' + data.endDate + ').xlsx';
	}

	clickDownload() {

		let data = {
			appCode: this.props.terminalBrand.appCode,
			brand: this.props.terminalBrand.brand,
			channelCategory: this.props.terminalBrand.channelCategory,
			channelName: this.props.terminalBrand.channelName,
			endDate: this.props.terminalBrand.endDate,
			firm: this.props.terminalBrand.firm,
			startDate: this.props.terminalBrand.startDate
		}

		this.fileName = this.getDownloadName(data);

		this.props.getDownLoadData(data);
	}

	render() {

		var pagination = {
			current: this.props.terminalBrand.offset,
			showSizeChanger: true
		}

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
	                    value={this.props.terminalBrand.appCode}
	                    className="online"
	                    onChange={this.changeOs.bind(this)}>
	                    <Option value="">全部</Option>
	                    <Option value="24">Android</Option>
	                    <Option value="27">iOS</Option>
	                  </Select>
	                </FormItem>
	                {/*操作系统结束*/}

	                {/*线上、线下开始*/}
	                <FormItem label="线上\线下">
	                  <Select 
	                    placeholder="请选择线上线下" 
	                    dropdownMatchSelectWidth={true}
	                    value={this.props.terminalBrand.channelCategory}
	                    onChange={this.changeChannelCategory.bind(this)}
	                    className="appCode"
	                    >
	                    <Option value="">全部</Option>
	                    <Option value="1">线上</Option>
	                    <Option value="2">线下</Option>
	                  </Select>
	                </FormItem>
	                {/*线上、线下结束*/}

	            	{/*渠道组开始*/}
	                <FormItem label="渠道组">
	                  <Select 
	                    showSearch={true}
	                    placeholder="搜索渠道组" 
	                    dropdownMatchSelectWidth={true}
	                    value={this.props.terminalBrand.channelGroup}
	                    className="channelGroup"
	                    optionFilterProp="children"
	                    onChange={this.handleChange.bind(this)}>
	                    <Option value="">全部</Option>
	                    {/*渠道组列表*/}
	                    {renderGroupList(this.props.terminalBrand.channelGroupList)}
	                  </Select>
	                </FormItem>
	                {/*渠道组结束*/}

	                {/*搜索渠道开始*/}
	                <FormItem label="">
	                    <Select 
	                    mode="combobox"
	                    placeholder="搜索渠道名称"
	                    notFoundContent="暂无相关数据"
	                    className="searchChannel"
	                    defaultActiveFirstOption={false}
	                    showArrow={false}
	                    value={this.props.terminalBrand.channelName}
	                    filterOption={false}
	                    onChange={this.searchChannel.bind(this)}
	                     >
	                     {/* {options}*/}
	                     {getChannelList(this.props.terminalBrand.channelList)}
	                  </Select>
	                </FormItem>
	                {/*搜索渠道结束*/}

	                {/*厂商开始*/}
	                <FormItem label="厂商">
	                  <Select 
	                    placeholder="请选择厂商" 
	                    dropdownMatchSelectWidth={true}
	                    value={this.props.terminalBrand.firm}
	                    onChange={this.changeFirm.bind(this)}
	                    className="appCode"
	                    >
{/*	                    <Option value="">全部</Option>
	                    <Option value="1">线上</Option>
	                    <Option value="2">线下</Option>*/}
						<Option value="">全部</Option>
	                    {getFirmList(this.props.terminalBrand.firmList)}
	                  </Select>
	                </FormItem>
	                {/*厂商结束*/}

	            	{/*品牌开始*/}
	                <FormItem label="品牌">
	                  <Select 
	                    placeholder="请选择厂商" 
	                    dropdownMatchSelectWidth={true}
	                    value={this.props.terminalBrand.brand}
	                    onChange={this.changeBrand.bind(this)}
	                    className="appCode"
	                    >
	                    <Option value="">全部</Option>
{/*	                    <Option value="">全部</Option>
	                    <Option value="1">线上</Option>
	                    <Option value="2">线下</Option>*/}

	                    {getBrandList(this.props.terminalBrand.brandList)}
	                  </Select>
	                </FormItem>
	                {/*品牌结束*/}

	                {/*日历组件开始*/}
	                <FormItem label="" >
	                  <RangePicker 
	                    value={[moment(this.props.terminalBrand.startDate, dateFormat), moment(this.props.terminalBrand.endDate, dateFormat)]}
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
  				{/*筛选区域结束*/}
  				 { /*图表模块开始*/ }
          <Content className="channel_charts">
            {/*todo TabPane */}
            <Tabs onChange={this.changeTab.bind(this)} type="card" activeKey={this.props.terminalBrand.trendType +''}>
              <TabPane tab="新增用户" key="1">
                <Spin spinning={this.props.terminalBrand.echartLoading}>
                  <div id="chart1" ref="charts1" style={{width:"100%", minHeight: "300px" }}>
                    
                  </div>
                </Spin>
              </TabPane>
              <TabPane tab="活跃用户" key="2">
                <Spin spinning={this.props.terminalBrand.echartLoading}>
                  <div id="chart2" ref="charts2" style={{width:"100%", minHeight: "300px" }}>
                    
                  </div>
                </Spin>
              </TabPane>
              <TabPane tab="流失用户" key="3">
                <Spin spinning={this.props.terminalBrand.echartLoading}>
                  <div id="chart3" ref="charts3" style={{width:"100%", minHeight: "300px" }}>
                    
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
              <Button type="primary" style={{float:"right"}} icon="download" onClick={this.clickDownload.bind(this)}>下载</Button>
            </div>

            <Table 
              loading={this.props.terminalBrand.tableLoading} 
              locale={{"emptyText": "暂无数据"}} 
              columns={dealConfigColumns(this.props.terminalBrand.columns)} 
              dataSource={this.props.terminalBrand.tablesData}
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
		terminalBrand: state.qReducer.terminalBrand
	}
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
	//全量
	return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(terminalBrand);