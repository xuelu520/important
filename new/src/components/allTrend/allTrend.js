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
	addKey
} from '../../common/utils';

import * as actionCreators from '../../actions/allTrend/allTrend';


class AllTrend extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isQuery: true
		}

	}

	componentWillMount() {
		NProgress.start();
		this.getCharts1();

		this.getCharts2();

		this.getCharts3();

	}

	componentDidUpdate() {

		this.getChartShow1();
		this.getChartShow2();
		this.getChartShow3();
	}

	componentDidMount() {
		NProgress.done();

		this.myChart1 = echarts.init(this.refs.charts1);
		this.myChart2 = echarts.init(this.refs.charts2);
		this.myChart3 = echarts.init(this.refs.charts3);


		window.onresize = function() {
			this.myChart1.resize();

			this.myChart2.resize();

			this.myChart3.resize();
		}.bind(this);



	}
	componentWillUpdate(nextProps) {

		if (nextProps.allTrend.excelData1 != this.props.allTrend.excelData1) {
			let downloadTitles = dealDownloadTitle(this.props.allTrend.columns1);
			let helperColumns = dealDownloadColumns(this.props.allTrend.columns1);
			let downloadDatas = dealDownloadData(nextProps.allTrend.excelData1, helperColumns);

			downloadExcle(downloadDatas, downloadTitles, this.fileName);
		}

		if (nextProps.allTrend.excelData2 != this.props.allTrend.excelData2) {
			let downloadTitles = dealDownloadTitle(this.props.allTrend.columns2);
			let helperColumns = dealDownloadColumns(this.props.allTrend.columns2);
			let downloadDatas = dealDownloadData(nextProps.allTrend.excelData2, helperColumns);

			downloadExcle(downloadDatas, downloadTitles, this.fileName);
		}

		if (nextProps.allTrend.excelData3 != this.props.allTrend.excelData3) {
			let downloadTitles = dealDownloadTitle(this.props.allTrend.columns3);
			let helperColumns = dealDownloadColumns(this.props.allTrend.columns3);
			let downloadDatas = dealDownloadData(nextProps.allTrend.excelData3, helperColumns);

			downloadExcle(downloadDatas, downloadTitles, this.fileName);
		}



	}

	getChartShow1() {

		if (this.props.allTrend.chartsResult1.length != 0) {
			var series = [];
			var names = [];
			this.props.allTrend.chartsResult1.map((v, k) => {

				series.push({
					"name": v.name,
					"type": "line",
					"stack": v.name,
					"data": v.value
				});

				names.push(v.name);
			});

			var xAxis = this.props.allTrend.chartsResult1[0].key;

			var data = {
				"names": names,
				"xAxis": xAxis,
				"series": series
			}

			var config = Line(data);
			this.myChart1.setOption(config);

			this.myChart1.resize();


		} else {
			if (this.props.allTrend.chartsResultNoData1) {
				this.refs.charts1.innerHTML = '<div style="text-align:center">没有查询到相关数据</div>';
			}
		}

	}

	getChartShow2() {

		if (this.props.allTrend.chartsResult2.length != 0) {
			var series = [];
			var names = [];
			this.props.allTrend.chartsResult2.map((v, k) => {

				series.push({
					"name": v.name,
					"type": "line",
					"stack": v.name,
					"data": v.value
				});

				names.push(v.name);
			});

			var xAxis = this.props.allTrend.chartsResult2[0].key;

			var data = {
				"names": names,
				"xAxis": xAxis,
				"series": series
			}

			var config = Line(data);
			this.myChart2.setOption(config);

			this.myChart2.resize();

		} else {
			if (this.props.allTrend.chartsResultNoData2) {
				this.refs.charts2.innerHTML = '<div style="text-align:center">没有查询到相关数据</div>';
			}
		}

	}

	getChartShow3() {

		if (this.props.allTrend.chartsResult3.length != 0) {
			var series = [];
			var names = [];
			this.props.allTrend.chartsResult3.map((v, k) => {

				series.push({
					"name": v.name,
					"type": "line",
					"stack": v.name,
					"data": v.value
				});

				names.push(v.name);
			});

			var xAxis = this.props.allTrend.chartsResult3[0].key;

			var data = {
				"names": names,
				"xAxis": xAxis,
				"series": series
			}

			var config = Line(data);
			this.myChart3.setOption(config);

			this.myChart3.resize();


		} else {
			if (this.props.allTrend.chartsResultNoData3) {
				this.refs.charts3.innerHTML = '<div style="text-align:center">没有查询到相关数据</div>';
			}
		}

	}


	getCharts1() {
		var data1 = {
			appCode: this.props.allTrend.appCode,
			channelCategory: this.props.allTrend.channelCategory,
			top: this.props.allTrend.top,
			startDate: this.props.allTrend.startDate,
			endDate: this.props.allTrend.endDate,
			tab: 1
		};

		this.props.getCharts1(data1);
	}

	getCharts2() {
		var data2 = {
			appCode: this.props.allTrend.appCode,
			channelCategory: this.props.allTrend.channelCategory,
			top: this.props.allTrend.top,
			startDate: this.props.allTrend.startDate,
			endDate: this.props.allTrend.endDate,
			tab: 2
		};

		this.props.getCharts2(data2);
	}


	getCharts3() {
		var data3 = {
			appCode: this.props.allTrend.appCode,
			channelCategory: this.props.allTrend.channelCategory,
			top: this.props.allTrend.top,
			startDate: this.props.allTrend.startDate,
			endDate: this.props.allTrend.endDate,
			tab: 3
		};

		this.props.getCharts3(data3);
	}

	changeOs(e) {
		console.log(e);
		this.props.changeOs(e);
	}

	changeChannelCategory(e) {
		this.props.changeChannelCategory(e);
	}

	changeDate(value, dateString) {


		if (dateString[1] > this.props.allTrend.maxDate) {
			notification['error']({
				message: '日期错误',
				description: '超出日期选择范围',
			});
		} else {
			this.props.setDate(dateString);
		}



	}

	clickQuery() {

		if (this.state.isQuery) {

			this.setState({
				isQuery: false
			}, function() {
				this.getCharts1();

				this.getCharts2();

				this.getCharts3();

				setTimeout(function() {
					this.setState({
						isQuery: true
					})
				}.bind(this), 3000);
			}.bind(this));

		}
	}

	downloadExcel(e) {
		// console.log('下载', e);

		// var data = {
		// 	appCode: this.props.allTrend.appCode,
		// 	channelCategory: this.props.allTrend.channelCategory,
		// 	top: this.props.allTrend.top,
		// 	startDate: this.props.allTrend.startDate,
		// 	endDate: this.props.allTrend.endDate
		// }

		// if (e.currentTarget.dataset == "1") {
		// 	data.tab = 1;
		// } else if (e.currentTarget.dataset == "2") {
		// 	data.tab = 2;
		// } else {
		// 	data.tab = 3;
		// }

		// this.props.downloadExcel();
	}

	getDownloadName(data) {
		let prefix = '整体趋势-';
		let fileName = '新增用户';



		if (data.tab == "1") {
			fileName = '新增用户';
		} else if (data.tab == "2") {
			fileName = '次日留存率';
		} else {
			fileName = '7日留存率';
		}

		return prefix + fileName + '-(' + data.startDate + '至' + data.endDate + ').xlsx';
	}

	downloadNewUserExcel(e) {

		console.log(this.props, 'this.propsthis.propsthis.props');

		var data = {
			appCode: this.props.allTrend.appCode,
			channelCategory: this.props.allTrend.channelCategory,
			top: this.props.allTrend.top,
			startDate: this.props.allTrend.startDate,
			endDate: this.props.allTrend.endDate,
			tab: e.currentTarget.dataset.id,
			limit: "",
			offset: 1
		}


		this.fileName = this.getDownloadName(data);



		this.props.getDownLoadData(data);
	}

	downloadSecondDayExcel(e) {
		var data = {
			appCode: this.props.allTrend.appCode,
			channelCategory: this.props.allTrend.channelCategory,
			top: this.props.allTrend.top,
			startDate: this.props.allTrend.startDate,
			endDate: this.props.allTrend.endDate,
			tab: e.currentTarget.dataset.id,
			limit: "",
			offset: 1
		}


		this.fileName = this.getDownloadName(data);



		this.props.getDownLoadData(data);
	}
	downloadSevenExcel(e) {
		var data = {
			appCode: this.props.allTrend.appCode,
			channelCategory: this.props.allTrend.channelCategory,
			top: this.props.allTrend.top,
			startDate: this.props.allTrend.startDate,
			endDate: this.props.allTrend.endDate,
			tab: e.currentTarget.dataset.id,
			limit: "",
			offset: 1
		}


		this.fileName = this.getDownloadName(data);



		this.props.getDownLoadData(data);
	}

	render() {
		return (
			<Layout  style={{marginLeft: 180,position: "relative", marginTop:60, overflow:"hidden"}}>
				{ /*筛选区域开始*/ }
  				<Content className="channel_filter">
  					<Form layout="inline">
		                {/*操作系统开始*/}
		                <FormItem label="操作系统">
		                  <Select 
		                    placeholder="操作系统选择" 
		                    dropdownMatchSelectWidth={true}  
		                    value={this.props.allTrend.appCode}
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
		                    value={this.props.allTrend.channelCategory}
		                    onChange={this.changeChannelCategory.bind(this)}
		                    className="appCode"
		                    >
		                    <Option value="">全部</Option>
		                    <Option value="1">线上</Option>
		                    <Option value="2">线下</Option>
		                  </Select>
		                </FormItem>
		                {/*线上、线下结束*/}

		                {/*日历组件开始*/}
		                <FormItem label="" >
		                  <RangePicker 
		                    value={[moment(this.props.allTrend.startDate, dateFormat), moment(this.props.allTrend.endDate, dateFormat)]}
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
					<Card title="新增用户" extra={<Button type="primary" icon="download" data-id="1" onClick={this.downloadNewUserExcel.bind(this)}>下载</Button>} style={{minHeight:"380px"}}>
						<Spin spinning={this.props.allTrend.chartsLoading1}>
		                    <div ref="charts1" style={{width:"100%", minHeight: "300px" }}>
		                      新增用户
		                    </div>
	                  	</Spin>
					</Card>
				</Content>
				{/*图表模块结束*/}

				{ /*图表模块开始*/ }
				<Content className="channel_charts">
					<Card title="次日留存率"  extra={<Button type="primary" data-id="2" onClick={this.downloadSecondDayExcel.bind(this)} icon="download">下载</Button>}  style={{minHeight:"380px"}}>
						<Spin spinning={this.props.allTrend.chartsLoading2}>
		                    <div ref="charts2" style={{width:"100%", minHeight: "300px" }}>
		                      次日留存率
		                    </div>
	                  	</Spin>
					</Card>
				</Content>
				{/*图表模块结束*/}

				{ /*图表模块开始*/ }
				<Content className="channel_charts">
					<Card title="7日留存率" extra={<Button type="primary" data-id="3" onClick={this.downloadSevenExcel.bind(this)} icon="download">下载</Button>}  style={{minHeight:"380px"}}>
						<Spin spinning={this.props.allTrend.chartsLoading3}>
		                    <div ref="charts3" style={{width:"100%", minHeight: "300px" }}>
		                      7日留存率
		                    </div>
	                  	</Spin>
					</Card>
				</Content>
				{/*图表模块结束*/}
  			</Layout>
		);
	}
}


//将state.counter绑定到props的counter
const mapStateToProps = (state) => {
	return {
		allTrend: state.Reducer.allTrend
	}
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
	//全量
	return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AllTrend);