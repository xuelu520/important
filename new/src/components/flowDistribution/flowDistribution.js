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
	notification,
	Divider,
	Modal,
	Card,
	Col,
	Row,
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

//引入chart
require("echarts/lib/chart/map");
require('echarts/map/js/china');


import {
	Map,
	Pie,
	Line,
	Bar
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
	getChannelList
} from '../../common/utils';

import * as actionCreators from '../../actions/flowDistribution/flowDistribution';

class flowDistribution extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {

		NProgress.start();
		this.globalGet();
	}

	globalGet() {
		var groupListParam = {
			appCode: this.props.flowDistribution.appCode,
			channelGroup: this.props.flowDistribution.channelGroup,
			channelCategory: this.props.flowDistribution.channelCategory
		}

		this.getChannelGroup(groupListParam);

		var hoverParam = {
			appCode: this.props.flowDistribution.appCode,
			channelCategory: this.props.flowDistribution.channelCategory,
			channelGroup: this.props.flowDistribution.channelGroup,
			channelName: this.props.flowDistribution.channelName,
			endDate: this.props.flowDistribution.endDate
		}

		this.getHour(hoverParam);

		var newModalData = {
			appCode: this.props.flowDistribution.appCode,
			channelCategory: this.props.flowDistribution.channelCategory,
			channelGroup: this.props.flowDistribution.channelGroup,
			channelName: this.props.flowDistribution.channelName,
			endDate: this.props.flowDistribution.endDate
		}
		this.newModal(newModalData);

		var activeModalData = {
			appCode: this.props.flowDistribution.appCode,
			channelCategory: this.props.flowDistribution.channelCategory,
			channelGroup: this.props.flowDistribution.channelGroup,
			channelName: this.props.flowDistribution.channelName,
			endDate: this.props.flowDistribution.endDate
		}

		this.activeModal(newModalData);

		var netNewUserData = {
			appCode: this.props.flowDistribution.appCode,
			channelCategory: this.props.flowDistribution.channelCategory,
			channelGroup: this.props.flowDistribution.channelGroup,
			channelName: this.props.flowDistribution.channelName,
			endDate: this.props.flowDistribution.endDate
		}

		this.netNewUser(netNewUserData);


		var areaParam = {
			appCode: this.props.flowDistribution.appCode,
			channelCategory: this.props.flowDistribution.channelCategory,
			channelGroup: this.props.flowDistribution.channelGroup,
			channelName: this.props.flowDistribution.channelName,
			endDate: this.props.flowDistribution.endDate
		}

		this.getArea(areaParam);
	}

	componentDidUpdate() {
		this.getChartShow1();
		this.getChartShow2();

		this.getChartShow3();


		this.getChartShow4();


		this.getChartShow5();


		this.getChartShow6();


		this.getChartShow7();

		this.getChartShow8();

		// newUserModel
	}

	componentDidMount() {
		NProgress.done();

		this.myChart1 = echarts.init(this.refs.charts1);
		this.myChart2 = echarts.init(this.refs.charts2);
		this.myChart3 = echarts.init(this.refs.charts3);
		this.myChart4 = echarts.init(this.refs.charts4);
		this.myChart5 = echarts.init(this.refs.charts5);
		this.myChart6 = echarts.init(this.refs.charts6);
		this.myChart7 = echarts.init(this.refs.charts7);
		this.myChart8 = echarts.init(this.refs.charts8);


		window.onresize = function() {
			this.myChart1.resize();
			this.myChart2.resize();
			this.myChart3.resize();
			this.myChart4.resize();
			this.myChart5.resize();
			this.myChart6.resize();
			this.myChart7.resize();
			this.myChart8.resize();
		}.bind(this);
	}

	componentWillUpdate(nextProps) {


		this.downExcel1(nextProps);

		this.downExcel2(nextProps);

		this.downExcel3(nextProps);

		this.downExcel4(nextProps);
		this.downExcel5(nextProps);
		this.downExcel6(nextProps);
		this.downExcel7(nextProps);
		this.downExcel8(nextProps);

		// if (nextProps.profileList.Result.excelData != this.props.profileList.Result.excelData) {
		// 	let downloadTitles = dealDownloadTitle(this.props.profileList.TableColumns.tableColumns);
		// 	let helperColumns = dealDownloadColumns(this.props.profileList.TableColumns.tableColumns);
		// 	let downloadDatas = dealDownloadData(nextProps.profileList.Result.excelData, helperColumns);

		// 	downloadExcle(downloadDatas, downloadTitles, this.fileName);
		// }
	}

	downExcel1(nextProps) {
		if (nextProps.flowDistribution.excel1 != this.props.flowDistribution.excel1) {


			let downloadTitles = dealDownloadTitle(this.props.flowDistribution.excelHead1);
			let helperColumns = dealDownloadColumns(this.props.flowDistribution.excelHead1);
			let downloadDatas = dealDownloadData(nextProps.flowDistribution.excel1, helperColumns);

			downloadExcle(downloadDatas, downloadTitles, this.fileName);
		}
	}

	downExcel2(nextProps) {
		if (nextProps.flowDistribution.excel2 != this.props.flowDistribution.excel2) {

			let downloadTitles = dealDownloadTitle(this.props.flowDistribution.excelHead2);
			let helperColumns = dealDownloadColumns(this.props.flowDistribution.excelHead2);
			let downloadDatas = dealDownloadData(nextProps.flowDistribution.excel2, helperColumns);

			downloadExcle(downloadDatas, downloadTitles, this.fileName);
		}
	}

	downExcel3(nextProps) {
		if (nextProps.flowDistribution.excel3 != this.props.flowDistribution.excel3) {

			let downloadTitles = dealDownloadTitle(this.props.flowDistribution.excelHead3);
			let helperColumns = dealDownloadColumns(this.props.flowDistribution.excelHead3);
			let downloadDatas = dealDownloadData(nextProps.flowDistribution.excel3, helperColumns);

			downloadExcle(downloadDatas, downloadTitles, this.fileName);
		}
	}

	downExcel4(nextProps) {
		if (nextProps.flowDistribution.excel4 != this.props.flowDistribution.excel4) {

			let downloadTitles = dealDownloadTitle(this.props.flowDistribution.excelHead4);
			let helperColumns = dealDownloadColumns(this.props.flowDistribution.excelHead4);
			let downloadDatas = dealDownloadData(nextProps.flowDistribution.excel4, helperColumns);

			downloadExcle(downloadDatas, downloadTitles, this.fileName);
		}
	}

	downExcel5(nextProps) {
		if (nextProps.flowDistribution.excel5 != this.props.flowDistribution.excel5) {

			let downloadTitles = dealDownloadTitle(this.props.flowDistribution.excelHead5);
			let helperColumns = dealDownloadColumns(this.props.flowDistribution.excelHead5);
			let downloadDatas = dealDownloadData(nextProps.flowDistribution.excel5, helperColumns);

			downloadExcle(downloadDatas, downloadTitles, this.fileName);
		}
	}

	downExcel6(nextProps) {
		if (nextProps.flowDistribution.excel6 != this.props.flowDistribution.excel6) {

			let downloadTitles = dealDownloadTitle(this.props.flowDistribution.excelHead6);
			let helperColumns = dealDownloadColumns(this.props.flowDistribution.excelHead6);
			let downloadDatas = dealDownloadData(nextProps.flowDistribution.excel6, helperColumns);

			downloadExcle(downloadDatas, downloadTitles, this.fileName);
		}
	}

	downExcel7(nextProps) {
		if (nextProps.flowDistribution.excel7 != this.props.flowDistribution.excel7) {

			let downloadTitles = dealDownloadTitle(this.props.flowDistribution.excelHead7);
			let helperColumns = dealDownloadColumns(this.props.flowDistribution.excelHead7);
			let downloadDatas = dealDownloadData(nextProps.flowDistribution.excel7, helperColumns);

			downloadExcle(downloadDatas, downloadTitles, this.fileName);
		}
	}

	downExcel8(nextProps) {
		if (nextProps.flowDistribution.excel8 != this.props.flowDistribution.excel8) {

			let downloadTitles = dealDownloadTitle(this.props.flowDistribution.excelHead8);
			let helperColumns = dealDownloadColumns(this.props.flowDistribution.excelHead8);
			let downloadDatas = dealDownloadData(nextProps.flowDistribution.excel8, helperColumns);

			downloadExcle(downloadDatas, downloadTitles, this.fileName);
		}
	}

	getArea(data) {
		this.props.getArea(data);
	}

	netNewUser(data) {
		this.props.netNewUser(data);
	}

	newModal(data) {
		this.props.newModal(data);
	}

	activeModal(data) {
		this.props.activeModal(data);
	}

	getHour(hoverParam) {
		this.props.getHour(hoverParam);
	}

	hourFormat(data) {
		var arr = [];

		data.map((v, k) => {
			if (v < 10) {
				arr.push(v + ":00");
			} else {
				arr.push(v + ":00");
			}
		});

		return arr;
	}

	getChartShow8() {

		if (this.props.flowDistribution.activeUserArea.length != 0) {
			var db = Taffy(this.props.flowDistribution.activeUserArea);
			var max = db().max("value");

			var obj = {};
			obj.max = max;
			obj.color = ['#c7abfe', '#ddccff', '#fff'];
			obj.areaData = this.props.flowDistribution.activeUserArea;

			var config = Map(obj);

			this.myChart8.setOption(config);

			this.myChart8.resize();

		} else {
			if (this.props.flowDistribution.chartsNoData8) {
				this.refs.charts8.innerHTML = '<div style="text-align:center">没有查询到相关数据</div>';
			}
		}

	}

	getChartShow7() {

		if (this.props.flowDistribution.newUserArea.length != 0) {
			var db = Taffy(this.props.flowDistribution.newUserArea);
			var max = db().max("value");

			var obj = {};
			obj.max = max;
			obj.color = ['#82aeff', '#c1f1fe', '#fff'];
			obj.areaData = this.props.flowDistribution.newUserArea;

			var config = Map(obj);
			this.myChart7.setOption(config);
			this.myChart7.resize();

		} else {
			if (this.props.flowDistribution.chartsNoData7) {
				this.refs.charts7.innerHTML = '<div style="text-align:center">没有查询到相关数据</div>';
			}
		}

	}

	getChartShow6() {
		if (this.props.flowDistribution.activeUserNetType.length != 0) {
			var obj = {};

			obj.name = "活跃用户联网方式";
			obj.list = this.props.flowDistribution.activeUserNetType;

			var config = Pie(obj);
			this.myChart6.setOption(config);
			this.myChart6.resize();
		} else {
			if (this.props.flowDistribution.chartsNoData6) {
				this.refs.charts6.innerHTML = '<div style="text-align:center">没有查询到相关数据</div>';
			}
		}
	}

	getChartShow5() {
		if (this.props.flowDistribution.newUserNetType.length != 0) {
			var obj = {};

			obj.name = "新增用户联网方式";
			obj.list = this.props.flowDistribution.newUserNetType;

			var config = Pie(obj);
			this.myChart5.setOption(config);
			this.myChart5.resize();
		} else {
			if (this.props.flowDistribution.chartsNoData5) {
				this.refs.charts5.innerHTML = '<div style="text-align:center">没有查询到相关数据</div>';
			}
		}
	}

	getChartShow4() {



		if (this.props.flowDistribution.activeUserModel.length != 0) {
			var series = [];
			var names = [];
			this.props.flowDistribution.activeUserModel.map((v, k) => {

				series.push({
					"name": v.name,
					"type": "bar",
					"stack": v.name,
					"data": v.yAxis
				});

				names.push(v.name);
			});


			let xAxisGet = this.getXAxis(this.props.flowDistribution.activeUserModel);

			if (xAxisGet.length == 0) {
				this.refs.charts4.innerHTML = '<div style="text-align:center">没有查询到相关数据</div>';
				return false;
			}
			var xAxis = xAxisGet;

			var data = {
				"names": names,
				"xAxis": xAxis,
				"series": series
			}

			var config = Bar(data);
			this.myChart4.setOption(config);
			this.myChart4.resize();
		} else {
			if (this.props.flowDistribution.chartsNoData4) {
				this.refs.charts4.innerHTML = '<div style="text-align:center">没有查询到相关数据</div>';
			}
		}
	}

	getChartShow3() {
		if (this.props.flowDistribution.newUserModel.length != 0) {
			var series = [];
			var names = [];
			this.props.flowDistribution.newUserModel.map((v, k) => {

				series.push({
					"name": v.name,
					"type": "bar",
					"stack": v.name,
					"data": v.yAxis
				});

				names.push(v.name);
			});

			let xAxisGet = this.getXAxis(this.props.flowDistribution.newUserModel);

			if (xAxisGet.length == 0) {
				this.refs.charts3.innerHTML = '<div style="text-align:center">没有查询到相关数据</div>';
				return false;
			}

			var xAxis = xAxisGet;

			var data = {
				"names": names,
				"xAxis": xAxis,
				"series": series
			}

			var config = Bar(data);
			this.myChart3.setOption(config);
			this.myChart3.resize();
		} else {
			if (this.props.flowDistribution.chartsNoData3) {
				this.refs.charts3.innerHTML = '<div style="text-align:center">没有查询到相关数据</div>';
			}
		}
	}



	getChartShow2() {
		if (this.props.flowDistribution.activeUserStartTime.length != 0) {
			var series = [];
			var names = [];
			this.props.flowDistribution.activeUserStartTime.map((v, k) => {

				series.push({
					"name": v.name,
					"type": "line",
					"stack": v.name,
					"data": v.yAxis
				});

				names.push(v.name);
			});

			let xAxisGet = this.getXAxis(this.props.flowDistribution.activeUserStartTime);

			if (xAxisGet.length == 0) {
				this.refs.charts2.innerHTML = '<div style="text-align:center">没有查询到相关数据</div>';
				return false;
			}
			var xAxis = this.hourFormat(xAxisGet);

			var data = {
				"names": names,
				"xAxis": xAxis,
				"series": series
			}

			var config = Line(data);
			this.myChart2.setOption(config);
			this.myChart2.resize();
		} else {
			if (this.props.flowDistribution.chartsNoData2) {
				this.refs.charts2.innerHTML = '<div style="text-align:center">没有查询到相关数据</div>';
			}
		}
	}

	getChartShow1() {
		if (this.props.flowDistribution.newUserActiveTime.length != 0) {
			var series = [];
			var names = [];
			this.props.flowDistribution.newUserActiveTime.map((v, k) => {
				series.push({
					"name": v.name,
					"type": "line",
					"stack": v.name,
					"data": v.yAxis
				});

				names.push(v.name);
			});

			let xAxisGet = this.getXAxis(this.props.flowDistribution.newUserActiveTime);

			if (xAxisGet.length == 0) {
				this.refs.charts1.innerHTML = '<div style="text-align:center">没有查询到相关数据</div>';
				return false;
			}

			var xAxis = this.hourFormat(xAxisGet);

			var data = {
				"names": names,
				"xAxis": xAxis,
				"series": series
			}

			var config = Line(data);
			this.myChart1.setOption(config);
			this.myChart1.resize();
		} else {
			if (this.props.flowDistribution.chartsNoData1) {
				this.refs.charts1.innerHTML = '<div style="text-align:center">没有查询到相关数据</div>';
			}
		}
	}

	getXAxis(data) {
		let arr = [];

		data.map((v, k) => {

			if (v.xAxis.length != 0) {
				arr = v.xAxis;
			}


		})

		return arr;
	}

	changeOs(value) {

		var data = {
			appCode: value,
			channelCategory: "",
			channelGroup: "",
			channelName: ""
		}

		this.props.changeOs(data, this.getChannelGroup.bind(this));
	}

	getChannelGroup(data) {

		this.props.getChannelGroup(data);
	}

	changeChannelCategory(value) {

		var data = {
			appCode: this.props.flowDistribution.appCode,
			channelGroup: "",
			channelCategory: value,
			channelName: this.props.flowDistribution.channelName
		}

		this.props.changeChannelCategory(data, this.getChannelGroup.bind(this));
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

		var data = {
			appCode: this.props.flowDistribution.appCode,
			channelCategory: this.props.flowDistribution.channelCategory,
			channelGroup: this.props.flowDistribution.channelGroup,
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


		if (dateString > this.props.flowDistribution.maxDate) {
			notification['error']({
				message: '日期错误',
				description: '超出日期选择范围',
			});
		} else {
			this.props.setDate(dateString);
		}
	}

	clickQuery() {
		console.log("查询");
		this.globalGet();
	}

	getDownloadName(data) {
		// let prefix = '用户概况-';
		let prefix = data.excelName;
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

		return prefix + fileName + '-(' + data.endDate + ')';

	}

	downloadExcel1() {

		let data1 = {
			appCode: this.props.flowDistribution.appCode,
			channelCategory: this.props.flowDistribution.channelCategory,
			channelGroup: this.props.flowDistribution.channelGroup,
			channelName: this.props.flowDistribution.channelName,
			endDate: this.props.flowDistribution.endDate,
			excelName: '流量分布-新增用户激活时间分布-'
		}

		this.fileName = this.getDownloadName(data1);
		this.props.getDownLoadData1(data1);
	}

	downloadExcel2() {

		let data = {
			appCode: this.props.flowDistribution.appCode,
			channelCategory: this.props.flowDistribution.channelCategory,
			channelGroup: this.props.flowDistribution.channelGroup,
			channelName: this.props.flowDistribution.channelName,
			endDate: this.props.flowDistribution.endDate,
			excelName: '流量分布-新增用户启动时间分布-'
		}

		this.fileName = this.getDownloadName(data);

		this.props.getDownLoadData2(data);
	}

	downloadExcel3() {

		let data = {
			appCode: this.props.flowDistribution.appCode,
			channelCategory: this.props.flowDistribution.channelCategory,
			channelGroup: this.props.flowDistribution.channelGroup,
			channelName: this.props.flowDistribution.channelName,
			endDate: this.props.flowDistribution.endDate,
			excelName: '流量分布-新增用户机型分布-'
		}

		this.fileName = this.getDownloadName(data);

		this.props.getDownLoadData3(data);
	}

	downloadExcel4() {
		let data = {
			appCode: this.props.flowDistribution.appCode,
			channelCategory: this.props.flowDistribution.channelCategory,
			channelGroup: this.props.flowDistribution.channelGroup,
			channelName: this.props.flowDistribution.channelName,
			endDate: this.props.flowDistribution.endDate,
			excelName: '流量分布-活跃用户机型分布-'
		}

		this.fileName = this.getDownloadName(data);
		this.props.getDownLoadData4(data);
	}

	downloadExcel5() {
		let data = {
			appCode: this.props.flowDistribution.appCode,
			channelCategory: this.props.flowDistribution.channelCategory,
			channelGroup: this.props.flowDistribution.channelGroup,
			channelName: this.props.flowDistribution.channelName,
			endDate: this.props.flowDistribution.endDate,
			excelName: '流量分布-新增用户联网方式-'
		}

		this.fileName = this.getDownloadName(data);
		this.props.getDownLoadData5(data);
	}

	downloadExcel6() {
		let data = {
			appCode: this.props.flowDistribution.appCode,
			channelCategory: this.props.flowDistribution.channelCategory,
			channelGroup: this.props.flowDistribution.channelGroup,
			channelName: this.props.flowDistribution.channelName,
			endDate: this.props.flowDistribution.endDate,
			excelName: '流量分布-活跃用户联网方式-'
		}

		this.fileName = this.getDownloadName(data);
		this.props.getDownLoadData6(data);
	}

	downloadExcel7() {
		let data = {
			appCode: this.props.flowDistribution.appCode,
			channelCategory: this.props.flowDistribution.channelCategory,
			channelGroup: this.props.flowDistribution.channelGroup,
			channelName: this.props.flowDistribution.channelName,
			endDate: this.props.flowDistribution.endDate,
			excelName: '流量分布-新增用户地域分布-'
		}

		this.fileName = this.getDownloadName(data);
		this.props.getDownLoadData7(data);
	}

	downloadExcel8() {
		let data = {
			appCode: this.props.flowDistribution.appCode,
			channelCategory: this.props.flowDistribution.channelCategory,
			channelGroup: this.props.flowDistribution.channelGroup,
			channelName: this.props.flowDistribution.channelName,
			endDate: this.props.flowDistribution.endDate,
			excelName: '流量分布-活跃用户地域分布-'
		}

		this.fileName = this.getDownloadName(data);
		this.props.getDownLoadData8(data);
	}

	render() {
		return (
			<Layout style={{marginLeft: 180,position: "relative",marginTop:60, overflow:"hidden"}}>
				{ /*筛选区域开始*/ }
  				<Content className="channel_filter">
  					<Form layout="inline">
  					{/*操作系统开始*/}
	                <FormItem label="操作系统">
	                  <Select 
	                    placeholder="操作系统选择" 
	                    dropdownMatchSelectWidth={true}  
	                    value={this.props.flowDistribution.appCode}
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
	                    value={this.props.flowDistribution.channelCategory}
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
	                    value={this.props.flowDistribution.channelGroup}
	                    className="channelGroup"
	                    optionFilterProp="children"
	                    onChange={this.handleChange.bind(this)}>
	                    <Option value="">全部</Option>
	                    {/*渠道组列表*/}
	                    {renderGroupList(this.props.flowDistribution.channelGroupList)}
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
	                    value={this.props.flowDistribution.channelName}
	                    filterOption={false}
	                    onChange={this.searchChannel.bind(this)}
	                     >
	                     {/* {options}*/}
	                     {getChannelList(this.props.flowDistribution.channelList)}
	                  </Select>
	                </FormItem>
	                {/*搜索渠道结束*/}

	                {/*日历组件开始*/}
	                <FormItem label="" >
	                  <DatePicker 
	                    value={moment(this.props.flowDistribution.endDate, dateFormat)}
	                    format={dateFormat}
	                    allowClear={false}
	                    onChange={this.changeDate.bind(this)}
	                    className = "channel_DataPicker"
	                  />
	                  {/*<DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />*/}
	                </FormItem>
	                {/*日历组件结束*/}
	            	{/*查询开始*/}
	            	<FormItem label="" >
	                <Button type="primary" size={"default"} onClick={this.clickQuery.bind(this)} >查询</Button>
	                </FormItem>
	                {/*查询结束*/}
	                </Form>
  				</Content>


  				{ /*图表模块开始*/ }
				<Content className="channel_charts">
				<Row gutter={24}>
					<Col span={12}>
						<Card title="新增用户激活时间分布" extra={<Button type="primary" icon="download" data-id="1" onClick={this.downloadExcel1.bind(this)}>下载</Button>} noHovering={true} style={{minHeight:"380px",marginBottom:"24px"}}>
							<Spin spinning={this.props.flowDistribution.chartsDataloading1}>
			                    <div ref="charts1" style={{width:"100%", minHeight: "300px" }}>
			                    	新增用户激活时间分布
			                    </div>
		                  	</Spin>
						</Card>
					</Col>
					<Col span={12}>
						<Card title="新增用户启动时间分布" extra={<Button type="primary" icon="download" data-id="1" onClick={this.downloadExcel2.bind(this)}>下载</Button>} noHovering={true} style={{minHeight:"380px",marginBottom:"24px"}}>
							<Spin spinning={this.props.flowDistribution.chartsDataloading1}>
			                    <div ref="charts2" style={{width:"100%", minHeight: "300px" }}>
			                      新增用户启动时间分布
			                    </div>
		                  	</Spin>
						</Card>
					</Col>
					<Col span={12}>
						<Card title="新增用户机型分布" extra={<Button type="primary" icon="download" data-id="1" onClick={this.downloadExcel3.bind(this)}>下载</Button>} noHovering={true} style={{minHeight:"380px",marginBottom:"24px"}}>
							<Spin spinning={this.props.flowDistribution.chartsDataloading3}>
			                    <div ref="charts3" style={{width:"100%", minHeight: "300px" }}>
			                      新增用户机型分布
			                    </div>
		                  	</Spin>
						</Card>
					</Col>
					<Col span={12}>
						<Card title="活跃用户机型分布" extra={<Button type="primary" icon="download" data-id="1" onClick={this.downloadExcel4.bind(this)}>下载</Button>} noHovering={true} style={{minHeight:"380px",marginBottom:"24px"}}>
							<Spin spinning={this.props.flowDistribution.chartsDataloading4}>
			                    <div ref="charts4" style={{width:"100%", minHeight: "300px" }}>
			                      活跃用户机型分布
			                    </div>
		                  	</Spin>
						</Card>
					</Col>
					<Col span={12}>
						<Card title="新增用户联网方式" extra={<Button type="primary" icon="download" data-id="1" onClick={this.downloadExcel5.bind(this)}>下载</Button>} noHovering={true} style={{minHeight:"380px",marginBottom:"24px"}}>
							<Spin spinning={this.props.flowDistribution.chartsDataloading5}>
			                    <div ref="charts5" style={{width:"100%", minHeight: "300px" }}>
			                      新增用户联网方式
			                    </div>
		                  	</Spin>
						</Card>
					</Col>
					<Col span={12}>
						<Card title="活跃用户联网方式" extra={<Button type="primary" icon="download" data-id="1" onClick={this.downloadExcel6.bind(this)}>下载</Button>} noHovering={true} style={{minHeight:"380px",marginBottom:"24px"}}>
							<Spin spinning={this.props.flowDistribution.chartsDataloading5}>
			                    <div ref="charts6" style={{width:"100%", minHeight: "300px" }}>
			                      活跃用户联网方式
			                    </div>
		                  	</Spin>
						</Card>
					</Col>
					<Col span={12}>
						<Card title="新增用户地域分布" extra={<Button type="primary" icon="download" data-id="1" onClick={this.downloadExcel7.bind(this)}>下载</Button>} noHovering={true} style={{minHeight:"380px",marginBottom:"24px"}}>
							<Spin spinning={this.props.flowDistribution.chartsDataloading7}>
			                    <div ref="charts7" style={{width:"100%", minHeight: "300px" }}>
			                      新增用户地域分布
			                    </div>
		                  	</Spin>
						</Card>
					</Col>
					<Col span={12}>
						<Card title="活跃用户地域分布" extra={<Button type="primary" icon="download" data-id="1" onClick={this.downloadExcel8.bind(this)}>下载</Button>} noHovering={true} style={{minHeight:"380px",marginBottom:"24px"}}>
							<Spin spinning={this.props.flowDistribution.chartsDataloading7}>
			                    <div ref="charts8" style={{width:"100%", minHeight: "300px" }}>
			                      活跃用户地域分布
			                    </div>
		                  	</Spin>
						</Card>
					</Col>
    			</Row>
				</Content>
				{/*图表模块结束*/}
  			</Layout>
		);
	}
}

//将state.counter绑定到props的counter
const mapStateToProps = (state) => {
	return {
		flowDistribution: state.qReducer.flowDistribution
	}
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
	//全量
	return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(flowDistribution);