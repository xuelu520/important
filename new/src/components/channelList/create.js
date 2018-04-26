import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/channelList/channelList';
import {Layout, Card, Form, Select, Input, Button, Checkbox} from 'antd';
import NProgress from 'nprogress';

import { getRandomPassword } from '../../common/channelManagerUtil';
import {formItemLayout} from "../../common/formLayoutConfig";

import {IndexLink} from 'react-router';

const {Content} = Layout;
const {TextArea} = Input;
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const Option = Select.Option;


class Create extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        NProgress.start();

        //请求渠道组数据
        this.getGroupList();
        //请求渠道类型数据
        this.getChannelType();
    }

    componentDidMount() {
        NProgress.done();
        console.log('pass',this.props.channelList.CreateParam);
    }

    /*
    * 渠道组改变，更新appCode,channelCategory，channelTypeId，isFree的值
    * */
    componentWillUpdate(nextProps) {
        if(this.props.channelList.CreateParam.channelGroupId != nextProps.channelList.CreateParam.channelGroupId){
            this.props.form.setFieldsValue({
                appCode: nextProps.channelList.CreateParam.appCode,
                channelCategory: nextProps.channelList.CreateParam.channelCategory,
                channelType: nextProps.channelList.CreateParam.channelType,
                channelTypeId: nextProps.channelList.CreateParam.channelTypeId,
                isFree: nextProps.channelList.CreateParam.isFree
            });
        }
    }

    /*
    * 提交表单
    * 提交前看是否通过验证，通过则提交数据
    * */
    handleSubmit(e) {
        e.preventDefault();
        let checkData = {
            appCode:this.props.channelList.CreateParam.appCode,
            channelName:this.props.channelList.CreateParam.channelName
        };
        let createData = {
            channelName: this.props.channelList.CreateParam.channelName,
            password: this.props.channelList.CreateParam.password,
            appCode: this.props.channelList.CreateParam.appCode,
            channelCategory: this.props.channelList.CreateParam.channelCategory,
            channelTypeId: this.props.channelList.CreateParam.channelTypeId,
            isFree: this.props.channelList.CreateParam.isFree,
            description: this.props.channelList.CreateParam.description,
            channelGroup: this.props.channelList.CreateParam.channelGroup,
            channelGroupId: this.props.channelList.CreateParam.channelGroupId,
            showCol: this.props.channelList.CreateParam.showCol
        };
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.nameCheck(checkData,createData);
            }
        });

    }

    /*
    * 请求渠道组数据
    * */
    getGroupList() {
        this.props.getGroupList();
    }

    /*
    * 请求渠道类型数据
    * */
    getChannelType() {
        var data = {
            appCode: this.props.channelList.CreateParam.appCode
        };
        this.props.getChannelTypeList(data);
    }

    /*
    * 输入渠道名称
    * */
    changeChannelName(e) {
        this.props.setCreateParam({
            channelName: e.currentTarget.value
        });
    }

    /*
    * 输入登录密码
    * */
    changePassword(e) {
        this.props.setCreateParam({
            password: e.currentTarget.value
        });
    }

    /*
    * 输入描述信息
    * */
    changeDescription(e) {
        this.props.setCreateParam({
            description: e.currentTarget.value
        });
    }

    /*
    * 生成随机密码
    * 设置登录密码为生成的字符串
    * */
    createPassword(minLength,maxLength) {
        let pw = getRandomPassword(minLength,maxLength);
        this.props.setCreateParam({
            password: pw
        });
        this.props.form.setFieldsValue({
            password: pw
        });
    }

    /*
    * 切换渠道组
    * 设置渠道组及渠道组id的值
    * 根据当前选中的渠道组获取对应的appCode，channelCategory，channelTypeId，isFree等信息，设置表单的值为该信息
    * */
    changeChannelGroupId(mid) {
        var _this = this;
        this.props.getCurGroupOfForm({id: mid}, () => {
	        let obj = _this.props.channelList.GroupList.groupList.filter(function(item){
	            return item.id == mid;
	        });
	        _this.props.setCreateParam({
	            channelGroup: obj[0].channelName,
	            channelGroupId: mid
	        });
        });
    }

    /*
    * 渲染渠道组
    * */
    renderGroupName() {
        var arr = [];
        this.props.channelList.GroupList.groupList.map((v, k) => {
            arr.push(<Option key={v.id} value={v.id.toString()}>{v.channelName}</Option>);
        });
        return arr;
    }

    /*
    * 渲染渠道列表
    * */
    renderChannelType() {
        var arr = [];
        this.props.channelList.ChannelTypeList.channelTypeList.map((v, k) => {
            arr.push(<Option key={v.id} value={v.id}>{v.name}</Option>);
        });
        return arr;
    }

    /*
    * 处理复选框的选中事件
    * 设置showCol的值
    * */
    handleCheckShowCol(e) {
        this.props.setCreateParam({
            showCol: e.target.checked == true ? '1' : ''
        });
    }

    /*
    * 取消表单
    * */
    cancelForm() {
        this.props.router.push('/manager/channelList');
    }

    render() {
    	// TODO getFieldDecorator form 是否可以不用?
        const { getFieldDecorator } = this.props.form;

        return (
            <Layout style={{marginLeft: 180, position: "relative", marginTop: 60, overflow: "hidden"}}>
                {/*表单区域开始*/}
                <Content style={{background: '#fff', padding: "24px", margin: 24, marginTop: "24px", minHeight: 280}}>
                    <Card title="新建渠道" bordered={false} style={{width: "100%"}} noHovering={true}>
                        <Form layout={"horizontal"} onSubmit={this.handleSubmit.bind(this)} style={{maxWidth: "600px"}}>
                            {/*渠道名称*/}
                            <FormItem label="渠道名称" {...formItemLayout}>
                                {getFieldDecorator('channelName', {
                                    rules: [{required: true, message: '1-32个字符，支持字母、数字和下划线'},
                                        {pattern: /\w{1,32}$/, message: "1-32个字符，支持字母、数字和下划线!"}],
                                })(
                                    <Input placeholder="请输入渠道名称" onChange={this.changeChannelName.bind(this)}/>
                                )}
                            </FormItem>
                            {/*登录密码*/}
                            <div className="loginPasswordRow">
                                <FormItem label="登录密码" {...formItemLayout}>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: '6-12个字符，支持字母、数字和特殊字符'},
                                            {pattern: /\S{6,12}$/, message: "6-12个字符，支持字母、数字和特殊字符"}]
                                    })(
                                        <Input placeholder="请输入登录密码" onChange={this.changePassword.bind(this)}/>
                                    )}
                                </FormItem>
                                <Button type="primary" onClick={this.createPassword.bind(this,6,12)}>随机生成</Button>
                            </div>
                            {/*渠道组名称*/}
                            <FormItem label="渠道组名称" {...formItemLayout}>
                                {getFieldDecorator('channelGroupId', {
                                    rules: [{required: true,message: '请选择渠道组名称'}],
                                })(
                                    <Select
                                        showSearch
                                        placeholder="渠道组名称选择"
                                        dropdownMatchSelectWidth={true}
                                        className="online"
                                        style={{}}
                                        onChange={this.changeChannelGroupId.bind(this)}>
                                        {this.renderGroupName()}
                                    </Select>
                                )}
                            </FormItem>
                            {/*操作系统*/}
                            <FormItem label="操作系统" {...formItemLayout}>
                                {getFieldDecorator('appCode', {
                                    rules: [{required: true,message: '请选择操作系统'}]
                                })(
                                    <Select
                                        disabled
                                        placeholder="操作系统选择"
                                        dropdownMatchSelectWidth={true}
                                        className="online">
                                        <Option value={24}>Android</Option>
                                        <Option value={27}>iOS</Option>
                                    </Select>
                                )}
                            </FormItem>
                            {/*线上、线下*/}
                            <FormItem label="线上\线下" {...formItemLayout}>
                                {getFieldDecorator('channelCategory', {
                                    rules: [{required: true,message: '请选择线上、线下'}]
                                })(
                                    <Select
                                        disabled
                                        placeholder="线上线下选择"
                                        dropdownMatchSelectWidth={true}
                                        className="online">
                                        <Option value={1}>线上</Option>
                                        <Option value={2}>线下</Option>
                                    </Select>
                                )}
                            </FormItem>
                            {/*渠道类型*/}
                            <FormItem label="渠道类型" {...formItemLayout}>
                                {getFieldDecorator('channelType', {
                                    rules: [{required: true,message: '请选择渠道类型'}]
                                })(
                                    <Select
                                        disabled
                                        placeholder="渠道类型选择"
                                        dropdownMatchSelectWidth={true}
                                        className="online">
                                    </Select>
                                )}
                            </FormItem>
                            {/*是否付费*/}
                            <FormItem label="是否付费" {...formItemLayout}>
                                {getFieldDecorator('isFree', {
                                    rules: [{required: true,message: '请选择是否付费'}]
                                })(
                                    <Select
                                        disabled
                                        placeholder="是否付费选择"
                                        dropdownMatchSelectWidth={true}
                                        className="online">
                                        <Option value={0}>是</Option>
                                        <Option value={1}>否</Option>
                                    </Select>
                                )}
                            </FormItem>
                            {/*对外指标*/}
                            <FormItem label="对外指标" {...formItemLayout}>
                                <Checkbox onChange={this.handleCheckShowCol.bind(this)}>健康度</Checkbox>
                            </FormItem>
                            {/*描述*/}
                            <FormItem label="描述" {...formItemLayout}>
                                <TextArea onChange={this.changeDescription.bind(this)}/>
                            </FormItem>
                            {/*提交区域*/}
                            <FormItem style={{textAlign: "center"}}>
                                <ButtonGroup>
                                    <Button type="primary" htmlType="submit"
                                            style={{textAlign: 'right', padding: "0px 24px"}}>新建</Button>
                                    <Button type="default" onClick={this.cancelForm.bind(this)}>取消</Button>
                                </ButtonGroup>
                            </FormItem>
                        </Form>
                    </Card>
                </Content>
            </Layout>
        );
    }
}

Create = Form.create()(Create);
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

export default connect(mapStateToProps, mapDispatchToProps)(Create);
