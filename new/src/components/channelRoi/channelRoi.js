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
	notification,
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

import * as actionCreators from '../../actions/channelRoi/channelRoi';

class channelRoi extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		NProgress.start();

		var dataCharts = {
			appCode: this.props.channelRoi.appCode,
			channelName: this.props.channelRoi.channelName,
			endDate: this.props.channelRoi.endDate,
			startDate: this.props.channelRoi.startDate
		};
		this.getCharts(dataCharts);

		var tableData = {
			appCode: this.props.channelRoi.appCode,
			channelName: this.props.channelRoi.channelName,
			endDate: this.props.channelRoi.endDate,
			startDate: this.props.channelRoi.startDate,
			offset: this.props.channelRoi.offset,
			limit: this.props.channelRoi.limit
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
		if (nextProps.channelRoi.excelData != this.props.channelRoi.excelData) {
			let downloadTitles = dealDownloadTitle(this.props.channelRoi.columns);
			let helperColumns = dealDownloadColumns(this.props.channelRoi.columns);
			let arr = [];
			nextProps.channelRoi.excelData.map((v, k) => {
				if (v.unitPrice) {
					v.roi = (v.adIncome / v.unitPrice).toFixed(2);
					v.roi = parseFloat(v.roi, 10);
				}
				arr.push(v)
			})

			let downloadDatas = dealDownloadData(arr, helperColumns);
			downloadExcle(downloadDatas, downloadTitles, this.fileName);
		}
	}

	getTables(data) {
		this.props.getTables(data);
	}

	/**
	 * 图表数据解析
	 */
	parseData() {

		var db = Taffy(this.props.channelRoi.chartsData);
		var names = db().distinct("channelName");
		var xAxis = db().distinct("day");

		var series = [];

		names.map((v, k) => {

			var roi = db({
				"channelName": v
			}).select("roi");

			series.push({
				"name": v,
				"type": "line",
				"stack": v,
				"data": roi
			});
		});
		// });

		var data = {
			"names": names,
			"xAxis": xAxis,
			"series": series
		}

		return data;
	}

	getChartShow() {
		console.log(this.props.channelRoi, 'this.props.channelRoi');
		debugger;
		if (this.props.channelRoi.chartsData.length != 0) {
			var data = this.parseData();
			var myChart = echarts.init(this.refs.charts);
			var config = Line(data);
			myChart.setOption(config);
			window.onresize = myChart.resize;
		} else {
			if (this.props.channelRoi.chartsNoData) {
				this.refs.charts.innerHTML = '<div style="text-align:center">没有查询到相关数据</div>';
			}
		}
	}

	getCharts(data) {
		this.props.getCharts(data);
	}

	changeOs(value) {
		var data = {
			appCode: value,
			channelName: ""
		}

		this.props.changeOs(data);
	}

	/**
	 * 渠道搜索
	 * @method searchChannel
	 * @param value {String}
	 */
	searchChannel(value) {

		console.log(value);

		var data = {
			appCode: this.props.channelRoi.appCode,
			channelCategory: "",
			channelGroup: "",
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

		if (dateString[1] > this.props.channelRoi.maxDate) {

			notification['error']({
				message: '日期错误',
				description: '超出日期选择范围',
			});
		} else {
			this.props.setDate(dateString);
		}
		// this.props.setDate(this.props.profileList.Param, dateString);
	}

	clickQuery() {

		var dataCharts = {
			appCode: this.props.channelRoi.appCode,
			channelName: this.props.channelRoi.channelName,
			endDate: this.props.channelRoi.endDate,
			startDate: this.props.channelRoi.startDate
		};

		this.getCharts(dataCharts);

		var tableData = {
			appCode: this.props.channelRoi.appCode,
			channelName: this.props.channelRoi.channelName,
			endDate: this.props.channelRoi.endDate,
			startDate: this.props.channelRoi.startDate,
			offset: 1,
			limit: this.props.channelRoi.limit
		}

		this.getTables(tableData);
	}

	handleTableChange(pagination, filters, sorter) {

		var tableData = {
			appCode: this.props.channelRoi.appCode,
			channelName: this.props.channelRoi.channelName,
			endDate: this.props.channelRoi.endDate,
			startDate: this.props.channelRoi.startDate,
			offset: pagination.current,
			limit: pagination.pageSize
		}

		this.getTables(tableData);

	}

	getDownloadName(data) {
		let prefix = '渠道ROI-';
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
			appCode: this.props.channelRoi.appCode,
			channelName: this.props.channelRoi.channelName,
			endDate: this.props.channelRoi.endDate,
			startDate: this.props.channelRoi.startDate,
			offset: 1,
			limit: -1
		}


		this.fileName = this.getDownloadName(data);

		console.log(this.fileName);

		this.props.getDownLoadData(data);
	}

	render() {

		var pagination = {
			current: this.props.channelRoi.offset,
			pageSize: this.props.channelRoi.limit,
			total: this.props.channelRoi.total,
			defaultPageSize: this.props.channelRoi.limit,
			showSizeChanger: true
		}

		addKey(this.props.channelRoi.tableData, 'channelRoi' + new Date().getTime());

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
		                    value={this.props.channelRoi.appCode}
		                    className="online"
		                    onChange={this.changeOs.bind(this)}>
		                    <Option value="">全部</Option>
		                    <Option value="24">Android</Option>
		                    <Option value="27">iOS</Option>
		                  </Select>
		                </FormItem>
		                {/*操作系统结束*/}

		                {/*搜索渠道开始*/}
		                <FormItem label="">
		                    <Select 
		                    mode="combobox"
		                    placeholder="搜索渠道名称"
		                    notFoundContent="暂无相关数据"
		                    className="searchChannel"
		                    defaultActiveFirstOption={false}
		                    showArrow={false}
		                    value={this.props.channelRoi.channelName}
		                    filterOption={false}
		                    onChange={this.searchChannel.bind(this)}
		                     >
		                     {/* {options}*/}
		                     {getChannelList(this.props.channelRoi.channelList)}
		                  </Select>
		                </FormItem>
		                {/*搜索渠道结束*/}

		            	{/*日历组件开始*/}
						<FormItem label="" >
					      <RangePicker 
					        value={[moment(this.props.channelRoi.startDate, dateFormat), moment(this.props.channelRoi.endDate, dateFormat)]}
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
				{ /*筛选区域结束*/ }

  				{ /*图表模块开始*/ }
				<Content className="channel_charts">
					<Card title="新增用户Top10渠道的ROI"  noHovering={true} style={{minHeight:"380px"}}>
						<Spin spinning={this.props.channelRoi.chartsLoading}>
		                    <div ref="charts" style={{width:"100%", minHeight: "300px" }}>
		                      
		                    </div>
	                  	</Spin>
					</Card>
				</Content>
				{ /*图表模块结束*/ }

				{ /*表格模块开始*/ }
			      <Content className="channel_table">
			        <div style={{width:"100%", marginBottom: "20px"}} className="clearfix">
			          {/*下载Excel*/}
			          <Button type="primary" style={{float:"right"}} onClick={this.downloadExcel.bind(this)} icon="download">下载</Button>
			        </div>

			        <Table 
			          loading={this.props.channelRoi.tableLoading} 
			          locale={{"emptyText": "暂无数据"}} 
			          columns={dealConfigColumns(this.props.channelRoi.columns)} 
			          dataSource={this.props.channelRoi.tableData}
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
		channelRoi: state.qReducer.channelRoi
	}
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
	//全量
	return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(channelRoi);