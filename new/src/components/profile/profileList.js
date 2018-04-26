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
  Modal,
  notification,
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

import {
  dealConfigColumns
} from '../../common/utils';

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

import "../../theme/profile/profile.css";
import * as actionCreators from '../../actions/profileList/profileList.js';


/**
 * 用户概况列表页
 * @class ProfileList
 * @constructor
 */
class ProfileList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    }

  }


  componentWillMount() {

    // this.props.router.push('/user/list');


    NProgress.start();

    //获取渠道组列表
    this.getGroupList();

    //获取渠道列表
    this.setChannelList();

    //获取表格数据
    this.setTable();

    console.log(this.props.profileList, 'this.props.profileList');

    var data = {
      appCode: this.props.profileList.Param.appCode,
      channelGroup: this.props.profileList.Param.channelGroup,
      channelCategory: this.props.profileList.Param.channelCategory,
      channelName: this.props.profileList.Param.channelName,
      tab: this.props.profileList.ClickTab.clickTab,
      startDate: this.props.profileList.Param.startDate,
      endDate: this.props.profileList.Param.endDate
    }

    this.props.clickTab(data);
  }


  componentDidMount() {
    NProgress.done();
    console.log(this.props, 'this.props');
  }

  componentDidUpdate(nextProps) {

    this.getChartShow();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.profileList.Result.excelData != this.props.profileList.Result.excelData) {
      let downloadTitles = dealDownloadTitle(this.props.profileList.TableColumns.tableColumns);
      let helperColumns = dealDownloadColumns(this.props.profileList.TableColumns.tableColumns);
      let downloadDatas = dealDownloadData(nextProps.profileList.Result.excelData, helperColumns);

      downloadExcle(downloadDatas, downloadTitles, this.fileName);
    }
  }

  /**
   * 获取表格数据
   * @method setTable
   */
  setTable() {

    var data = {
      appCode: this.props.profileList.Param.appCode,
      channelGroup: this.props.profileList.Param.channelGroup,
      channelName: this.props.profileList.Param.channelName,
      startDate: this.props.profileList.Param.startDate,
      endDate: this.props.profileList.Param.endDate,
      channelCategory: this.props.profileList.Param.channelCategory,
      offset: this.props.profileList.Pagination.current,
      limit: this.props.profileList.Pagination.pageSize,
      type: this.props.profileList.Param.type
    }

    this.props.getTable(data);
  }

  /**
   * 获取渠道列表
   * @method getChannelList
   */
  setChannelList() {

    var channelListData = {
      appCode: this.props.profileList.Param.appCode,
      channelGroup: this.props.profileList.Param.channelGroup,
      channelCategory: this.props.profileList.Param.channelCategory,
      channelName: this.props.profileList.Param.channelName
    }

    this.props.getChannelList(channelListData);
  }

  /**
   * 获取渠道组
   * @method getGroupList
   */

  getGroupList() {
    var data = {
      appCode: this.props.profileList.Param.appCode,
      channelCategory: this.props.profileList.Param.channelCategory
    }

    this.props.getGroupList(data);
  }

  /**
   * Table 回调方法
   * @method handleTableChange
   * @param pagination {Object} 分页信息
   * @param filters {Object} 搜索信息
   * @param sorter {Object} 排序信息
   */
  handleTableChange(pagination, filters, sorter) {

    var data = {
      appCode: this.props.profileList.Param.appCode,
      channelGroup: this.props.profileList.Param.channelGroup,
      channelName: this.props.profileList.Param.channelName,
      startDate: this.props.profileList.Param.startDate,
      endDate: this.props.profileList.Param.endDate,
      channelCategory: this.props.profileList.Param.channelCategory,
      offset: pagination.current,
      limit: pagination.pageSize,
      type: this.props.profileList.Param.type,
      channel: this.props.profileList.Channel.channel
    }

    //设置分页
    this.props.setPagination(data);
    // }
  }

  /**
   * 对比弹出层
   * @method showModal
   */
  showModal(e) {
    this.setState({
      visible: true
    });
  }

  /**
   * 对比弹出层确认添加
   * @method handleOk
   */
  handleOk(e) {
    console.log(e);
    this.setState({
      visible: false
    });
  }
  /**
   * 对比弹出层取消
   * @method handleCancel
   */
  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  /**
   * 搜索渠道组
   * @method handleChange
   * @param value {String}
   */
  handleChange(value) {

    var data = {
      appCode: this.props.profileList.Param.appCode,
      channelGroup: value,
      channelCategory: this.props.profileList.Param.channelCategory,
      channelName: ""
    }

    this.props.clickGroupList(data, this.props.getChannelList);
  }

  /**
   * 渠道搜索
   * @method searchChannel
   * @param value {String}
   */
  searchChannel(value) {
    var data = {
      appCode: this.props.profileList.Param.appCode,
      channelGroup: this.props.profileList.Param.channelGroup,
      channelCategory: this.props.profileList.Param.channelCategory,
      channelName: value
    }

    this.props.getChannelList(data);

  }

  /**
   * 切换tab
   * @method changeTab
   * @param {Number} id
   */
  changeTab(id) {
    var data = {
      appCode: this.props.profileList.Param.appCode,
      channelGroup: this.props.profileList.Param.channelGroup,
      channelCategory: this.props.profileList.Param.channelCategory,
      channelName: this.props.profileList.Param.channelName,
      tab: id,
      startDate: this.props.profileList.Param.startDate,
      endDate: this.props.profileList.Param.endDate
    }

    this.props.clickTab(data);

  }

  /** 
   * 切换汇总、明细、单渠道
   * @method setType
   * @param e {Object} 点击事件
   */
  setType(e) {

    let id = parseInt(e.currentTarget.dataset.id, 10);

    var data = {
      appCode: this.props.profileList.Param.appCode,
      channelGroup: this.props.profileList.Param.channelGroup,
      channelName: this.props.profileList.Param.channelName,
      startDate: this.props.profileList.Param.startDate,
      endDate: this.props.profileList.Param.endDate,
      channelCategory: this.props.profileList.Param.channelCategory,
      offset: this.props.profileList.Pagination.current,
      limit: this.props.profileList.Pagination.pageSize,
      type: id
    }


    this.props.setType(data);

  }

  /**
   * 显示汇总、明细
   * @method getTypeTpl
   */
  getTypeTpl() {
    var arr = [];
    if (this.props.profileList.Param.type == 1) {
      arr.push(<Button key={1} type="primary">
                汇总
        </Button>)

      arr.push(<Button key={2} type="default" data-id={2} onClick={this.setType.bind(this)}>
                明细
        </Button>)

    } else if (this.props.profileList.Param.type == 2 || this.props.profileList.Param.type == 3) {

      arr.push(<Button key={1} type="defualt" data-id={1} onClick={this.setType.bind(this)}>
                汇总
        </Button>)

      arr.push(<Button key={2} data-id={2} onClick={this.setType.bind(this)} type="primary">
          明细
        </Button>)
    }

    return arr;
  }

  /**
   * 设置单渠道
   * @method channelDetail
   */
  channelDetail(e) {

    var data = {
      appCode: this.props.profileList.Param.appCode,
      channelName: e.currentTarget.text,
      startDate: this.props.profileList.Param.startDate,
      endDate: this.props.profileList.Param.endDate,
      channelCategory: this.props.profileList.Param.channelCategory,
      offset: this.props.profileList.Pagination.current,
      limit: this.props.profileList.Pagination.pageSize,
      type: this.props.profileList.Param.type
    }

    this.props.channelDetail(data);
  }

  /**
   * 单渠道列表格式转换
   * @method renderTableData 
   */
  renderTableData() {
    var arr = [];
    if (this.props.profileList.Param.type == 2) {
      this.props.profileList.TableColumns.tableColumns.map((v, k) => {

        if (v.dataIndex == 'channel') {
          v.render = (text, record) => (<a href="javascript:void(0);" onClick={this.channelDetail.bind(this)}>{text}</a>)
        }
        arr.push(v);
      });
    } else {
      arr = this.props.profileList.TableColumns.tableColumns;
    }

    return arr;
  }

  /**
   * 显示面包屑
   * @method getBreadCurmb 面包屑
   */
  getBreadCurmb() {
    var arr = [];

    arr.push(<Breadcrumb.Item key={this.props.profileList.Param.type}>数据明细</Breadcrumb.Item>);
    if (this.props.profileList.Param.type == 3) {
      arr.push(<Breadcrumb.Item key = {this.props.profileList.Param.type}><a href="javascript:void(0);" data-id={2} onClick={this.setType.bind(this)}>明细</a></Breadcrumb.Item>);
      arr.push(<Breadcrumb.Item key = {this.props.profileList.Channel.channel}>{this.props.profileList.Channel.channel}</Breadcrumb.Item>);
    } else if (this.props.profileList.Param.type == 2) {
      arr.push(<Breadcrumb.Item key = {this.props.profileList.Param.type}>明细</Breadcrumb.Item>);
    } else {
      arr.push(<Breadcrumb.Item key = {this.props.profileList.Param.type}>汇总</Breadcrumb.Item>);
    }

    return arr;
  }

  getChartsName(data) {

    let name = '全部';

    if (data.channelName) {
      name = data.channelName;
    } else if (data.channelGroup) {
      name = data.channelGroup;
    } else if (data.channelCategory) {
      name = data.channelCategory == '1' ? '线上' : '线下';
    } else if (data.appCode) {
      name = data.appCode == '24' ? 'Android' : 'iOS';
    }

    return name;
  }

  /**
   * 显示哪个tab数据
   * @method getChartShow
   */
  getChartShow() {
    var tabId = this.props.profileList.ClickTab.clickTab;
    var name = '1';
    // if (tabId == '1') {
    //   name = '新增用户';
    // } else if (tabId == '2') {
    //   name = '用户质量';
    // } else if (tabId == '3') {
    //   name = '活跃用户';
    // } else if (tabId == '4') {
    //   name = '回访用户';
    // } else if (tabId == '5') {
    //   name = '流失用户';
    // } else if (tabId == '6') {
    //   name = '回归用户';
    // } else if (tabId == '7') {
    //   name = '迁出用户';
    // }

    name = this.props.profileList.ClickTab.legendName;

    if (this.props.profileList.ChartsResults.chartResult.length != 0 && this.props.profileList.ChartsResults.chartResult[0].value.length != 0) {
      var series = [];
      series.push({
        "name": name,
        "type": "line",
        "stack": name,
        "data": this.props.profileList.ChartsResults.chartResult[0].value
      });

      var data = {
        "names": [name],
        "xAxis": this.props.profileList.ChartsResults.chartResult[0].key,
        "series": series
      }


      var myChart = echarts.init(this.refs['charts' + tabId]);
      var config = Line(data);
      myChart.setOption(config);
      window.onresize = myChart.resize;

    } else {
      // if (this.props.flowDistribution.chartsNoData8) {
      this.refs['charts' + tabId].innerHTML = '<div style="text-align:center">没有查询到相关数据</div>';
      // }
    }

  }

  /**
   * 切换操作系统 
   * @method changeOs
   * @param id {Number} id
   */
  changeOs(id) {
    var data = {
      appCode: id,
      channelGroup: "",
      channelCategory: "",
      channelName: ""
    }

    this.props.changeOs(data, this.props.getChannelList, this.props.getGroupList);
  }

  /**
   * 切换线上线下
   * @method changeChannelCategory
   * @param id {Number} id
   */
  changeChannelCategory(id) {

    var data = {
      appCode: this.props.profileList.Param.appCode,
      channelGroup: "",
      channelCategory: id,
      channelName: ""
    }

    this.props.changeChannelCategory(data, this.props.getChannelList, this.props.getGroupList);

  }

  /**
   * 渲染renderGroupList
   * @method renderGroupList
   * @return arr {Array} [{},{}]
   */
  renderGroupList() {
    var arr = [];

    this.props.profileList.ChannelGroupList.channelGroupList.map((v, k) => {
      arr.push(<Option key={v.id} value={v.channelName}>{v.channelName}</Option>);
    });

    return arr;
  }

  /**
   * 渲染渠道列表
   * @method getChannelList
   */

  getChannelList() {

    var arr = [];

    this.props.profileList.channelList.channelList.map((v, k) => {
      arr.push(<Option key={v.channelName} value={v.channelName}>{v.channelName}</Option>);
    });

    return arr;
  }

  /**
   * 开始时间和结束时间切换
   * @method changeDate
   * @param value {Object}
   * @param dateString {Array}
   */
  changeDate(value, dateString) {
    console.log(value, dateString);

    console.log(this.props.profileList.Param.endDate, 'endDate');

    if (dateString[1] > this.props.profileList.Param.maxDate) {

      notification['error']({
        message: '日期错误',
        description: '超出日期选择范围',
      });
    } else {
      this.props.setDate(this.props.profileList.Param, dateString);
    }

  }

  /** 
   * 查询按扭
   * @method clickQuery
   * @param e {Object}
   */
  clickQuery(e) {

    //type 请求
    var setTypeData = {
      appCode: this.props.profileList.Param.appCode,
      channelGroup: this.props.profileList.Param.channelGroup,
      channelName: this.props.profileList.Param.channelName,
      startDate: this.props.profileList.Param.startDate,
      endDate: this.props.profileList.Param.endDate,
      channelCategory: this.props.profileList.Param.channelCategory,
      offset: this.props.profileList.Pagination.current,
      limit: this.props.profileList.Pagination.pageSize,
      type: this.props.profileList.Param.type
    }

    this.props.setType(setTypeData);

    var data = {
      appCode: this.props.profileList.Param.appCode,
      channelGroup: this.props.profileList.Param.channelGroup,
      channelCategory: this.props.profileList.Param.channelCategory,
      channelName: this.props.profileList.Param.channelName,
      tab: this.props.profileList.ClickTab.clickTab,
      startDate: this.props.profileList.Param.startDate,
      endDate: this.props.profileList.Param.endDate
    }

    this.props.clickTab(data);
  }



  getDownloadName(data) {
    let prefix = '用户概况-';
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

  downloadExcel() {

    this.fileName = this.getDownloadName(this.props.profileList.Param);

    var downExcelData = {
      appCode: this.props.profileList.Param.appCode,
      channelGroup: this.props.profileList.Param.channelGroup,
      channelName: this.props.profileList.Param.channelName,
      startDate: this.props.profileList.Param.startDate,
      endDate: this.props.profileList.Param.endDate,
      channelCategory: this.props.profileList.Param.channelCategory,
      offset: this.props.profileList.Pagination.current,
      limit: this.props.profileList.Pagination.pageSize,
      type: this.props.profileList.Param.type
    }

    this.props.getDownLoadData(downExcelData);

  }

  render() {

    var columns = this.renderTableData();

    let targetColumns = dealConfigColumns(columns);

    return (
      <Layout style={{marginLeft: 180,position: "relative", marginTop:"60px", overflow:"hidden"}}> 
          { /*筛选区域开始*/ }
          <Content className="channel_filter">
              <Form layout="inline">
                {/*操作系统开始*/}
                <FormItem label="操作系统">
                  <Select 
                    placeholder="操作系统选择" 
                    dropdownMatchSelectWidth={true}  
                    value={this.props.profileList.Param.appCode}
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
                    value={this.props.profileList.Param.channelCategory}
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
                    value={this.props.profileList.Param.channelGroup}
                    className="channelGroup"
                    optionFilterProp="children"
                    onChange={this.handleChange.bind(this)}>
                    <Option value="">全部</Option>
                    {/*渠道组列表*/}
                    {this.renderGroupList()}
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
                    value={this.props.profileList.Param.channelName}
                    filterOption={false}
                    onChange={this.searchChannel.bind(this)}
                     >
                     {/* {options}*/}
                     {this.getChannelList()}
                  </Select>
                </FormItem>
                {/*搜索渠道结束*/}

                {/*日历组件开始*/}
                <FormItem label="" >
                  <RangePicker 
                    value={[moment(this.props.profileList.Param.startDate, dateFormat), moment(this.props.profileList.Param.endDate, dateFormat)]}
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
            <Content className="channel_charts" >
              <Tabs onChange={this.changeTab.bind(this)} type="card" activeKey={this.props.profileList.ClickTab.clickTab +''}>
                <TabPane tab="新增用户" key="1">
{/*                  <div style={{width:"100%"}} className="clearfix">
                    <Button type="primary" icon="plus" style={{float:"right"}} onClick={this.showModal.bind(this)}>对比</Button>
                  </div>*/}
                  <Spin spinning={this.props.profileList.ChartLoading.chartLoading}>
                    <div id="chart1" ref="charts1" style={{width:"100%", minHeight: "300px" }}>
                      新增用户
                    </div>
                  </Spin>
                </TabPane>
                <TabPane tab="用户质量" key="2">
{/*                  <div style={{width:"100%"}} className="clearfix">
                    <Button type="primary" icon="plus" style={{float:"right"}} onClick={this.showModal.bind(this)}>对比</Button>
                  </div>*/}
                  
                    <Spin spinning={this.props.profileList.ChartLoading.chartLoading} >
                      <div id="chart2" ref="charts2"  style={{ width: "100%", minHeight: "300px" }}>
                        用户概况
                      </div>
                    </Spin>
                 
                </TabPane>
                <TabPane tab="活跃用户" key="3">
{/*                  <div style={{width:"100%"}} className="clearfix">
                    <Button type="primary" icon="plus" style={{float:"right"}} onClick={this.showModal.bind(this)}>对比</Button>
                  </div>*/}
                  <Spin spinning={this.props.profileList.ChartLoading.chartLoading} >
                    <div id="chart3" ref="charts3"  style={{ width: "100%", minHeight: "300px" }}>
                      活跃用户
                    </div>
                  </Spin>
                  
                </TabPane>
                <TabPane tab="回访用户" key="4">
{/*                  <div style={{width:"100%"}} className="clearfix">
                    <Button type="primary" icon="plus" style={{float:"right"}} onClick={this.showModal.bind(this)}>对比</Button>
                  </div>*/}
                  <Spin spinning={this.props.profileList.ChartLoading.chartLoading} >
                    <div id="chart4" ref="charts4"  style={{ width: "100%", minHeight: "300px" }}>
                      回访用户
                    </div>
                  </Spin>
                </TabPane>
                <TabPane tab="流失用户" key="5">
{/*                  <div style={{width:"100%"}} className="clearfix">
                    <Button type="primary" icon="plus" style={{float:"right"}} onClick={this.showModal.bind(this)}>对比</Button>
                  </div>*/}
                  <Spin spinning={this.props.profileList.ChartLoading.chartLoading} >
                    <div id="chart5" ref="charts5"  style={{ width: "100%", minHeight: "300px" }}>
                      流失用户
                    </div>
                  </Spin>
                </TabPane>
                <TabPane tab="回归用户" key="6">
{/*                  <div style={{width:"100%"}} className="clearfix">
                    <Button type="primary" icon="plus" style={{float:"right"}} onClick={this.showModal.bind(this)}>对比</Button>
                  </div>*/}
                  <Spin spinning={this.props.profileList.ChartLoading.chartLoading} >
                    <div id="chart6" ref="charts6"  style={{ width: "100%", minHeight: "300px" }}>
                      回归用户
                    </div>
                  </Spin>
                

                </TabPane>
                <TabPane tab="迁出用户" key="7">
{/*                  <div style={{width:"100%"}} className="clearfix">
                    <Button type="primary" icon="plus" style={{float:"right"}} onClick={this.showModal.bind(this)}>对比</Button>
                  </div>*/}
                  <Spin spinning={this.props.profileList.ChartLoading.chartLoading} >
                    <div id="chart7" ref="charts7"  style={{ width: "100%", minHeight: "300px" }}>
                      迁出用户
                    </div>
                  </Spin>
                
                </TabPane>
              </Tabs>
            </Content> 
            { /*图表模块结束*/ } 

            { /*表格模块开始*/ }
            <Content className="channel_table">
              
                <div style={{width:"100%"}} className="clearfix">
                  {/*面包屑*/}
                  <Breadcrumb style={{float: "left", height: "28px", lineHeight: "28px"}}>
                    {this.getBreadCurmb()}
                  </Breadcrumb>
                  {/*下载Excel*/}
                  <Button type="primary" style={{float:"right"}} onClick={this.downloadExcel.bind(this)} icon="download">下载</Button>
                  {/*汇总和明细切换*/}
                  <ButtonGroup  style={{ marginBottom:"20px", float:"right",marginRight: "10px"}}>
                    {this.getTypeTpl()}
                  </ButtonGroup>

                </div>

                <div>

                </div>
              <Table 
                loading={this.props.profileList.Loading.loading} 
                locale={{"emptyText": "暂无数据"}} 
                columns={targetColumns}
                dataSource={this.props.profileList.Result.tableList}
                pagination={this.props.profileList.Pagination}  
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
    profileList: state.Reducer.profileList
  }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {

  //全量
  return bindActionCreators(actionCreators, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileList);