import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {IndexLink} from 'react-router';
import {Layout, DatePicker, Form, Button, Select, Table, Divider, Upload} from 'antd';
import NProgress from 'nprogress';

import * as actionCreators from '../../actions/modelManager/modelManager';
import {
    getDownloadName,
    downloadExcle,
    dealDownloadTitle,
    dealDownloadData,
    dealDownloadColumns
} from '../../common/channelManagerUtil';
import * as downloadFile from '../../common/downloadFile';

const {Content} = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class ModelManager extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        NProgress.start();

        this.getFirmList();
        this.getBrandList();
        this.getTableData();
    }

    componentDidMount() {
        NProgress.done();
    }

    componentWillUpdate(nextProps) {
        if (nextProps.modelManager.Result.downloadDataList != this.props.modelManager.Result.downloadDataList) {
            // let downloadData = downloadFile.formatData(this.props.modelManager.Result.downloadDataList);
            // downloadFile.toXlsx(downloadData, this.fileName, "sheet1");
            //下载实现（channelManagerUtil）
            let downloadTitles = dealDownloadTitle(this.props.modelManager.TableColumns.tableColumns);
            let helperColumns = dealDownloadColumns(this.props.modelManager.TableColumns.tableColumns);
            let downloadDatas = dealDownloadData(nextProps.modelManager.Result.downloadDataList, helperColumns);
            downloadExcle(downloadDatas, downloadTitles, this.fileName);
        }
    }

    getFirmList() {
        this.props.getFirmList({
            firm: ''
        });
    }

    getBrandList() {
        this.props.getBrandList({
            firm: ''
        });
    }

    renderFirmList() {
        var arr = [];
        this.props.modelManager.Result.firmList.map((v, k) => {
            arr.push(<Option key={v.id} value={v.firm.toString()}>{v.firm}</Option>);
        });
        return arr;
    }

    renderBrandList() {
        var arr = [];
        this.props.modelManager.Result.brandList.map((v, k) => {
            arr.push(<Option key={v.id} value={v.brand.toString()}>{v.brand}</Option>);
        });
        return arr;
    }

    changeOs(curAppCode) {
        let statusData = {
            appCode: curAppCode,
            deviceModel: '',
            firm: '',
            brand: ''
        };
        this.props.changeOs(statusData);
    }

    changeModel(curDeviceModel) {
        this.props.changeModel({
            deviceModel: curDeviceModel
        });
    }

    changeFirm(curFirm) {
        let statusData = {
            appCode: this.props.modelManager.Param.appCode,
            deviceModel: this.props.modelManager.Param.deviceModel,
            firm: curFirm,
            brand: ''
        };
        this.props.changeFirm(statusData);
    }

    changeBrand(curBrand) {
        let statusData = {
            appCode: this.props.modelManager.Param.appCode,
            deviceModel: this.props.modelManager.Param.deviceModel,
            firm: this.props.modelManager.Param.firm,
            brand: curBrand
        };
        this.props.changeBrand(statusData);
    }

    getTableData() {
        let postData = {
            appCode: this.props.modelManager.Param.appCode,
            deviceModel: this.props.modelManager.Param.deviceModel,
            firm: this.props.modelManager.Param.firm,
            brand: this.props.modelManager.Param.brand,
            offset: this.props.modelManager.Result.offset,
            limit: this.props.modelManager.Result.limit
        };
        this.props.getTableData(postData);
    }

    clickQuery() {
        this.getTableData();
    }

    handleTableChange(pagination) {
        let postData = {
            appCode: this.props.modelManager.Param.appCode,
            deviceModel: this.props.modelManager.Param.deviceModel,
            firm: this.props.modelManager.Param.firm,
            brand: this.props.modelManager.Param.brand,
            offset: pagination.current,
            limit: pagination.pageSize
        };
        this.props.getTableData(postData);
    }

    initEditForm(text) {
        this.props.setUpdateParam({
            editId: text.id,
            editBrand: text.brand,
            editFirm: text.firm
        });
        localStorage.setItem('editId', text.id);
        localStorage.setItem('editBrand', text.brand);
        localStorage.setItem('editFirm', text.firm);
    }

    dealColumns() {
        let columns = this.props.modelManager.TableColumns.tableColumns;
        let that = this;
        columns.map(function (item) {
            if (item.dataIndex == '') {
                item.render = function (text) {
                    return (<IndexLink to={'/sys/modal/edit/' + text.firm + '/' + text.brand}
                                       onClick={that.initEditForm.bind(that, text)}>编辑</IndexLink>);
                };
            }
        });
        return columns;
    }

    downloadExcle() {
        let fileNameParam = {
            appCode: this.props.modelManager.Param.appCode,
            deviceModel: this.props.modelManager.Param.deviceModel,
            firm: this.props.modelManager.Param.firm,
            brand: this.props.modelManager.Param.brand,
        };
        this.fileName = getDownloadName(fileNameParam);
        let postData = {
            appCode: this.props.modelManager.Param.appCode,
            deviceModel: this.props.modelManager.Param.deviceModel,
            firm: this.props.modelManager.Param.firm,
            brand: this.props.modelManager.Param.brand,
            offset: 1,
            limit: -1
        };
        this.props.getDownLoadData(postData);

    }

    render() {
        let pagination = {
            current: this.props.modelManager.Result.offset,
            pageSize: this.props.modelManager.Result.limit,
            total: this.props.modelManager.Result.total,
            defaultPageSize: this.props.modelManager.Result.limit,
            showSizeChanger: true
        };
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
                                value={this.props.modelManager.Param.appCode}
                                style={{width: '70px'}}
                                className="online"
                                onChange={this.changeOs.bind(this)}
                            >
                                <Option value="">全部</Option>
                                <Option value="24">Android</Option>
                                <Option value="27">iOS</Option>
                            </Select>
                        </FormItem>
                        {/*机型搜索*/}
                        <FormItem label="">
                            <Select
                                mode="combobox"
                                placeholder="机型搜索"
                                notFoundContent="暂无相关数据"
                                className="searchChannel"
                                defaultActiveFirstOption={false}
                                style={{width: '60px'}}
                                showArrow={false}
                                value={this.props.modelManager.Param.deviceModel}
                                filterOption={false}
                                onChange={this.changeModel.bind(this)}
                            >
                            </Select>
                        </FormItem>
                        {/*厂商开始*/}
                        <FormItem label="厂商">
                            <Select
                                placeholder="厂商选择"
                                dropdownMatchSelectWidth={true}
                                value={this.props.modelManager.Param.firm}
                                style={{width: '70px'}}
                                className="online"
                                onChange={this.changeFirm.bind(this)}
                            >
                                <Option value="">全部</Option>
                                {this.renderFirmList()}
                            </Select>
                        </FormItem>
                        {/*品牌开始*/}
                        <FormItem label="品牌">
                            <Select
                                placeholder="品牌选择"
                                dropdownMatchSelectWidth={true}
                                value={this.props.modelManager.Param.brand}
                                style={{width: '70px'}}
                                className="online"
                                onChange={this.changeBrand.bind(this)}
                            >
                                <Option value="">全部</Option>
                                {this.renderBrandList()}
                            </Select>
                        </FormItem>
                        {/*查询开始*/}
                        <FormItem>
                            <Button type="primary" onClick={this.clickQuery.bind(this)}>查询</Button>
                        </FormItem>
                    </Form>
                </Content>
                {/*表格区域开始*/}
                <Content className="channel_table">
                    <div style={{width: "100%", marginBottom: "20px"}} className="channelCostButtonArea">
                        <Button type="primary">
                            <IndexLink to='/sys/modal/create'>添加品牌</IndexLink>
                        </Button>
                        <Button type="primary" icon="download" onClick={this.downloadExcle.bind(this)}>
                            下载报表
                        </Button>
                    </div>
                    <Table
                        loading={this.props.modelManager.Result.tableLoading}
                        locale={{"emptyText": "暂无数据"}}
                        columns={columns}
                        dataSource={this.props.modelManager.Result.tableList}
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
        modelManager: state.Reducer.modelManager
    }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
    //全量
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelManager);