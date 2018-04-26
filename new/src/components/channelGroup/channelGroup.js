import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {IndexLink} from 'react-router';
import {Layout, Menu, Form, Button, Select, Table, Divider} from 'antd';
import NProgress from 'nprogress';

import * as actionCreators from '../../actions/channelGroup/channelGroup';

const {Content} = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class ChannelGroup extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        NProgress.start();
        this.getChannelTypeList();
        this.getTableData();
    }

    componentDidMount() {
        NProgress.done();
    }

    /*
    * 获取渠道类型列表
    * */
    getChannelTypeList() {
        this.props.getChannelTypeList({
            appCode: this.props.channelGroup.Param.appCode
        });
    }

    /*
    * 获取表格数据
    * */
    getTableData() {
        var data = {
            appCode: this.props.channelGroup.Param.appCode,
            sortField: this.props.channelGroup.Param.sortField,
            sortOrder: this.props.channelGroup.Param.sortOrder,
            channelGroup: this.props.channelGroup.Param.channelGroup,
            channelCategory: this.props.channelGroup.Param.channelCategory,
            channelTypeId: this.props.channelGroup.Param.channelTypeId,
            fatherFlag: this.props.channelGroup.Param.fatherFlag,
            isFree: this.props.channelGroup.Param.isFree,
            offset: this.props.channelGroup.Pagination.current,
            limit: this.props.channelGroup.Pagination.pageSize
        }
        this.props.getTableData(data);
    }

    /*
    * 渲染渠道类型
    * */
    renderChannelTypes() {
        var arr = [];
        this.props.channelGroup.ChannelTypeList.channelTypeList.map((v, k) => {
            arr.push(<Option key={v.id} value={v.id.toString()}>{v.name}</Option>);
        });
        return arr;
    }

    /*
    * 设置操作系统
    * */
    changeOs(id) {
        this.props.changeOs({appCode: id});
    }

    /*
    * 设置线上线下
    * */
    changeChannelCategory(id) {
        this.props.changeChannelCategory({channelCategory: id});
    }

    /*
    * 设置渠道类型
    * */
    changeChannelType(id) {
        this.props.changeChannelType({channelTypeId: id});
    }

    /*
    * 点击查询按钮，查询
    * */
    clickQuery() {
        this.getTableData();
    }

    /*
    * 处理编辑列
    * */
    dealColumns() {
        var columns = this.props.channelGroup.TableColumns.tableColumns;
        var index = columns.length - 1;
        columns[index].render = function (text) {
            return (<IndexLink to={"/manager/channelGroup/edit/" + text.id}>编辑</IndexLink>);
        };
        return columns;
    }

    /*
    * 处理分页事件，请求对应数据
    * */
    handleTableChange(pagination) {
        let data = {
            appCode: this.props.channelGroup.Param.appCode,
            sortField: this.props.channelGroup.Param.sortField,
            sortOrder: this.props.channelGroup.Param.sortOrder,
            channelGroup: this.props.channelGroup.Param.channelGroup,
            channelCategory: this.props.channelGroup.Param.channelCategory,
            channelTypeId: this.props.channelGroup.Param.channelTypeId,
            fatherFlag: this.props.channelGroup.Param.fatherFlag,
            isFree: this.props.channelGroup.Param.isFree,
            offset: pagination.current,
            limit: pagination.pageSize
        };
        this.props.setPagination(data);
    }

    render() {
        let columns = this.dealColumns();
        return (
            <Layout style={{marginLeft: 180, position: "relative", marginTop: 60, overflow: "hidden"}}>
                {/*--筛选区域开始--*/}
                <Content className="channel_filter">
                    <Form layout="inline">
                        {/*操作系统开始*/}
                        <FormItem label="操作系统">
                            <Select
                                placeholder="操作系统选择"
                                dropdownMatchSelectWidth={true}
                                value={this.props.channelGroup.Param.appCode}
                                style={{width: '70px'}}
                                className="online"
                                onChange={this.changeOs.bind(this)}>
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
                                value={this.props.channelGroup.Param.channelCategory}
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
                                value={this.props.channelGroup.Param.channelTypeId}
                                style={{width: '70px'}}
                                className="online"
                                onChange={this.changeChannelType.bind(this)}>
                                <Option value="">全部</Option>
                                {this.renderChannelTypes()}
                            </Select>
                        </FormItem>
                        {/*查询开始*/}
                        <FormItem label="">
                            <Button type="primary" onClick={this.clickQuery.bind(this)}>查询</Button>
                        </FormItem>
                        {/*查询结束*/}
                    </Form>
                </Content>
                {/*表格开始*/}
                <Content className="channel_table">
                    <div style={{width: "100%", marginBottom:"20px"}} className="clearfix">
                        <Button type="primary" style={{float: "right"}}>
                            <IndexLink to={"/manager/channelGroup/create"} activeClassName="active">新建</IndexLink>
                        </Button>
                    </div>
                    <Table
                        loading={this.props.channelGroup.Loading.loading}
                        locale={{"emptyText": "暂无数据"}}
                        columns={columns}
                        dataSource={this.props.channelGroup.Result.tableList}
                        pagination={this.props.channelGroup.Pagination}
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
        channelGroup: state.Reducer.channelGroup
    }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
    //全量
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelGroup);
