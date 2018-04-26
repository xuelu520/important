import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {IndexLink} from 'react-router';
import {Layout, Menu, Form, Button, Select, Table, Divider, Tooltip} from 'antd';
import NProgress from 'nprogress';
import copy from 'copy-to-clipboard';

import * as actionCreators from '../../actions/shortLink/shortLink';

const {Content} = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class ShortLink extends React.Component {


    constructor(props) {
        super(props);
    }

    componentWillMount() {
        NProgress.start();

        this.initAppcode();
        this.getChannelTypes();
        this.getChannelGroup();
        this.getTableData();
    }

    componentDidMount() {
        NProgress.done();
    }

    initAppcode() {
        this.props.setAppCode({
            appCode: '27'
        });
    }

    getChannelTypes() {
        this.props.getChannelTypeList({
            appCode: this.props.shortLink.Param.appCode
        });
    }

    getChannelGroup() {
        let data = {
            appCode: this.props.shortLink.Param.appCode,
            channelGroupId: this.props.shortLink.Param.channelGroup,
            channelTypeId: this.props.shortLink.Param.channelTypeId,
            channelCategory: this.props.shortLink.Param.channelCategory
        };
        this.props.getChannelGroupList(data);
    }

    renderChannelTypes() {
        var arr = [];
        this.props.shortLink.Result.channelTypeList.map((v, k) => {
            arr.push(<Option key={v.id} value={v.id.toString()}>{v.name}</Option>);
        });
        return arr;
    }

    renderChannelGroup() {
        var arr = [];
        this.props.shortLink.Result.channelGroupList.map((v, k) => {
            arr.push(<Option key={v.id} value={v.id.toString()}>{v.channelName}</Option>);
        });
        return arr;
    }

    renderChannelList() {
        var arr = [];
        this.props.shortLink.Result.channelLinkList.map((v, k) => {
            arr.push(<Option key={v.id} value={v.channelName}>{v.channelName}</Option>);
        });
        return arr;
    }

    changeChannelCategory(id) {
        let data = {
            appCode: this.props.shortLink.Param.appCode,
            channelGroupId: '',
            channelTypeId: '',
            channelCategory: id,
        };
        this.props.changeChannelCategory(data);
    }

    changeChannelType(id) {
        let data = {
            appCode: this.props.shortLink.Param.appCode,
            channelGroupId: '',
            channelTypeId: id,
            channelCategory: this.props.shortLink.Param.channelCategory
        };
        this.props.changeChannelType(data);
    }

    changeChannelGroup(id) {
        let data = {
            appCode: this.props.shortLink.Param.appCode,
            channelGroupId: id,
            channelTypeId: this.props.shortLink.Param.channelTypeId,
            channelCategory: this.props.shortLink.Param.channelCategory
        };
        this.props.changeChannelGroup(data);
    }

    searchChannel(id) {
        let data = {
            appCode: this.props.shortLink.Param.appCode,
            channelGroupId: this.props.shortLink.Param.channelGroup,
            channelTypeId: this.props.shortLink.Param.channelTypeId,
            channelCategory: this.props.shortLink.Param.channelCategory,
            channelName: id
        };
        this.props.changeChannelName(data);
    }

    getTableData() {
        let data = {
            appCode: this.props.shortLink.Param.appCode,
            sortField: this.props.shortLink.Param.sortField,
            sortOrder: this.props.shortLink.Param.sortOrder,
            channelGroup: this.props.shortLink.Param.channelGroup,
            channelTypeId: this.props.shortLink.Param.channelTypeId,
            channelCategory: this.props.shortLink.Param.channelCategory,
            channelName: this.props.shortLink.Param.channelName,
            fatherFlag: this.props.shortLink.Param.fatherFlag,
            isFree: this.props.shortLink.Param.isFree,
            offset: this.props.shortLink.Result.offset,
            limit: this.props.shortLink.Result.limit
        };
        this.props.getTableData(data);
    }

    clickQuery() {
        this.getTableData();
    }

    handleTableChange(pagination) {
        let postData = {
            appCode: this.props.shortLink.Param.appCode,
            sortField: this.props.shortLink.Param.sortField,
            sortOrder: this.props.shortLink.Param.sortOrder,
            channelGroup: this.props.shortLink.Param.channelGroup,
            channelTypeId: this.props.shortLink.Param.channelTypeId,
            channelCategory: this.props.shortLink.Param.channelCategory,
            channelName: this.props.shortLink.Param.channelName,
            fatherFlag: this.props.shortLink.Param.fatherFlag,
            isFree: this.props.shortLink.Param.isFree,
            offset: pagination.current,
            limit: pagination.pageSize
        };
        this.props.getTableData(postData);
    }

    copyText(text) {
        copy(text);
    }

    dealColumns() {
        let columns = this.props.shortLink.TableColumns.tableColumns;
        let that = this;
        columns.map(function (item) {
            if (item.dataIndex == 'customUrl') {
                item.render = function (text) {
                    return (
                        <span>{text} &nbsp;
                            <Tooltip placement="topLeft" title="点击复制到剪贴板">
                                <a href='javascript:void(0);' onClick={that.copyText.bind(this, text)}>复制</a>
                            </Tooltip>
                        </span>
                    );
                };
            }
        });
        return columns;
    }

    render() {
        let columns = this.dealColumns();
        let pagination = {
            current: this.props.shortLink.Result.offset,
            pageSize: this.props.shortLink.Result.limit,
            total: this.props.shortLink.Result.total,
            defaultPageSize: this.props.shortLink.Result.limit,
            showSizeChanger: true
        }
        return (
            <Layout style={{marginLeft: 180, position: "relative", marginTop: 60, overflow: "hidden"}}>
                {/*筛选区域开始*/}
                <Content className="channel_filter">
                    <Form layout="inline">
                        {/*操作系统开始*/}
                        <FormItem label="操作系统">
                            <Select
                                disabled
                                placeholder="操作系统选择"
                                dropdownMatchSelectWidth={true}
                                value={this.props.shortLink.Param.appCode}
                                style={{width: '70px'}}
                                className="online">
                                <Option value="">全部</Option>
                                <Option value="24">Android</Option>
                                <Option value="27">iOS</Option>
                            </Select>
                        </FormItem>
                        {/*操作系统结束*/}
                        {/*线上、线下开始*/}
                        <FormItem label="线上/线下">
                            <Select
                                placeholder="线上线下选择"
                                dropdownMatchSelectWidth={true}
                                value={this.props.shortLink.Param.channelCategory}
                                style={{width: '70px'}}
                                className="online"
                                onChange={this.changeChannelCategory.bind(this)}>
                                <Option value="">全部</Option>
                                <Option value="1">线上</Option>
                                <Option value="2">线下</Option>
                            </Select>
                        </FormItem>
                        {/*线上、线下结束*/}
                        {/*渠道类型开始*/}
                        <FormItem label="渠道类型">
                            <Select
                                showSearch
                                placeholder="渠道类型选择"
                                dropdownMatchSelectWidth={true}
                                value={this.props.shortLink.Param.channelTypeId}
                                style={{width: '70px'}}
                                className="online"
                                onChange={this.changeChannelType.bind(this)}>
                                <Option value="">全部</Option>
                                {this.renderChannelTypes()}
                            </Select>
                        </FormItem>
                        {/*渠道类型开始*/}
                        {/*渠道组开始*/}
                        <FormItem label="渠道组">
                            <Select
                                showSearch
                                placeholder="渠道组选择"
                                dropdownMatchSelectWidth={true}
                                value={this.props.shortLink.Param.channelGroup}
                                style={{width: '70px'}}
                                className="online"
                                onChange={this.changeChannelGroup.bind(this)}>
                                <Option value="">全部</Option>
                                {this.renderChannelGroup()}
                            </Select>
                        </FormItem>
                        {/*渠道组结束*/}
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
                                value={this.props.shortLink.Param.channelName}
                                filterOption={false}
                                onChange={this.searchChannel.bind(this)}
                            >
                                {this.renderChannelList()}
                            </Select>
                        </FormItem>
                        {/*渠道名称结束*/}
                        {/*查询开始*/}
                        <FormItem>
                            <Button type="primary" onClick={this.clickQuery.bind(this)}>查询</Button>
                        </FormItem>
                        {/*查询结束*/}
                    </Form>
                </Content>
                {/*筛选结束*/}
                {/*表格开始*/}
                <Content className="channel_table">
                    <div style={{width: "100%", marginBottom:"20px"}} className="clearfix">
                        <Button type="primary" style={{float: "right"}}>
                            <IndexLink to={"/manager/shortLink/create"} activeClassName="active">新建</IndexLink>
                        </Button>
                    </div>
                    <Table
                        loading={this.props.shortLink.Result.tableLoading}
                        locale={{"emptyText": "暂无数据"}}
                        columns={columns}
                        dataSource={this.props.shortLink.Result.tableList}
                        pagination={pagination}
                        onChange={this.handleTableChange.bind(this)}
                    />
                </Content>
                {/*表格结束*/}
            </Layout>
        );
    }
}

//将state.counter绑定到props的counter
const mapStateToProps = (state) => {
    return {
        shortLink: state.Reducer.shortLink
    }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
    //全量
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ShortLink);
