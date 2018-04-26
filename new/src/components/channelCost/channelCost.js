import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {IndexLink} from 'react-router';
import {Layout, DatePicker, Form, Button, Select, Table, Divider, Upload, Modal} from 'antd';
import NProgress from 'nprogress';
import moment from 'moment';

import * as actionCreators from '../../actions/channelCost/channelCost';

const {Content} = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const {RangePicker} = DatePicker;

const dateFormat = 'YYYY-MM-DD';

class ChannelCost extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        NProgress.start();
        console.log('aaa', this.props);

        this.getChannelGroupList();
        this.getTableData();

    }

    componentDidMount() {
        NProgress.done();
    }

    getChannelGroupList() {
        let postData = {
            appCode: '',
            channelGroup: '',
            channelCategory: ''
        };
        this.props.getChannelGroupList(postData);
    }

    renderChannelGroupList() {
        var arr = [];
        this.props.channelCost.Result.channelGroupList.map((v, k) => {
            arr.push(<Option key={v.id} value={v.channelName.toString()}>{v.channelName}</Option>);
        });
        return arr;
    }

    renderChannelList() {
        var arr = [];
        this.props.channelCost.Result.channelList.map((v, k) => {
            arr.push(<Option key={v.id} value={v.channelName.toString()}>{v.channelName}</Option>);
        });
        return arr;
    }

    searchChannel(channelName) {
        let statusData = {
            appCode: '',
            channelCategory: '',
            channelGroup: this.props.channelCost.Param.channelGroup,
            channelName: channelName
        };
        this.props.changeChannelName(statusData);
    }

    getTableData() {
        let postData = {
            channelGroup: this.props.channelCost.Param.channelGroup,
            channelName: this.props.channelCost.Param.channelName,
            endDate: this.props.channelCost.Param.endDate,
            startDate: this.props.channelCost.Param.startDate,
            offset: this.props.channelCost.Result.offset,
            limit: this.props.channelCost.Result.limit,
        };
        this.props.getTableData(postData);
    }

    changeChannelGroup(channelGroup) {
        let statusData = {
            channelGroup: channelGroup,
            channelName: ''
        };
        this.props.changeChannelGroup(statusData);
    }

    changeDate(value, dateString) {
        let statusData = {
            startDate: dateString[0],
            endDate: dateString[1]
        };
        this.props.setSelectDate(statusData);
    }

    clickQuery() {
        this.getTableData();
    }

    handleTableChange(pagination) {
        let postData = {
            channelGroup: this.props.channelCost.Param.channelGroup,
            channelName: this.props.channelCost.Param.channelName,
            endDate: this.props.channelCost.Param.endDate,
            startDate: this.props.channelCost.Param.startDate,
            offset: pagination.current,
            limit: pagination.pageSize
        };
        this.props.getTableData(postData);
    }

    handleUpload(info) {
        if (info.file.status === 'done') {
            Modal.success({
                title: '导入成功',
                content: '渠道成本导入成功',
            });
        } else if (info.file.status === 'error') {
            Modal.error({
                title: '导入失败',
                content: '渠道成本导入失败!',
            });
        }
    }

    render() {

        let pagination = {
            current: this.props.channelCost.Result.offset,
            pageSize: this.props.channelCost.Result.limit,
            total: this.props.channelCost.Result.total,
            defaultPageSize: this.props.channelCost.Result.limit,
            showSizeChanger: true
        };

        let uploadConfig = {
            // action: 'http://pinyin.netease.com/uploadfile.php',
            action: '/manage/channel/upload.do',
            name: 'fileName',
            showUploadList: false,
            headers: {
                "X-Requested-With": null
            },
            withCredentials: true
        };

        return (
            <Layout style={{marginLeft: 180, position: "relative", marginTop: 60, overflow: "hidden"}}>
                {/*筛选区域开始*/}
                <Content className="channel_filter">
                    <Form layout="inline">
                        {/*操作系统开始*/}
                        <FormItem label="渠道组">
                            <Select
                                placeholder="渠道组选择"
                                dropdownMatchSelectWidth={true}
                                value={this.props.channelCost.Param.channelGroup}
                                style={{width: '70px'}}
                                className="online"
                                onChange={this.changeChannelGroup.bind(this)}>
                                <Option value="">全部</Option>
                                {this.renderChannelGroupList()}
                            </Select>
                        </FormItem>
                        {/*渠道名称开始*/}
                        <FormItem label="">
                            <Select
                                mode="combobox"
                                placeholder="搜索渠道名称"
                                notFoundContent="暂无相关数据"
                                className="searchChannel"
                                defaultActiveFirstOption={false}
                                style={{width: '60px'}}
                                showArrow={false}
                                value={this.props.channelCost.Param.channelName}
                                filterOption={false}
                                onChange={this.searchChannel.bind(this)}
                            >
                                {this.renderChannelList()}
                            </Select>
                        </FormItem>
                        {/*日历组件开始*/}
                        <FormItem label="">
                            <RangePicker
                                defaultValue={[moment(this.props.channelCost.Param.startDate, dateFormat), moment(this.props.channelCost.Param.endDate, dateFormat)]}
                                format={dateFormat}
                                allowClear={false}
                                onChange={this.changeDate.bind(this)}
                                className="channel_DataPicker"
                            />
                        </FormItem>
                        {/*查询开始*/}
                        <FormItem>
                            <Button type="primary" onClick={this.clickQuery.bind(this)}>查询</Button>
                        </FormItem>
                    </Form>
                </Content>
                {/*表格区域开始*/}
                <Content className="channel_table">
                    <div style={{width: "100%", marginBottom:"20px"}} className="channelCostButtonArea">
                        <Upload onChange={this.handleUpload.bind(this)} {...uploadConfig}>
                            <Button type="primary">导入</Button>
                        </Upload>
                        <Button type="primary" icon="download">
                            <a href="/manage/channel/download.do" className='downloadModel'>下载模板</a>
                        </Button>
                    </div>
                    <Table
                        loading={this.props.channelCost.Result.tableLoading}
                        locale={{"emptyText": "暂无数据"}}
                        columns={this.props.channelCost.TableColumns.tableColumns}
                        dataSource={this.props.channelCost.Result.tableList}
                        pagination={pagination}
                        onChange={this.handleTableChange.bind(this)}
                    />
                </Content>
            </Layout>
        );
    }
}

//将state.counter绑定到props的counter
const mapStateToProps = (state) => {
    return {
        channelCost: state.Reducer.channelCost
    }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
    //全量
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelCost);