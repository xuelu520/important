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
	notification,
	Tabs,
	Spin,
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
	getDownloadName,
	downloadExcle,
	dealDownloadTitle,
	dealDownloadData,
	dealDownloadColumns
} from '../../common/channelManagerUtil';

import {
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

//本地数据库
import Taffy from 'taffy';

//用户权限列表
import {
	renderGroupList,
	addKey,
	dealConfigColumns
} from '../../common/utils';

import * as actionCreators from '../../actions/userCompose/userCompose';

class UserCompose extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		NProgress.start();


		var groupParam = {
			appCode: this.props.userCompose.appCode,
			channelCategory: this.props.userCompose.channelCategory,
			channelGroup: this.props.userCompose.channelGroup
		}

		this.getChannelGroup(groupParam);

		var chartsParam = {
			appCode: this.props.userCompose.appCode,
			channelCategory: this.props.userCompose.channelCategory,
			channelGroup: this.props.userCompose.channelGroup,
			channelName: this.props.userCompose.channelName,
			endDate: this.props.userCompose.endDate,
			startDate: this.props.userCompose.startDate
		}

		this.getCharts(chartsParam);

		var tableParam = {
			appCode: this.props.userCompose.appCode,
			channelCategory: this.props.userCompose.channelCategory,
			channelGroup: this.props.userCompose.channelGroup,
			channelName: this.props.userCompose.channelName,
			endDate: this.props.userCompose.endDate,
			startDate: this.props.userCompose.startDate,
			limit: this.props.userCompose.limit,
			offset: this.props.userCompose.offset,
			type: this.props.userCompose.type
		}

		this.props.getTables(tableParam);


	}

	componentDidUpdate() {
		this.getChartShow();
	}

	componentDidMount() {
		NProgress.done();
	}

	componentWillUpdate(nextProps) {

		// console.log(nextProps.profileList.Result.excelData, 'nextProps');
		// console.log(nextProps.profileList, 'nextProps');

		if (nextProps.userCompose.excelData != this.props.userCompose.excelData) {
			let downloadTitles = dealDownloadTitle(this.props.userCompose.columns);


			let helperColumns = dealDownloadColumns(this.props.userCompose.columns);
			let downloadDatas = dealDownloadData(nextProps.userCompose.excelData, helperColumns);

			downloadExcle(downloadDatas, downloadTitles, this.fileName);
		}



	}

	getChartShow() {

		var db = Taffy(this.props.userCompose.chartsData);
		// var maLmn = db().select('maLmn');

		//日期
		var xAxis = db().distinct("day");

		//上月新增本月回访
		var maLmn = db().select('maLmn');
		//上上月活跃上月活跃本月回访
		var maLta = db().select('maLta');

		//历史活跃本月回访
		var ma_ha = db().select('maHa');

		// 历史上月活跃本月回访
		var ma_lha = db().select('maLha');

		//本月新增
		var mtdMnu = db().select('mtdMnu');

		var series = [];

		//本月新增
		series.push({
			"name": "本月薪增",
			"type": "bar",
			"stack": "bar",
			"data": mtdMnu
		});

		//上月新增本月回访
		series.push({
			"name": "上月新增本月回访",
			"type": "bar",
			"stack": "bar",
			"data": maLmn
		});


		//上上月活跃上月活跃本月回访
		series.push({
			"name": "上上月活跃上月活跃本月回访",
			"type": "bar",
			"stack": "bar",
			"data": maLta
		});



		//历史活跃上月活跃本月回访
		series.push({
			"name": "历史活跃上月活跃本月回访",
			"type": "bar",
			"stack": "bar",
			"data": ma_lha
		});

		//历史活跃本月回访
		series.push({
			"name": "历史活跃本月回访",
			"type": "bar",
			"stack": "bar",
			"data": ma_ha
		});

		var names = ["本月薪增", "上月新增本月回访", "上上月活跃上月活跃本月回访", "历史活跃上月活跃本月回访", "历史活跃本月回访"];


		var data = {
			"names": names,
			"xAxis": xAxis,
			"series": series
		}

		if (this.props.userCompose.chartsData.length != 0) {
			var myChart = echarts.init(this.refs.charts1);

			var config = Bar(data);
			myChart.setOption(config);

			window.onresize = myChart.resize;
		} else {
			if (this.props.userCompose.chartsNoData) {
				this.refs.charts1.innerHTML = '<div style="text-align:center">没有查询到相关数据</div>';
			}
		}

	}

	getCharts(data) {
		this.props.getcharts(data);
	}

	getChannelGroup(data) {
		this.props.getChannelGroup(data);
	}

	changeChannelCategory(value) {

		var data = {
			appCode: this.props.userCompose.appCode,
			channelCategory: value,
			channelGroup: this.props.userCompose.channelGroup
		}

		this.props.changeChannelCategory(data, this.getChannelGroup.bind(this));
	}

	changeOs(value) {

		var data = {
			appCode: value,
			channelCategory: this.props.userCompose.channelCategory,
			channelGroup: this.props.userCompose.channelGroup
		}

		this.props.changeOs(data, this.getChannelGroup.bind(this));

	}

	handleChange(value) {

		var groupParam = {
			appCode: this.props.userCompose.appCode,
			channelCategory: this.props.userCompose.channelCategory,
			channelGroup: value
		}

		this.getChannelGroup(groupParam);


	}

	changeDate(value, dateString) {
		if (dateString[1] > this.props.userCompose.maxDate) {
			notification['error']({
				message: '日期错误',
				description: '超出日期选择范围',
			});
		} else {
			this.props.changeDate(dateString);
		}


	}

	clickQuery() {
		var chartsParam = {
			appCode: this.props.userCompose.appCode,
			channelCategory: this.props.userCompose.channelCategory,
			channelGroup: this.props.userCompose.channelGroup,
			channelName: this.props.userCompose.channelName,
			endDate: this.props.userCompose.endDate,
			startDate: this.props.userCompose.startDate
		}

		this.getCharts(chartsParam);

		var tableParam = {
			appCode: this.props.userCompose.appCode,
			channelCategory: this.props.userCompose.channelCategory,
			channelGroup: this.props.userCompose.channelGroup,
			channelName: this.props.userCompose.channelName,
			endDate: this.props.userCompose.endDate,
			startDate: this.props.userCompose.startDate,
			limit: this.props.userCompose.limit,
			offset: 1,
			type: this.props.userCompose.type
		}

		this.props.getTables(tableParam);


	}


	handleTableChange(pagination, filters, sorter) {

		var tableParam = {
			appCode: this.props.userCompose.appCode,
			channelCategory: this.props.userCompose.channelCategory,
			channelGroup: this.props.userCompose.channelGroup,
			channelName: this.props.userCompose.channelName,
			endDate: this.props.userCompose.endDate,
			startDate: this.props.userCompose.startDate,
			limit: pagination.pageSize,
			offset: pagination.current,
			type: this.props.userCompose.type
		}

		this.props.getTables(tableParam);
	}

	clickType(e) {
		var tableParam = {
			appCode: this.props.userCompose.appCode,
			channelCategory: this.props.userCompose.channelCategory,
			channelGroup: this.props.userCompose.channelGroup,
			channelName: this.props.userCompose.channelName,
			endDate: this.props.userCompose.endDate,
			startDate: this.props.userCompose.startDate,
			limit: 10,
			offset: 1,
			type: parseInt(e.currentTarget.dataset.id, 10)
		}


		this.props.getTables(tableParam);
	}

	typeTpl() {
		var objDom = null;

		if (this.props.userCompose.type == 1) {

			objDom = (<ButtonGroup  style={{ marginBottom:"20px", float:"right",marginRight: "10px"}}>
		         <Button key={1} type="primary" data-id={1} >
				        汇总
				</Button>
				<Button key={2} type="defualt" onClick={this.clickType.bind(this)} data-id={2} >
				        明细
				</Button>
			</ButtonGroup>);
		} else {
			objDom = (<ButtonGroup  style={{ marginBottom:"20px", float:"right",marginRight: "10px"}}>
		         <Button key={1} type="defualt" onClick={this.clickType.bind(this)} data-id={1} >
				        汇总
				</Button>
				<Button key={2} type="primary" data-id={2} >
				        明细
				</Button>
			</ButtonGroup>);
		}

		return objDom;
	}

	getDownloadName(data) {
		let prefix = '用户构成-';
		let fileName = '全部';

		let type = '汇总';


		if (data.type == 1) {
			type = '汇总';
		} else if (data.type == 2) {
			type = '明细';
		} else {
			type = '迁出用户';
		}

		if (data.channelName) {
			fileName = data.channelName;
		} else if (data.channelGroup) {
			fileName = data.channelGroup;
		} else if (data.channelCategory) {
			fileName = data.channelCategory == '1' ? '线上' : '线下';
		} else if (data.appCode) {
			fileName = data.appCode == '24' ? 'Android' : 'iOS';
		}

		return prefix + fileName + '-' + type + '-(' + data.startDate + '至' + data.endDate + ').xlsx';
	}

	downLoadExcel() {



		let data = {
			appCode: this.props.userCompose.appCode,
			channelGroup: this.props.userCompose.channelGroup,
			channelName: this.props.userCompose.channelName,
			startDate: this.props.userCompose.startDate,
			endDate: this.props.userCompose.endDate,
			channelCategory: this.props.userCompose.channelCategory,
			offset: 1,
			limit: -1,
			type: this.props.userCompose.type
		};

		// console.log(this.props.userCompose, 'this.props.userCompose');

		this.fileName = this.getDownloadName(data);
		console.log(this.fileName, 'this.fileName');


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
			current: this.props.userCompose.offset,
			pageSize: this.props.userCompose.limit,
			total: this.props.userCompose.total,
			defaultPageSize: this.props.userCompose.limit,
			showSizeChanger: true
		}

		addKey(this.props.userCompose.tableData, 'userCompose' + new Date().getTime());

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
		                    value={this.props.userCompose.appCode}
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
		                    placeholder="Select a option and change input text above" 
		                    dropdownMatchSelectWidth={true}
		                    value={this.props.userCompose.channelCategory}
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
		                    value={this.props.userCompose.channelGroup}
		                    className="channelGroup"
		                    optionFilterProp="children"
		                    onChange={this.handleChange.bind(this)}>
		                    <Option value="">全部</Option>
		                    {/*渠道组列表*/}
		                    {renderGroupList(this.props.userCompose.groupList)}
		                  </Select>
		                </FormItem>
		                {/*渠道组结束*/}

		            	{/*日历组件开始*/}
		                <FormItem label="" >
		                  <RangePicker 
		                    value={[moment(this.props.userCompose.startDate, dateFormat), moment(this.props.userCompose.endDate, dateFormat)]}
		                    format={dateFormat}
		                    allowClear={false}
		                    onChange={this.changeDate.bind(this)}
		                    className = "channel_DataPicker"
		                  />
		                </FormItem>
		                {/*日历组件结束*/}

		            	{/*查询开始*/}
		            	<FormItem label="" >
		                <Button type="primary" size={"default"} onClick={this.clickQuery.bind(this)} >查询</Button>
		                </FormItem>
		                {/*查询结束*/}

		            </Form>
  				</Content>
  				{ /*筛选区域结束*/ }

  				{ /*图表模块开始*/ }
				<Content className="channel_charts">
					<Card title="MTD MAD用户构成分析"  noHovering={true} style={{minHeight:"380px"}}>
						<Spin spinning={this.props.userCompose.chartsLoading}>
		                    <div ref="charts1" style={{width:"100%", minHeight: "300px" }}>
		                  
		                    </div>
	                  	</Spin>
					</Card>
				</Content>
				{/*图表模块结束*/}

				{ /*表格模块开始*/ }
	            <Content className="channel_table">
	              
	                <div style={{width:"100%"}} className="clearfix">
	                  {/*面包屑*/}
	                  <Breadcrumb style={{float: "left", height: "28px", lineHeight: "28px"}}>
	                    <Breadcrumb.Item key = {1}>数据名细</Breadcrumb.Item>
	                  </Breadcrumb>
	                  {/*下载Excel*/}
	                  <Button type="primary" style={{float:"right"}} onClick={this.downLoadExcel.bind(this)} icon="download">下载</Button>
	                  {/*汇总和明细切换*/}
	                  {/*<ButtonGroup  style={{ marginBottom:"20px", float:"right",marginRight: "10px"}}>*/}
{/*	                    <Button key={1} type="primary" data-id={1} >
				                汇总
				        </Button>
				        <Button key={2} type="defualt" data-id={2} >
				                明细
				        </Button>*/}
				        {this.typeTpl()}
	                  {/*</ButtonGroup>*/}

	                </div>

	                <div>

	                </div>
	              <Table 
	                loading={this.props.userCompose.tableLoading} 
	                locale={{"emptyText": "暂无数据"}} 
	                columns={dealConfigColumns(this.props.userCompose.columns)} 
	                dataSource={this.props.userCompose.tableData}
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
		userCompose: state.Reducer.userCompose
	}
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
	//全量
	return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCompose);