import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/channelGroup/channelGroup';
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

		//获取渠道类型列表
		this.props.getChannelTypeList({
			appCode :this.props.channelGroup.CreateParam.appCode
		});
	}

	componentDidMount() {
		NProgress.done();
	}

	/*
	* 渲染渠道类型
	* */
    renderChannelType() {
        var arr = [];
        this.props.channelGroup.ChannelTypeList.channelTypeList.map((v, k) => {
            arr.push(<Option key={v.id} value={v.id.toString()}>{v.name}</Option>);
        });
        return arr;
	}

	/*
	* 生成随机密码
	* 设置登录密码为该值
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
	* 设置渠道名称
	* */
    changeChannelGroup(e) {
        this.props.setCreateParam({
            channelName: e.target.value
        });
	}

	/*
	* 设置登录密码
	* */
    changePassword(e) {
        this.props.setCreateParam({
            password: e.target.value
        });
	}

	/*设置操作系统*/
    changeOs(id) {
        this.props.setCreateParam({
            appCode: id
        });
        this.props.getChannelTypeList({
			appCode: id
		});
	}

	/*
	* 设置线上线下
	* */
    changeChannelCategory(id) {
        this.props.setCreateParam({
            channelCategory: id
        });
	}

	/*
	* 设置渠道类型
	* */
    changeChannelType(id) {
        this.props.setCreateParam({
            channelTypeId: id
        });
	}

	/*
	* 设置是否付费
	* */
    changeIsFree(id){
        this.props.setCreateParam({
            isFree: id
        });
	}

    /*
    * 设置描述信息
    * */
    changeDescription(e) {
        this.props.setCreateParam({
            description: e.target.value
        });
    }

	/*
	* 处理表单提交
	* 验证通过则提交数据
	* */
    handleSubmit(e) {
        e.preventDefault();
        let data = {
            password: this.props.channelGroup.CreateParam.password,
            channelName: this.props.channelGroup.CreateParam.channelName,
            appCode: this.props.channelGroup.CreateParam.appCode,
            channelCategory: this.props.channelGroup.CreateParam.channelCategory,
            channelTypeId: this.props.channelGroup.CreateParam.channelTypeId,
            isFree: this.props.channelGroup.CreateParam.isFree,
            description: this.props.channelGroup.CreateParam.description
		};
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.create(data);
            }
        });
	}

	/*
	* 取消表单提交
	* */
    cancelForm() {
        this.props.router.push('/manager/channelGroup');
    }

	render() {
        const { getFieldDecorator } = this.props.form;
		return (
			<Layout style={{marginLeft: 180, position: "relative", marginTop: 60, overflow: "hidden"}}>
				{ /*创建区域开始*/ }
  				<Content className="channel_filter">
					<Card title="新建渠道" bordered={false} style={{width: "100%"}} noHovering={true}>
						<Form layout={"horizontal"} onSubmit={this.handleSubmit.bind(this)} style={{maxWidth: "600px"}}>
                            {/*渠道组名称*/}
							<FormItem label="渠道组名称" {...formItemLayout}>
                                {getFieldDecorator('channelGroup', {
                                    rules: [{required: true, message: '1-32个字符，支持字母、数字和下划线'},
                                        {pattern: /\w{1,32}$/, message: "1-32个字符，支持字母、数字和下划线!"}]
                                })(
									<Input placeholder="请输入渠道组名称" onChange={this.changeChannelGroup.bind(this)}/>
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
                            {/*操作系统*/}
							<FormItem label="操作系统" {...formItemLayout}>
                                {getFieldDecorator('appCode', {
                                    rules: [{required: true,message: '请选择操作系统'}],
                                    // initialValue: this.props.channelList.CreateParam.appCode
                                })(
									<Select
										placeholder="操作系统选择"
										dropdownMatchSelectWidth={true}
										className="online"
									    onChange={this.changeOs.bind(this)}>
										<Option value="">请选择</Option>
										<Option value="24">Android</Option>
										<Option value="27">iOS</Option>
									</Select>
                                )}
							</FormItem>
                            {/*线上、线下*/}
							<FormItem label="线上\线下" {...formItemLayout}>
                                {getFieldDecorator('channelCategory', {
                                    rules: [{required: true,message: '请选择线上、线下'}],
                                    // initialValue: this.props.channelList.CreateParam.channelCategory
                                })(
									<Select
										placeholder="线上线下选择"
										dropdownMatchSelectWidth={true}
										className="online"
										onChange={this.changeChannelCategory.bind(this)}>
										<Option value="">请选择</Option>
										<Option value="1">线上</Option>
										<Option value="2">线下</Option>
									</Select>
                                )}
							</FormItem>
                            {/*渠道类型*/}
							<FormItem label="渠道类型" {...formItemLayout}>
                                {getFieldDecorator('channelTypeId', {
                                    rules: [{required: true,message: '请选择渠道类型'}],
                                    // initialValue: this.props.channelList.CreateParam.channelTypeId
                                })(
									<Select
										placeholder="渠道类型选择"
										dropdownMatchSelectWidth={true}
										className="online"
										onChange={this.changeChannelType.bind(this)}>
										<Option value="">请选择</Option>
                                        {this.renderChannelType()}
									</Select>
                                )}
							</FormItem>
                            {/*是否付费*/}
							<FormItem label="是否付费" {...formItemLayout}>
                                {getFieldDecorator('isFree', {
                                    rules: [{required: true,message: '请选择是否付费'}],
                                    // initialValue: this.props.channelList.CreateParam.isFree
                                })(
									<Select
										placeholder="是否付费选择"
										dropdownMatchSelectWidth={true}
										className="online"
										onChange={this.changeIsFree.bind(this)}>
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
        channelGroup: state.Reducer.channelGroup
    }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
    //全量
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
