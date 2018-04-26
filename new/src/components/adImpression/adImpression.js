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
	Alert,
	Divider,
	Modal,
	notification,
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

import * as actionCreators from '../../actions/adImpression/adImpression';

class adImpression extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		NProgress.start();

		var groupListData = {
			appCode: this.props.adImpression.appCode,
			channelCategory: this.props.adImpression.channelCategory
		}

		this.getGroupList(groupListData);
		this.props.getGroupList(groupListData);

		var chartsData = {
			appCode: this.props.adImpression.appCode,
			channelCategory: this.props.adImpression.channelCategory,
			channelName: this.props.adImpression.channelName,
			endDate: this.props.adImpression.endDate,
			startDate: this.props.adImpression.startDate
		}

		this.getCharts(chartsData);


		var tableData = {
			appCode: this.props.adImpression.appCode,
			channelCategory: this.props.adImpression.channelCategory,
			channelName: this.props.adImpression.channelName,
			endDate: this.props.adImpression.endDate,
			startDate: this.props.adImpression.endDate,
			limit: this.props.adImpression.limit,
			offset: this.props.adImpression.offset
		}

		this.getTables(tableData);
	}

	componentDidUpdate() {
		this.getChartShow();
	}

	componentDidMount() {
		NProgress.done();
	}

	componentWillUpdate(nextProps) {
		if (nextProps.adImpression.excelData != this.props.adImpression.excelData) {
			let downloadTitles = dealDownloadTitle(this.props.adImpression.columns);
			let helperColumns = dealDownloadColumns(this.props.adImpression.columns);
			let arr = [];
			nextProps.adImpression.excelData.map((v, k) => {
				if (v.expo60 != undefined && v.unitPrice != undefined) {
					v.roi = (v.expo60 / v.unitPrice).toFixed(2);
				} else {
					v.roi = "";
				}
				arr.push(v);
			})

			let downloadDatas = dealDownloadData(arr, helperColumns);

			downloadExcle(downloadDatas, downloadTitles, this.fileName);
		}
	}

	getGroupList(data) {
		this.props.getGroupList(data);
	}

	getTables(data) {
		this.props.getTables(data);
	}

	parseData() {
		var db = Taffy(this.props.adImpression.chartsData);
		var data = db().order("day").get();
		db = Taffy(data);
		var names = db().distinct("channelName");
		var xAxis = db().distinct("day");
		var series = [];

		names.map((v, k) => {

			var unitPrice = db({
				"channelName": v
			}).select("unitPrice");

			var expo60 = db({
				"channelName": v
			}).select("expo60");

			var rois = [];
			for (var i = 0; i < unitPrice.length; i++) {
				if (expo60[i] == undefined || unitPrice[i] == undefined) {
					rois.push('-');
				} else {
					rois.push((expo60[i] / unitPrice[i]).toFixed(2));
				}

			}

			series.push({
				"name": v,
				"type": "line",
				"stack": v,
				"data": rois
			});

		});

		var data = {
			"names": names,
			"xAxis": xAxis,
			"series": series
		}

		return data;
	}

	getChartShow() {
		if (this.props.adImpression.chartsData.length != 0) {
			var data = this.parseData();
			var myChart = echarts.init(this.refs.charts);
			var config = Line(data);
			myChart.setOption(config);
			window.onresize = myChart.resize;
		} else {
			if (this.props.adImpression.chartsNoData) {
				this.refs.charts.innerHTML = '<div style="text-align:center">没有查询到相关数据</div>';
			}
		}
	}


	getCharts(data) {
		this.props.getCharts(data);
	}

	changeOs(value) {



		console.log(value);

		var data = {
			appCode: value,
			channelCategory: "",
			channelGroup: "",
			channelName: ""
		};

		this.props.changeOs(data, this.getGroupList.bind(this));



	}

	changeChannelCategory(value) {
		console.log(value);
		var data = {
			appCode: this.props.adImpression.appCode,
			channelCategory: value,
			channelGroup: "",
			channelName: ""
		};

		this.props.changeChannelCategory(data, this.getGroupList.bind(this));

	}


	/**
	 * 搜索渠道组
	 * @method handleChange
	 * @param value {String}
	 */
	handleChange(value) {

		var data = {
			channelGroup: value
		}

		this.props.changeChannelGroup(data);
	}

	/**
	 * 渠道搜索
	 * @method searchChannel
	 * @param value {String}
	 */
	searchChannel(value) {
		console.log(value);


		var data = {
			appCode: this.props.adImpression.appCode,
			channelCategory: this.props.adImpression.channelCategory,
			channelGroup: this.props.adImpression.channelGroup,
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

		if (dateString[1] > this.props.adImpression.maxDate) {

			notification['error']({
				message: '日期错误',
				description: '超出日期选择范围',
			});

		} else {
			this.props.setDate(dateString);
		}


	}

	clickQuery() {
		var chartsData = {
			appCode: this.props.adImpression.appCode,
			channelCategory: this.props.adImpression.channelCategory,
			channelName: this.props.adImpression.channelName,
			endDate: this.props.adImpression.endDate,
			startDate: this.props.adImpression.startDate
		}

		this.getCharts(chartsData);


		var tableData = {
			appCode: this.props.adImpression.appCode,
			channelCategory: this.props.adImpression.channelCategory,
			channelName: this.props.adImpression.channelName,
			endDate: this.props.adImpression.endDate,
			startDate: this.props.adImpression.endDate,
			limit: this.props.adImpression.limit,
			offset: 1
		}

		this.getTables(tableData);
	}



	handleTableChange(pagination, filters, sorter) {

		var tableData = {
			appCode: this.props.adImpression.appCode,
			channelCategory: this.props.adImpression.channelCategory,
			channelName: this.props.adImpression.channelName,
			endDate: this.props.adImpression.endDate,
			startDate: this.props.adImpression.endDate,
			limit: pagination.pageSize,
			offset: pagination.current
		}

		this.getTables(tableData);
	}

	getTableData() {
		var arr = [];

		this.props.adImpression.tableData.map((v, k) => {

			if (v.expo60 != undefined && v.unitPrice != undefined) {
				v.roi = (v.expo60 / v.unitPrice).toFixed(2);
			} else {
				v.roi = "";
			}
			arr.push(v);
		});

		return arr;
	}

	getDownloadName(data) {
		let prefix = '广告曝光-';
		let fileName = '全部';

		if (data.channelName) {
			fileName = data.channelName;
		} else if (data.channelGroup) {
			fileName = data.channelGroup;
		} else if (data.channelCategory) {
			fileName = data.channelCategory == '1' ? '线上' : '线下';
		} else if (data.appCode) {
			fileName = data.appCode == '24' ? 'Android' : 'iOS';
		}

		return prefix + fileName + '-(' + data.startDate + '至' + data.endDate + ')';
	}

	downloadExcel() {


		let data = {
			appCode: this.props.adImpression.appCode,
			channelCategory: this.props.adImpression.channelCategory,
			channelName: this.props.adImpression.channelName,
			endDate: this.props.adImpression.endDate,
			startDate: this.props.adImpression.startDate,
			limit: -1,
			offset: 1
		}


		this.fileName = this.getDownloadName(data);


		this.props.getDownLoadData(data);
	}


	render() {


		var pagination = {
			current: this.props.adImpression.offset,
			pageSize: this.props.adImpression.limit,
			total: this.props.adImpression.total,
			defaultPageSize: this.props.adImpression.limit,
			showSizeChanger: true
		}

		addKey(this.props.adImpression.tableData, 'adImpression' + new Date().getTime());

		var tableData = this.getTableData();


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
	                    value={this.props.adImpression.appCode}
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
	                    value={this.props.adImpression.channelCategory}
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
	                    value={this.props.adImpression.channelGroup}
	                    className="channelGroup"
	                    optionFilterProp="children"
	                    onChange={this.handleChange.bind(this)}>
	                    <Option value="">全部</Option>
	                    {/*渠道组列表*/}
	                    {renderGroupList(this.props.adImpression.channelGroupList)}
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
	                    value={this.props.adImpression.channelName}
	                    filterOption={false}
	                    onChange={this.searchChannel.bind(this)}
	                     >
	                     {/* {options}*/}
	                     {getChannelList(this.props.adImpression.channelList)}
	                  </Select>
	                </FormItem>
	                {/*搜索渠道结束*/}

	            	{/*日历组件开始*/}
	                <FormItem label="" >
	                  <RangePicker 
	                    value={[moment(this.props.adImpression.startDate, dateFormat), moment(this.props.adImpression.endDate, dateFormat)]}
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
					<Card title="新增用户Top10渠道的60日内广告曝光/激活单价"  noHovering={true} style={{minHeight:"380px"}}>
						<Spin spinning={this.props.adImpression.chartsLoading}>
		                    <div ref="charts" style={{width:"100%", minHeight: "300px" }}>
		                      
		                    </div>
	                  	</Spin>
					</Card>
				</Content>
				{/*图表模块结束*/}

				{ /*表格模块开始*/ }
			      <Content className="channel_table">
			        <div style={{width:"100%", marginBottom: "20px"}} className="clearfix">

			          {/*下载Excel*/}
			          <Button type="primary" style={{float:"right"}} onClick={this.downloadExcel.bind(this)} icon="download">下载</Button>
			        </div>

			        <Table 
			          loading={this.props.adImpression.tablesLoading} 
			          locale={{"emptyText": "暂无数据"}} 
			          columns={dealConfigColumns(this.props.adImpression.columns)} 
			          dataSource={tableData}
			          pagination={pagination}
			          onChange={this.handleTableChange.bind(this)}
			          scroll={{ x: '130%' }}
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
		adImpression: state.Reducer.adImpression
	}
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
	//全量
	return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(adImpression);