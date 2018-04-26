import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {IndexLink} from 'react-router';
import {Layout, Menu, Form, Button, Select, Table, Divider} from 'antd';
import NProgress from 'nprogress';

import * as actionCreators from '../../actions/channelList/channelList';

//aa
const {Content} = Layout;
const FormItem = Form.Item;
const Option = Select.Option;


class ChannelList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        NProgress.start();

        //获取搜索区域需要的数据
        this.getChannelTypeList();
        this.getChannelGroupList();

        //获取表格数据
        this.getTableData();
    }

    componentDidMount() {
        NProgress.done();
    }

    /*
    * 切换操作系统
    * 设置appCode的值，重置其后面表单的值
    * */
    changeOs(id) {
        var data = {
            appCode: id,
            channelCategory: "",
            channelGroupId: "",
            channelTypeId: ""
        };
        this.props.changeOs(data);
    }

    /*
    * 切换线上，线下
    * 设置channelCategory的值，重置气候面表单的值
    * */
    changeChannelCategory(id) {
        var data = {
            appCode: this.props.channelList.Param.appCode,
            channelCategory: id,
            channelTypeId: "",
            channelGroupId: ""
        }
        this.props.changeChannelCategory(data);
    }

    /*
    * 切换渠道类型
    * 设置channelTypeId的值，重置其后面表单的值
    * */
    changeChannelType(id) {
        var data = {
            appCode: this.props.channelList.Param.appCode,
            channelCategory: this.props.channelList.channelCategory,
            channelTypeId: id,
            channelGroupId: ""
        }
        this.props.changeChannelType(data);
    }

    /*
    * 切换渠道组
    * 设置channelGroupId的值，重置其后面表单的值
    * */
    changeChannelGroup(id) {
        var data = {
            appCode: this.props.channelList.Param.appCode,
            channelCategory: this.props.channelList.channelCategory,
            channelTypeId: this.props.channelList.channelTypeId,
            channelGroupId: id,
            channelName: ""
        }
        this.props.changeChannelGroup(data);
    }

    /*
    * 设置当前的channelName
    * 根据当前输入的channelName实时获取匹配的channelList
    * */
    searchChannel(value) {
        var data = {
            appCode: this.props.channelList.Param.appCode,
            channelCategory: this.props.channelList.Param.channelCategory,
            channelTypeId: this.props.channelList.Param.channelTypeId,
            channelGroupId: this.props.channelList.Param.channelGroupId,
            channelName: value
        }
        this.props.getChannelList(data);
    }

    /*
    * 根据参数获取表格数据
    * */
    getTableData() {
        var data = {
            appCode: this.props.channelList.Param.appCode,
            sortField: this.props.channelList.Param.sortField,
            sortOrder: this.props.channelList.Param.sortOrder,
            channelGroupId: this.props.channelList.Param.channelGroupId,
            channelCategory: this.props.channelList.Param.channelCategory,
            fatherFlag: this.props.channelList.Param.fatherFlag,
            channelName: this.props.channelList.Param.channelName,
            channelTypeId: this.props.channelList.Param.channelTypeId,
            isFree: this.props.channelList.Param.isFree,
            offset: this.props.channelList.Pagination.current,
            limit: this.props.channelList.Pagination.pageSize
        }
        this.props.getTableData(data);
    }

    /*
    * 获取渠道类型列表
    * */
    getChannelTypeList() {
        var data = {
            appCode: this.props.channelList.Param.appCode
        };
        this.props.getChannelTypeList(data);
    }

    /*
    * 获取渠道组列表
    * */
    getChannelGroupList() {
        var data = {
            appCode: this.props.channelList.Param.appCode,
            channelGroupId: this.props.channelList.Param.channelGroupId,
            channelTypeId: this.props.channelList.Param.channelTypeId,
            channelCategory: this.props.channelList.Param.channelCategory
        };
        this.props.getChannelGroupList(data);
    }

    /*
    * 获取渠道列表
    * */
    getChannelList() {
        var data = {
            appCode: this.props.channelList.Param.appCode,
            channelGroupId: this.props.channelList.Param.channelGroupId,
            channelTypeId: this.props.channelList.Param.channelTypeId,
            channelCategory: this.props.channelList.Param.channelCategory,
            channelName: this.props.channelList.Param.channelName
        };
        this.props.getChannelList(data);
    }

    /*
    * 渲染渠道类型列表
    * */
    renderChannelTypes() {
        var arr = [];
        this.props.channelList.ChannelTypeList.channelTypeList.map((v, k) => {
            arr.push(<Option key={v.id} value={v.id.toString()}>{v.name}</Option>);
        });
        return arr;
    }

    /*
    * 渲染渠道组列表
    * */
    renderChannelGroup() {
        var arr = [];
        this.props.channelList.ChannelGroupList.channelGroupList.map((v, k) => {
            arr.push(<Option key={v.id} value={v.id.toString()}>{v.channelName}</Option>);
        });
        return arr;
    }

    /*
    * 渲染渠道列表
    * */
    renderChannelList() {
        var arr = [];
        this.props.channelList.ChannelList.channelList.map((v, k) => {
            arr.push(<Option key={v.channelName} value={v.channelName}>{v.channelName}</Option>);
        });
        return arr;
    }

    /*
    * 点击查询按钮，查询表格数据
    * */
    clickQuery() {
        this.getTableData();
    }

    /*
    * 处理分页事件，请求对应的表格数据
    * */
    handleTableChange(pagination) {
        var data = {
            appCode: this.props.channelList.Param.appCode,
            sortField: this.props.channelList.Param.sortField,
            sortOrder: this.props.channelList.Param.sortOrder,
            channelGroupId: this.props.channelList.Param.channelGroupId,
            channelCategory: this.props.channelList.Param.channelCategory,
            fatherFlag: this.props.channelList.Param.fatherFlag,
            channelName: this.props.channelList.Param.channelName,
            channelTypeId: this.props.channelList.Param.channelTypeId,
            isFree: this.props.channelList.Param.isFree,
            offset: pagination.current,
            limit: pagination.pageSize
        }
        this.props.setPagination(data);
    }

    /*
    * 处理编辑列
    * */
    dealColumns() {
        var columns = this.props.channelList.TableColumns.tableColumns;
        var index = columns.length - 1;
        columns[index].render = function (text) {
            return (<IndexLink to={"/manager/channelList/edit/" + text.id}>编辑</IndexLink>);
        };
        return columns;
    }

    render() {
        let columns = this.dealColumns();
        return (
            <Layout style={{marginLeft: 180, position: "relative", marginTop: 60, overflow: "hidden"}}>
                {/*筛选区域开始*/}
                <Content className="channel_filter">
                    <Form layout="inline">
                        {/*操作系统开始*/}
                        <FormItem label="操作系统">
                            <Select
                                placeholder="操作系统选择"
                                dropdownMatchSelectWidth={true}
                                value={this.props.channelList.Param.appCode}
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
                                value={this.props.channelList.Param.channelCategory}
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
                                value={this.props.channelList.Param.channelTypeId}
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
                                value={this.props.channelList.Param.channelGroupId}
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
                                value={this.props.channelList.Param.channelName}
                                filterOption={false}
                                onChange={this.searchChannel.bind(this)}
                            >
                                {this.renderChannelList()}
                            </Select>
                        </FormItem>
                        {/*渠道名称结束*/}
                        {/*查询开始*/}
                        <FormItem label="">
                            <Button type="primary" onClick={this.clickQuery.bind(this)}>查询</Button>
                        </FormItem>
                        {/*查询结束*/}
                    </Form>
                </Content>
                {/*表格开始 */}
                <Content className="channel_table">
                    <div style={{width: "100%", marginBottom:"20px"}} className="clearfix">
                        <Button type="primary" style={{}}>
                            <IndexLink to={"/manager/channelList/create"} activeClassName="active">新建</IndexLink>
                        </Button>
                    </div>
                    <Table
                        loading={this.props.channelList.Loading.loading}
                        locale={{"emptyText": "暂无数据"}}
                        columns={columns}
                        dataSource={this.props.channelList.Result.tableList}
                        pagination={this.props.channelList.Pagination}
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
        channelList: state.channelList
    }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
    //全量
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
