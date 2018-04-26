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
  notification,
  Select,
  Table,
  DatePicker,
  Tabs,
  Spin,
  Divider,
  Modal,
  LocaleProvider
} from 'antd';

// import zhCN from 'antd/lib/locale-provider/zh_CN';

import {
  getDownloadName,
  downloadExcle,
  dealDownloadTitle,
  dealDownloadData,
  dealDownloadColumns
} from '../../common/channelManagerUtil';

//用户权限列表
import {
  renderGroupList,
  addKey,
  dealConfigColumns
} from '../../common/utils';

//下载相关的数据
import * as downloadFile from '../../common/downloadFile';

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
  Header,
  Content,
  Sider
} = Layout;

const FormItem = Form.Item;
const Option = Select.Option;

const thunk = require('redux-thunk').default;

const {
  MonthPicker,
  RangePicker
} = DatePicker;

import moment from 'moment';

import NProgress from 'nprogress';

const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM';

//todo import 别名
import "../../theme/profile/profile.css";
import * as actionCreators from '../../actions/kpi/kpi.js';


class kpiDetail extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    NProgress.start();
    // this.props.getTable(this.props.profileList.Param);
    //获取渠道组
    this.getChannelGroup();

    //获取getCharts
    this.getCharts();

    //获取表格数据
    this.getTables();

  }

  componentDidUpdate() {
    this.getChartShow();
  }

  componentDidMount() {
    NProgress.done();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.kpi.Result.excelData != this.props.kpi.Result.excelData) {

      let downloadTitles = dealDownloadTitle(this.props.kpi.Param.columns);
      let helperColumns = dealDownloadColumns(this.props.kpi.Param.columns);
      let downloadDatas = dealDownloadData(nextProps.kpi.Result.excelData, helperColumns);

      downloadExcle(downloadDatas, downloadTitles, this.fileName);
    }

  }

  getTables() {
    var data = {
      channelGroup: this.props.kpi.Param.channelGroup,
      dateType: this.props.kpi.Param.dateType,
      startDate: this.props.kpi.Param.startDate,
      endDate: this.props.kpi.Param.endDate,
      offset: this.props.kpi.Param.offset,
      limit: this.props.kpi.Param.limit
    }

    this.props.getTables(data);

  }

  /**
   * 显示哪个tab数据
   * @method getChartShow
   */
  getChartShow() {

    var tabId = this.props.kpi.Param.tab;

    var name = "全部";
    if (this.props.kpi.Param.channelGroupResultName == "") {
      name = "全部";
    } else {
      name = this.props.kpi.Param.channelGroupResultName;
    }



    // if (tabId == '1') {
    //   name = '新增用户';
    // } else if (tabId == '2') {
    //   name = '付费新增';
    // } else if (tabId == '3') {
    //   name = '免新新增';
    // } else if (tabId == '4') {
    //   name = '用户质量';
    // } else if (tabId == '5') {
    //   name = '次日留存率';
    // } else if (tabId == '6') {
    //   name = '7日留存率';
    // }



    if (this.props.kpi.Result.chartsResult[0] != undefined && this.props.kpi.Result.chartsResult[0].key.length != 0) {
      var series = [];
      series.push({
        "name": name,
        "type": "line",
        "stack": name,
        "data": this.props.kpi.Result.chartsResult[0].value
      });

      var data = {
        "names": [name],
        "xAxis": this.props.kpi.Result.chartsResult[0].key,
        "series": series
      }

      //todo initToinit  EchartUpdate

      var myChart = echarts.init(this.refs['charts' + tabId]);
      var config = Line(data);
      myChart.setOption(config);
      window.onresize = myChart.resize;

    } else {

      if (this.props.kpi.Param.chartsNoData) {
        this.refs['charts' + tabId].innerHTML = '<div style="text-align:center">没有查询到相关数据</div>';
      }

    }
  }

  getCharts() {
    var data = {
      channelGroup: this.props.kpi.Param.channelGroup,
      dateType: this.props.kpi.Param.dateType,
      tab: this.props.kpi.Param.tab,
      startDate: this.props.kpi.Param.startDate,
      endDate: this.props.kpi.Param.endDate
    }

    this.props.getCharts(data);

  }

  //获取渠道组
  getChannelGroup() {
    var data = {
      cppCode: "",
      channelCategory: ""
    }

    this.props.getChannelGroup(data);
  }


  handleChangeGroup(value) {
    this.props.changeGroup(value);
  }


  changeTab(id) {
    //todo 缓存
    var data = {
      channelGroup: this.props.kpi.Param.channelGroup,
      dateType: this.props.kpi.Param.dateType,
      tab: parseInt(id, 10),
      startDate: this.props.kpi.Param.startDate,
      endDate: this.props.kpi.Param.endDate
    }

    this.props.getCharts(data);

  }

  clickDateType(e) {
    console.log(e.currentTarget);

    var data = {
      dateType: parseInt(e.currentTarget.dataset.id, 10)
    };

    this.updateDateType(data);

  }

  updateDateType(data) {
    this.props.updateDateType(data);
  }

  /**
   * 开始时间和结束时间切换
   * @method changeDate
   * @param value {Object}
   * @param dateString {Array}
   */
  changeDate(value, dateString) {

    if (dateString[1] > this.props.kpi.Param.maxDate) {

      notification['error']({
        message: '日期错误',
        description: '超出日期选择范围',
      });
    } else {
      this.props.setDate(dateString);
    }


  }

  weekMonthList() {
    //todo优化
    var button = null;
    if (this.props.kpi.Param.dateType == 1) {
      button = (<ButtonGroup>
                    <Button type="primary">周</Button>
                    <Button data-id={2} onClick={this.clickDateType.bind(this)}>月</Button>
                    <Button data-id={3} onClick={this.clickDateType.bind(this)}>季度</Button>
                </ButtonGroup>);
    } else if (this.props.kpi.Param.dateType == 2) {
      button = (<ButtonGroup>
                    <Button data-id={1} onClick={this.clickDateType.bind(this)}>周</Button>
                    <Button type="primary">月</Button> 
                    <Button data-id={3} onClick={this.clickDateType.bind(this)}>季度</Button>
                </ButtonGroup>);
    } else {
      button = (<ButtonGroup>
                    <Button data-id={1} onClick={this.clickDateType.bind(this)}>周</Button>
                    <Button data-id={2} onClick={this.clickDateType.bind(this)}>月</Button>
                    <Button type="primary">季度</Button>
                </ButtonGroup>);
    }

    return button;

  }

  clickQuery() {
    //todo query
    var data = {
      channelGroup: this.props.kpi.Param.channelGroup,
      dateType: this.props.kpi.Param.dateType,
      tab: this.props.kpi.Param.tab,
      startDate: this.props.kpi.Param.startDate,
      endDate: this.props.kpi.Param.endDate
    }



    this.props.getCharts(data);


    //表格数据
    var data = {
      channelGroup: this.props.kpi.Param.channelGroup,
      dateType: this.props.kpi.Param.dateType,
      startDate: this.props.kpi.Param.startDate,
      endDate: this.props.kpi.Param.endDate,
      offset: 1,
      limit: this.props.kpi.Param.limit
    }

    this.props.getTables(data);

  }

  getDownloadName(data) {
    let prefix = 'KPI报表-';
    let fileName = '全部';

    let date = "周";


    if (data.channelName) {
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
    // var xlsxName = downloadFile.getXlsxName();
    // var responseData = "";
    // var downloadData = downloadFile.formatData(responseData);
    // downloadFile.toXlsx(downloadData, xlsxName, "sheet1");



    let data = {
      appCode: this.props.kpi.Param.appCode,
      channelName: this.props.kpi.Param.channelName,
      endDate: this.props.kpi.Param.endDate,
      startDate: this.props.kpi.Param.startDate,
      offset: 1,
      limit: -1
    }

    this.fileName = this.getDownloadName(data);


    // var downExcelData = {
    //   appCode: this.props.profileList.Param.appCode,
    //   channelGroup: this.props.profileList.Param.channelGroup,
    //   channelName: this.props.profileList.Param.channelName,
    //   startDate: this.props.profileList.Param.startDate,
    //   endDate: this.props.profileList.Param.endDate,
    //   channelCategory: this.props.profileList.Param.channelCategory,
    //   offset: this.props.profileList.Pagination.current,
    //   limit: this.props.profileList.Pagination.pageSize,
    //   type: this.props.profileList.Param.type
    // }

    this.props.getDownLoadData(data);
  }

  handleTableChange(pagination, filters, sorter) {


    var data = {
      channelGroup: this.props.kpi.Param.channelGroup,
      dateType: this.props.kpi.Param.dateType,
      startDate: this.props.kpi.Param.startDate,
      endDate: this.props.kpi.Param.endDate,
      offset: pagination.current,
      limit: pagination.pageSize
    }

    this.props.getTables(data);
  }

  getDataSource() {
    var arr = [];
    // this.props.kpi.Result.tableResult.map((v, k) => {
    //   console.log(v);
    // v.key = addKey()
    // })

    arr = addKey(this.props.kpi.Result.tableResult, 'TableKpi' + new Date().getTime());
    return arr;
  }


  render() {

    console.log(this.props, 'this.props');

    var searchData = [{
      value: 1,
      text: "qihong1"
    }, {
      value: 2,
      text: "qihong2"
    }];

    var fetching = false;

    var options = searchData.map(d => <Option key={d.text}>{d.text}</Option>);

    console.log(this.props, 'this.props');

    var pagination = {
      current: this.props.kpi.Param.offset,
      pageSize: this.props.kpi.Param.limit,
      total: this.props.kpi.Result.total,
      defaultPageSize: this.props.kpi.Param.limit,
      showSizeChanger: true
    }

    var dataSource = this.getDataSource();

    console.log(dataSource, 'dataSource');

    return (

      <Layout style={{marginLeft: 180,position: "relative", marginTop:60, overflow:"hidden"}}>
          <Content className="channel_filter">
            <Form layout="inline">
                {/*渠道组开始*/}
                <FormItem label="渠道组">
                  <Select 
                    showSearch={true}
                    placeholder="搜索渠道组" 
                    dropdownMatchSelectWidth={true}
                    value={this.props.kpi.Param.channelGroup}
                    className="channelGroup"
                    optionFilterProp="children"
                    onChange={this.handleChangeGroup.bind(this)}>
                    <Option value="">全部</Option>
                    {/*渠道组列表*/}
                    {renderGroupList(this.props.kpi.Param.groupList)}
                  </Select>
                </FormItem>
                {/*渠道组结束*/}

                {/*周月季度开始*/}
                <FormItem label="">
                    {this.weekMonthList()}
                </FormItem>
                {/*周月季度结束*/}

                {/*日历组件开始*/}
                <FormItem label="" >
                  <RangePicker 
                    value={[moment(this.props.kpi.Param.startDate, dateFormat), moment(this.props.kpi.Param.endDate, dateFormat)]}
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
            <Tabs onChange={this.changeTab.bind(this)} type="card" activeKey={this.props.kpi.Param.tab +''}>
              <TabPane tab="新增用户" key="1">
                <Spin spinning={this.props.kpi.Param.chartLoading}>
                  <div id="chart1" ref="charts1" style={{width:"100%", minHeight: "300px" }}>
                    
                  </div>
                </Spin>
              </TabPane>
              <TabPane tab="付费新增" key="2">
                <Spin spinning={this.props.kpi.Param.chartLoading}>
                  <div id="chart2" ref="charts2" style={{width:"100%", minHeight: "300px" }}>
                    
                  </div>
                </Spin>
              </TabPane>
              <TabPane tab="免费新增" key="3">
                <Spin spinning={this.props.kpi.Param.chartLoading}>
                  <div id="chart2" ref="charts3" style={{width:"100%", minHeight: "300px" }}>
                    
                  </div>
                </Spin>
              </TabPane>

              <TabPane tab="用户质量" key="4">
                <Spin spinning={this.props.kpi.Param.chartLoading}>
                  <div id="chart2" ref="charts4" style={{width:"100%", minHeight: "300px" }}>
                    
                  </div>
                </Spin>
              </TabPane>

              <TabPane tab="次日留存率" key="5">
                <Spin spinning={this.props.kpi.Param.chartLoading}>
                  <div id="chart2" ref="charts5" style={{width:"100%", minHeight: "300px" }}>
                    
                  </div>
                </Spin>
              </TabPane>

              <TabPane tab="7日留存率" key="6">
                <Spin spinning={this.props.kpi.Param.chartLoading}>
                  <div id="chart2" ref="charts6" style={{width:"100%", minHeight: "300px" }}>
                    
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
              loading={this.props.kpi.Param.tableLoading} 
              locale={{"emptyText": "暂无数据"}} 
              columns={dealConfigColumns(this.props.kpi.Param.columns)} 
              dataSource={dataSource}
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
    kpi: state.Reducer.Kpi
  }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {

  //全量
  return bindActionCreators(actionCreators, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(kpiDetail);