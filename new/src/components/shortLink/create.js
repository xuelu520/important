import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {IndexLink} from 'react-router';
import {Layout, Card, Form, Select, Input, Button, Checkbox} from 'antd';

import NProgress from 'nprogress';

import * as actionCreators from '../../actions/shortLink/shortLink';

import {getRandomPassword} from '../../common/channelManagerUtil';
import {formItemLayout} from "../../common/formLayoutConfig";

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

        this.getChannelTypeList();
        this.getGroupList();
    }

    componentDidMount() {
        NProgress.done();
    }

    componentWillUpdate(nextProps) {
        if(this.props.shortLink.CreateParam.channelGroupId != nextProps.shortLink.CreateParam.channelGroupId){
            this.props.form.setFieldsValue({
                appCode: nextProps.shortLink.CreateParam.appCode,
                channelCategory: nextProps.shortLink.CreateParam.channelCategory,
                channelTypeId: nextProps.shortLink.CreateParam.channelTypeId,
                isFree: nextProps.shortLink.CreateParam.isFree
            });
        }
    }

    getChannelTypeList() {
        this.props.getChannelTypeList({
            appCode: this.props.shortLink.CreateParam.appCode
        });
    }

    getGroupList() {
        this.props.getGroupList();
    }

    renderGroupName() {
        var arr = [];
        this.props.shortLink.Result.groupList.map((v, k) => {
            arr.push(<Option key={v.id} value={v.id.toString()}>{v.channelName}</Option>);
        });
        return arr;
    }

    renderChannelType() {
        var arr = [];
        this.props.shortLink.Result.channelTypeList.map((v, k) => {
            arr.push(<Option key={v.id} value={v.id.toString()}>{v.name}</Option>);
        });
        return arr;
    }

    createPassword(minLength, maxLength) {

        let pw = getRandomPassword(minLength, maxLength);
        this.props.setCreateParam({
            password: pw
        });
        this.props.form.setFieldsValue({
            password: pw
        });
    }

    changeChannelName(e) {
        this.props.setCreateParam({
            channelName: e.target.value
        });
    }

    changePassword(e) {
        this.props.setCreateParam({
            password: e.target.value
        });
    }

    changeChannelGroupId(mid) {
        this.props.getCurFormByGroupId({
            id: mid
        });
        let obj = this.props.shortLink.Result.groupList.filter(function (item) {
            return item.id == mid;
        });
        this.props.setCreateParam({
            channelGroupId: mid,
            channelGroup: obj[0].channelName
        });

    }

    changeDescription(e) {
        this.props.setCreateParam({
            description: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        var data = {
            channelName: this.props.shortLink.CreateParam.channelName,
            password: this.props.shortLink.CreateParam.password,
            appCode: this.props.shortLink.CreateParam.appCode,
            channelCategory: this.props.shortLink.CreateParam.channelCategory,
            channelTypeId: this.props.shortLink.CreateParam.channelTypeId,
            isFree: this.props.shortLink.CreateParam.isFree,
            description: this.props.shortLink.CreateParam.description,
            channelGroup: this.props.shortLink.CreateParam.channelGroup,
            channelGroupId: this.props.shortLink.CreateParam.channelGroupId,
        };
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.create(data);
            }
        });
    }

    cancelForm() {
        this.props.router.push('/manager/shortLink');
    }

    render() {

        const {getFieldDecorator} = this.props.form;

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
                                            {pattern: /\S{6,12}$/, message: "6-12个字符，支持字母、数字和特殊字符"}],
                                        // initialValue: this.props.channelList.CreateParam.password
                                    })(
                                        <Input placeholder="请输入登录密码" onChange={this.changePassword.bind(this)}/>
                                    )}
                                </FormItem>
                                <Button type="primary" onClick={this.createPassword.bind(this, 6, 12)}>随机生成</Button>
                            </div>
                            {/*渠道组名称*/}
                            <FormItem label="渠道组名称" {...formItemLayout}>
                                {getFieldDecorator('channelGroupId', {
                                    rules: [{required: true, message: '请选择渠道组名称'}],
                                })(
                                    <Select
                                        showSearch
                                        placeholder="渠道组名称选择"
                                        dropdownMatchSelectWidth={true}
                                        className="online"
                                        style={{width: 300}}
                                        onChange={this.changeChannelGroupId.bind(this)}>
                                        <Option value=''>请选择</Option>
                                        {this.renderGroupName()}
                                    </Select>
                                )}
                            </FormItem>
                            {/*操作系统*/}
                            <FormItem label="操作系统" {...formItemLayout}>
                                {getFieldDecorator('appCode', {
                                    rules: [{required: true, message: '请选择操作系统'}],
                                })(
                                    <Select
                                        disabled
                                        placeholder="操作系统选择"
                                        dropdownMatchSelectWidth={true}
                                        className="online">
                                        <Option value="">请选择</Option>
                                        <Option value="24">Android</Option>
                                        <Option value="27">iOS</Option>
                                    </Select>
                                )}
                            </FormItem>
                            {/*线上、线下*/}
                            <FormItem label="线上\线下" {...formItemLayout}>
                                {getFieldDecorator('channelCategory', {
                                    rules: [{required: true, message: '请选择线上、线下'}],
                                })(
                                    <Select
                                        disabled
                                        placeholder="线上线下选择"
                                        dropdownMatchSelectWidth={true}
                                        className="online">
                                        <Option value="">请选择</Option>
                                        <Option value="1">线上</Option>
                                        <Option value="2">线下</Option>
                                    </Select>
                                )}
                            </FormItem>
                            {/*渠道类型*/}
                            <FormItem label="渠道类型" {...formItemLayout}>
                                {getFieldDecorator('channelTypeId', {
                                    rules: [{required: true, message: '请选择渠道类型'}],
                                })(
                                    <Select
                                        disabled
                                        placeholder="渠道类型选择"
                                        dropdownMatchSelectWidth={true}
                                        className="online">
                                        <Option value="">请选择</Option>
                                        {this.renderChannelType()}
                                    </Select>
                                )}
                            </FormItem>
                            {/*是否付费*/}
                            <FormItem label="是否付费" {...formItemLayout}>
                                {getFieldDecorator('isFree', {
                                    rules: [{required: true, message: '请选择是否付费'}],
                                })(
                                    <Select
                                        disabled
                                        placeholder="是否付费选择"
                                        dropdownMatchSelectWidth={true}
                                        className="online">
                                        <Option value="">请选择</Option>
                                        <Option value="0">是</Option>
                                        <Option value="1">否</Option>
                                    </Select>
                                )}
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
        shortLink: state.Reducer.shortLink
    }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
    //全量
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);