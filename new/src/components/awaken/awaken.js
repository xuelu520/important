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
	notification,
	Alert,
	Divider,
	Modal,
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
	dealConfigColumns
} from '../../common/utils';

import * as actionCreators from '../../actions/awaken/awaken.js';

class awaken extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		NProgress.start();

		this.getTable();
	}

	componentWillUpdate(nextProps) {


		console.log(nextProps.awaken, 'nextProps.awaken');

		if (nextProps.awaken.excelData != this.props.awaken.excelData) {
			let downloadTitles = dealDownloadTitle(this.props.awaken.columns);
			let helperColumns = dealDownloadColumns(this.props.awaken.columns);
			let downloadDatas = dealDownloadData(nextProps.awaken.excelData, helperColumns);

			downloadExcle(downloadDatas, downloadTitles, this.fileName);
		}



	}

	getTable() {
		var data = {
			appCode: this.props.awaken.appCode,
			endDate: this.props.awaken.endDate,
			limit: this.props.awaken.limit,
			offset: this.props.awaken.offset,
			paramValue: this.props.awaken.paramValue,
			startDate: this.props.awaken.startDate
		}

		this.props.getTable(data);
	}

	componentDidMount() {
		NProgress.done();
	}

	changeOs(id) {


		this.props.changeOs(id);

	}

	/**
	 * 渠道搜索
	 * @method searchChannel
	 * @param value {String}
	 */
	searchChannel(value) {

		this.props.searchChannel(value);

	}


	/**
	 * 开始时间和结束时间切换
	 * @method changeDate
	 * @param value {Object}
	 * @param dateString {Array}
	 */
	changeDate(value, dateString) {
		console.log(dateString, 'dateString');

		if (dateString[1] > this.props.awaken.maxDate) {
			notification['error']({
				message: '日期错误',
				description: '超出日期选择范围',
			});
		} else {
			this.props.setDate(dateString);
		}

	}

	clickQuery() {

		var data = {
			appCode: this.props.awaken.appCode,
			endDate: this.props.awaken.endDate,
			limit: this.props.awaken.limit,
			offset: 1,
			paramValue: this.props.awaken.paramValue,
			startDate: this.props.awaken.startDate
		}

		this.props.getTable(data);
	}

	handleTableChange(pagination, filters, sorter) {
		console.log(pagination, '分页信息');

		// var data = {
		// 	offset: pagination.current,
		// 	limit: pagination.pageSize,
		// 	name: this.props.userList.Param.name
		// };

		var data = {
			appCode: this.props.awaken.appCode,
			endDate: this.props.awaken.endDate,
			limit: pagination.pageSize,
			offset: pagination.current,
			paramValue: this.props.awaken.paramValue,
			startDate: this.props.awaken.startDate
		}

		this.props.getTable(data);

		// this.props.getTableData(data);



	}

	getDataSource() {
		var arr = [];

		arr = addKey(this.props.awaken.tableData, 'TableaAwaken' + new Date().getTime());

		return arr;
	}

	getDownloadName(data) {
		let prefix = '站外唤醒-';
		let fileName = '全部';

		if (data.paramValue) {
			fileName = data.paramValue;
		} else if (data.appCode) {
			fileName = data.appCode == '24' ? 'Android' : 'iOS';
		}

		return prefix + fileName + '-(' + data.startDate + '至' + data.endDate + ')';
	}

	downloadExcel() {
		let data = {
			appCode: this.props.awaken.appCode,
			endDate: this.props.awaken.endDate,
			limit: -1,
			offset: 1,
			paramValue: this.props.awaken.paramValue,
			startDate: this.props.awaken.startDate
		}
		this.fileName = this.getDownloadName(data);

		// console.log(this.fileName);

		this.props.getDownLoadData(data);
	}


	render() {

		var pagination = {
			current: this.props.awaken.offset,
			pageSize: this.props.awaken.limit,
			total: this.props.awaken.total,
			defaultPageSize: this.props.awaken.limit,
			showSizeChanger: true
		}

		console.log(pagination, 'pagination');

		var dataSource = this.getDataSource();

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
                    value={this.props.awaken.appCode}
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
                    placeholder="搜索渠道一级参数"
                    notFoundContent="暂无相关数据"
                    style={{width:"180px"}}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    value={this.props.awaken.paramValue}
                    filterOption={false}
                    onChange={this.searchChannel.bind(this)}
                     >
                  </Select>
                </FormItem>
                {/*搜索渠道结束*/}

 				{/*日历组件开始*/}
                <FormItem label="" >
                  <RangePicker 
                    defaultValue={[moment(this.props.awaken.startDate, dateFormat), moment(this.props.awaken.endDate, dateFormat)]}
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
  				{/*筛选条件结束*/}

  				{ /*表格区域开始*/ }
	            <Content className="channel_table">

	            	<div style={{width:"100%",marginBottom: "10px"}} className="clearfix">
	            	 	{/*下载Excel*/}
          				<Button type="primary" style={{float:"right"}} onClick={this.downloadExcel.bind(this)} icon="download">下载</Button>
	            	</div>
	            	
	            	<Table 
		                loading={this.props.awaken.tableLoading} 
		                locale={{"emptyText": "暂无数据"}} 
		                columns={dealConfigColumns(this.props.awaken.columns)} 
		                dataSource={this.props.awaken.tableData}
						pagination={pagination}
						onChange={this.handleTableChange.bind(this)}
						scroll={{ x: 1600 }}
					/>
	            </Content>
    			{/*表格区域结束*/}
  			</Layout>
		);
	}
}

//将state.counter绑定到props的counter
const mapStateToProps = (state) => {
	return {
		awaken: state.Reducer.awaken
	}
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {

	//全量
	return bindActionCreators(actionCreators, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(awaken);