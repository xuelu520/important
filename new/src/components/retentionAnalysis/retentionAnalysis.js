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
	notification,
	Spin,
	Alert,
	Divider,
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

import * as actionCreators from '../../actions/retentionAnalysis/retentionAnalysis';

class retentionAnalysis extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		NProgress.start();

		var groupList = {
			appCode: this.props.retentionAnalysis.appCode,
			channelGroup: this.props.retentionAnalysis.channelGroup,
			channelCategory: this.props.retentionAnalysis.channelCategory
		}
		this.getChannelGroupList(groupList);

		var firmParam = {
			firm: this.props.retentionAnalysis.firm,
			brand: ""
		}

		this.getFirmList(firmParam);

		var tableParam = {
			appCode: this.props.retentionAnalysis.appCode,
			channelCategory: this.props.retentionAnalysis.channelCategory,
			channelGroup: this.props.retentionAnalysis.channelGroup,
			channelName: this.props.retentionAnalysis.channelName,
			startDate: this.props.retentionAnalysis.startDate,
			endDate: this.props.retentionAnalysis.endDate,
			trendType: this.props.retentionAnalysis.trendType,
			firm: this.props.retentionAnalysis.firm,
			brand: this.props.retentionAnalysis.brand,
			type: this.props.retentionAnalysis.type
		}

		this.getTables(tableParam);

	}

	componentDidMount() {
		NProgress.done();
	}

	componentWillUpdate(nextProps) {

		console.log(this.props.retentionAnalysis.type);


		console.log(nextProps.retentionAnalysis.excelData);


		console.log(nextProps.retentionAnalysis.excelData);

		if (nextProps.retentionAnalysis.excelData != this.props.retentionAnalysis.excelData) {
			if (this.props.retentionAnalysis.type == '1') {
				let downloadTitles = dealDownloadTitle(this.props.retentionAnalysis.columns);
				let helperColumns = dealDownloadColumns(this.props.retentionAnalysis.columns);
				let downloadDatas = dealDownloadData(nextProps.retentionAnalysis.excelData.leftPercent, helperColumns);

				downloadExcle(downloadDatas, downloadTitles, this.fileName);
			} else {
				let downloadTitles = dealDownloadTitle(this.props.retentionAnalysis.columns);
				let helperColumns = dealDownloadColumns(this.props.retentionAnalysis.columns);
				let downloadDatas = dealDownloadData(nextProps.retentionAnalysis.excelData.leftCount, helperColumns);

				downloadExcle(downloadDatas, downloadTitles, this.fileName);
			}
		}

		// if (nextProps.profileList.Result.excelData != this.props.profileList.Result.excelData) {
		// 	let downloadTitles = dealDownloadTitle(this.props.profileList.TableColumns.tableColumns);
		// 	let helperColumns = dealDownloadColumns(this.props.profileList.TableColumns.tableColumns);
		// 	let downloadDatas = dealDownloadData(nextProps.profileList.Result.excelData, helperColumns);

		// 	downloadExcle(downloadDatas, downloadTitles, this.fileName);
		// }



	}

	getTables(data) {
		this.props.getTables(data);
	}

	getFirmList(data) {
		this.props.getFirmList(data, this.props.getBrandList.bind(this));
	}

	getBrandList(data) {
		this.props.getBrandList(data);
	}

	getChannelGroupList(data) {
		this.props.getChannelGroupList(data);
	}

	changeOs(value) {
		var data = {
			appCode: value,
			channelCategory: "",
			channelGroup: "",
			channelName: "",
			channelList: [],
			channelGroup: ""
		}

		this.props.changeOs(data, this.getChannelGroupList.bind(this));
	}

	changeChannelCategory(value) {

		var data = {
			appCode: this.props.retentionAnalysis.appCode,
			channelCategory: value,
			channelGroup: "",
			channelName: "",
			channelList: [],
			channelGroup: ""
		}

		this.props.changeChannelCategory(data, this.getChannelGroupList.bind(this));

	}

	/**
	 * 搜索渠道组
	 * @method handleChange
	 * @param value {String}
	 */
	handleChange(value) {

		console.log(value);
		var data = {
			appCode: this.props.retentionAnalysis.appCode,
			channelGroup: value,
			channelCategory: this.props.retentionAnalysis.channelCategory
		}

		this.props.getChannelGroupList(data);
	}

	searchChannel(value) {
		console.log(value);

		var data = {
			appCode: this.props.retentionAnalysis.appCode,
			channelCategory: this.props.retentionAnalysis.channelCategory,
			channelGroup: this.props.retentionAnalysis.channelGroup,
			channelName: value
		}

		this.props.searchChannel(data);

	}

	changeFirm(value) {
		console.log(value);

		var data = {
			firm: value,
			brand: ""
		}

		this.getFirmList(data);
	}

	changeBrand(value) {
		console.log(value);
		var data = {
			firm: this.props.retentionAnalysis.firm,
			brand: value
		}
		this.getBrandList(data);
	}

	/**
	 * 开始时间和结束时间切换
	 * @method changeDate
	 * @param value {Object}
	 * @param dateString {Array}
	 */
	changeDate(value, dateString) {

		if (dateString[1] > this.props.retentionAnalysis.maxDate) {

			notification['error']({
				message: '日期错误',
				description: '超出日期选择范围',
			});
		} else {
			this.props.setDate(dateString);
		}

	}

	clickQuery() {
		var tableParam = {
			appCode: this.props.retentionAnalysis.appCode,
			channelCategory: this.props.retentionAnalysis.channelCategory,
			channelGroup: this.props.retentionAnalysis.channelGroup,
			channelName: this.props.retentionAnalysis.channelName,
			startDate: this.props.retentionAnalysis.startDate,
			endDate: this.props.retentionAnalysis.endDate,
			trendType: this.props.retentionAnalysis.trendType,
			firm: this.props.retentionAnalysis.firm,
			brand: this.props.retentionAnalysis.brand,
			type: this.props.retentionAnalysis.type
		}

		this.getTables(tableParam);
	}

	changeDataType(e) {

		var tableParam = {
			appCode: this.props.retentionAnalysis.appCode,
			channelCategory: this.props.retentionAnalysis.channelCategory,
			channelGroup: this.props.retentionAnalysis.channelGroup,
			channelName: this.props.retentionAnalysis.channelName,
			startDate: this.props.retentionAnalysis.startDate,
			endDate: this.props.retentionAnalysis.endDate,
			trendType: e.target.value,
			firm: this.props.retentionAnalysis.firm,
			brand: this.props.retentionAnalysis.brand,
			type: this.props.retentionAnalysis.type
		}

		this.getTables(tableParam);
	}

	changeType(e) {
		console.log(e.target.value);


		var data = {
			type: e.target.value,
			trendType: this.props.retentionAnalysis.trendType
		}

		this.props.changeType(this.props.retentionAnalysis.tableTotal, data);
	}

	getDownloadName(data) {
		let prefix = '留存分析-';
		let fileName = '全部';
		let trendType = '日留存';
		let isRateOrNumber = '留存率';
		if (data.trendType == 1) {
			trendType = '日留存';
		} else if (data.type == 2) {
			trendType = '周留存';
		} else {
			trendType = '月留存';
		}

		if (data.type == '1') {
			isRateOrNumber = '留存率';
		} else {
			isRateOrNumber = '留存用户数';
		}

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

		return prefix + fileName + '-' + trendType + '-' + isRateOrNumber + '-(' + data.startDate + '至' + data.endDate + ').xlsx';
	}

	downloadExcel() {



		var data = {
			appCode: this.props.retentionAnalysis.appCode,
			channelCategory: this.props.retentionAnalysis.channelCategory,
			channelGroup: this.props.retentionAnalysis.channelGroup,
			channelName: this.props.retentionAnalysis.channelName,
			startDate: this.props.retentionAnalysis.startDate,
			endDate: this.props.retentionAnalysis.endDate,
			trendType: this.props.retentionAnalysis.trendType,
			firm: this.props.retentionAnalysis.firm,
			brand: this.props.retentionAnalysis.brand,
			type: this.props.retentionAnalysis.type
		}


		this.fileName = this.getDownloadName(data);

		// console.log(this.fileName, 'this.fileName');


		// var downExcelData = {
		// 	appCode: this.props.profileList.Param.appCode,
		// 	channelGroup: this.props.profileList.Param.channelGroup,
		// 	channelName: this.props.profileList.Param.channelName,
		// 	startDate: this.props.profileList.Param.startDate,
		// 	endDate: this.props.profileList.Param.endDate,
		// 	channelCategory: this.props.profileList.Param.channelCategory,
		// 	offset: this.props.profileList.Pagination.current,
		// 	limit: this.props.profileList.Pagination.pageSize,
		// 	type: this.props.profileList.Param.type
		// }

		this.props.getDownLoadData(data);
	}


	render() {

		var pagination = {
			// current: this.props.adImpression.offset,
			// pageSize: this.props.adImpression.limit,
			// total: this.props.adImpression.total,
			// defaultPageSize: this.props.adImpression.limit,
			showSizeChanger: true
		}



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
	                    value={this.props.retentionAnalysis.appCode}
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
	                    value={this.props.retentionAnalysis.channelCategory}
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
	                    value={this.props.retentionAnalysis.channelGroup}
	                    className="channelGroup"
	                    optionFilterProp="children"
	                    onChange={this.handleChange.bind(this)}>
	                    <Option value="">全部</Option>
	                    {/*渠道组列表*/}
	                    {renderGroupList(this.props.retentionAnalysis.channelGroupList)}
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
	                    value={this.props.retentionAnalysis.channelName}
	                    filterOption={false}
	                    onChange={this.searchChannel.bind(this)}
	                     >
	                     {/* {options}*/}
	                     {getChannelList(this.props.retentionAnalysis.channelList)}
	                  </Select>
	                </FormItem>
	                {/*搜索渠道结束*/}

	            	{/*厂商开始*/}
	                <FormItem label="厂商">
	                  <Select 
	                    placeholder="请选择厂商" 
	                    dropdownMatchSelectWidth={true}
	                    value={this.props.retentionAnalysis.firm}
	                    onChange={this.changeFirm.bind(this)}
	                    className="appCode"
	                    >
{/*	                    <Option value="">全部</Option>
	                    <Option value="1">线上</Option>
	                    <Option value="2">线下</Option>*/}
						<Option value="">全部</Option>
	                    {getFirmList(this.props.retentionAnalysis.firmList)}
	                  </Select>
	                </FormItem>
	                {/*厂商结束*/}


	            	{/*品牌开始*/}
	                <FormItem label="品牌">
	                  <Select 
	                    placeholder="请选择厂商" 
	                    dropdownMatchSelectWidth={true}
	                    value={this.props.retentionAnalysis.brand}
	                    onChange={this.changeBrand.bind(this)}
	                    className="appCode"
	                    >
	                    <Option value="">全部</Option>
{/*	                    <Option value="">全部</Option>
	                    <Option value="1">线上</Option>
	                    <Option value="2">线下</Option>*/}

	                    {getBrandList(this.props.retentionAnalysis.brandList)}
	                  </Select>
	                </FormItem>
	                {/*品牌结束*/}


	                {/*日历组件开始*/}
	                <FormItem label="" >
	                  <RangePicker 
	                    defaultValue={[moment(this.props.retentionAnalysis.startDate, dateFormat), moment(this.props.retentionAnalysis.endDate, dateFormat)]}
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


  				{ /*表格模块开始*/ }
			      <Content className="channel_table" style={{minHeight:"300px !important"}}>
			        <div style={{width:"100%", marginBottom: "20px"}} className="clearfix">
			          	<Button type="primary" onClick={this.downloadExcel.bind(this)} style={{float:"right"}} icon="download">下载</Button>
			          	<Radio.Group value={this.props.retentionAnalysis.trendType} style={{float:"right",marginRight: "20px"}} onChange={this.changeDataType.bind(this)}>
							<Radio.Button value="1">日留存</Radio.Button>
							<Radio.Button value="2">周留存</Radio.Button>
							<Radio.Button value="3">月留存</Radio.Button>
						</Radio.Group>

						<Radio.Group value={this.props.retentionAnalysis.type} style={{float:"right",marginRight: "20px"}} onChange={this.changeType.bind(this)}>
							<Radio.Button value="1">留存率</Radio.Button>
							<Radio.Button value="2">留存用户数</Radio.Button>
						</Radio.Group>
			          {/*下载Excel*/}
			        </div>

			        <Table 
			          loading={this.props.retentionAnalysis.tablesLoading} 
			          locale={{"emptyText": "暂无数据"}} 
			          columns={dealConfigColumns(this.props.retentionAnalysis.columns)} 
			          dataSource={this.props.retentionAnalysis.tableData}
			          pagination={{showSizeChanger: true}}  
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
		retentionAnalysis: state.qReducer.retentionAnalysis
	}
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
	//全量
	return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(retentionAnalysis);