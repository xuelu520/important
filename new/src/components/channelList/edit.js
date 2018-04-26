import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Layout,Card,Form,Select,Input,Button,Checkbox} from 'antd';
import NProgress from 'nprogress';
import * as actionCreators from '../../actions/channelList/channelList';

import { getRandomPassword } from '../../common/channelManagerUtil';
import {formItemLayout} from "../../common/formLayoutConfig";


const {Content} = Layout;
const { TextArea } = Input;
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const Option = Select.Option;


class Edit extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        NProgress.start();

        //当前渠道id
        let curId = this.props.routeParams.id;

        //根据当前渠道id获取渠道详情
        this.props.getCurChannelDetail({id : curId});

        //获取渠道组列表
        this.props.getGroupList();

        //获取渠道类型列表
        this.props.getChannelTypeList({appCode : this.props.channelList.EditParam.appCode});
    }

    componentDidMount() {
        NProgress.done();
    }

    /*
    * 处理表单提交
    * 验证通过则提交数据
    * */
    handleSubmit(e) {
        e.preventDefault();
        let that = this;
        let curGroupObj = this.props.channelList.GroupList.groupList.filter(function (item) {
            return item.channelName == that.props.channelList.EditParam.channelGroup;
        });
        let data ={
            id:this.props.channelList.EditParam.id,
            channelName:this.props.channelList.EditParam.channelName,
            channelGroupId: curGroupObj.id,
            channelGroup:this.props.channelList.EditParam.channelGroup,
            appCode:this.props.channelList.EditParam.appCode,
            channelCategory:this.props.channelList.EditParam.channelCategory,
            channelTypeId:this.props.channelList.EditParam.channelTypeId,
            isFree:this.props.channelList.EditParam.isFree,
            description:this.props.channelList.EditParam.description,
            showCol:this.props.channelList.EditParam.showCol,
            reduce:this.props.channelList.EditParam.reduce,
            password:this.props.channelList.EditParam.password
        };
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.edit(data);
            }
        });
    }

    /*
    * 设置登录密码
    * */
    changePassword(e) {
        this.props.setEditParam({
            password:e.target.value
        });
    }

    /*
    * 设置描述信息
    * */
    changeDescription(e) {
        this.props.setEditParam({
            description:e.target.value
        });
    }

    /*
    * 设置扣量系数
    * */
    changeReduce(e) {
        this.props.setEditParam({
            reduce:e.target.value
        });
    }

    /*
    * 生成随机密码
    * 设置登录密码为生成的字符串
    * */
    createPassword(minLength,maxLength) {
        var pw = getRandomPassword(minLength,maxLength);
        this.props.setEditParam({
            password:pw
        });
        this.props.form.setFieldsValue({
            password: pw
        });
    }

    /*
    * 渲染渠道组
    * */
    renderChannelGroup() {
        var arr = [];
        this.props.channelList.GroupList.groupList.map((v, k) => {
            arr.push(<Option key={v.id} value={v.id.toString()}>{v.channelName}</Option>);
        });
        return arr;
    }

    /*
    * 渲染渠道类型
    * */
    renderChannelType() {
        var arr = [];
        this.props.channelList.ChannelTypeList.channelTypeList.map((v, k) => {
            arr.push(<Option key={v.id} value={v.id.toString()}>{v.name}</Option>);
        });
        return arr;
    }

    /*
    * 处理复选框的选中事件，
    * 设置showCol的值
    * */
    handleCheckShowCol(e) {
        this.props.setEditParam({
            showCol:e.target.checked==true ? '1' : '0'
        });
    }

    /*
    * 取消提交表单
    * */
    cancelForm() {
        this.props.router.push('/manager/channelList');
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        
        console.log(this.props.channelList.EditParam.reduce)
        
        return (
			<Layout style={{marginLeft: 180, position: "relative", marginTop: 60, overflow: "hidden"}}>
                {/*表格区域开始*/}
				<Content style={{background: '#fff', padding: "24px", margin: 24, marginTop: "24px", minHeight: 280}}>
					<Card title="修改渠道" bordered={false} style={{width: "100%"}} noHovering={true}>
						<Form layout={"horizontal"} onSubmit={this.handleSubmit.bind(this)} style={{maxWidth: "600px"}}>
                            {/*渠道名称*/}
							<FormItem label="渠道名称" {...formItemLayout}>
                                {getFieldDecorator('channelName', {
                                    initialValue: this.props.channelList.EditParam.channelName,
                                    rules: [{required: true, message: '1-32个字符，支持字母、数字和下划线'},
                                        {pattern: /\w{1,32}$/, message: "1-32个字符，支持字母、数字和下划线!"}],
                                })(
									<Input placeholder="请输入渠道名称" disabled/>
                                )}
							</FormItem>
                            {/*登录密码*/}
							<div className="loginPasswordRow">
								<FormItem label="登录密码" {...formItemLayout}>
                                    {getFieldDecorator('password', {
                                        rules: [{pattern: /\S{6,12}$/, message: "6-12个字符，支持字母、数字和特殊字符"}],
                                    })(
										<Input placeholder="请输入登录密码" onChange={this.changePassword.bind(this)}/>
                                    )}
								</FormItem>
								<Button type="primary" onClick={this.createPassword.bind(this,6,12)}>随机生成</Button>
							</div>
                            {/*渠道组名称*/}
							<FormItem label="渠道组名称" {...formItemLayout}>
                                {getFieldDecorator('channelGroupId', {
                                    rules: [{required: true}],
                                    initialValue: this.props.channelList.EditParam.channelGroup,
                                })(
									<Select
										disabled
										placeholder="渠道组名称选择"
										dropdownMatchSelectWidth={true}
										className="online"
										style={{}}>
                                        {this.renderChannelGroup()}
									</Select>
                                )}
							</FormItem>
                            {/*操作系统*/}
							<FormItem label="操作系统" {...formItemLayout}>
                                {getFieldDecorator('appCode', {
                                    rules: [{required: true}],
                                    initialValue: this.props.channelList.EditParam.appCode,
                                })(
									<Select
										disabled
										placeholder="操作系统选择"
										dropdownMatchSelectWidth={true}
										className="online">
										<Option value="">全部</Option>
										<Option value={24}>Android</Option>
										<Option value={27}>iOS</Option>
									</Select>
                                )}
							</FormItem>
                            {/*线上、线下*/}
							<FormItem label="线上\线下" {...formItemLayout}>
                                {getFieldDecorator('channelCategory', {
                                    rules: [{required: true}],
                                    initialValue: this.props.channelList.EditParam.channelCategory
                                })(
									<Select
										disabled
										placeholder="线上线下选择"
										dropdownMatchSelectWidth={true}
										className="online">
										<Option value="">全部</Option>
										<Option value={1}>线上</Option>
										<Option value={2}>线下</Option>
									</Select>
                                )}
							</FormItem>
                            {/*渠道类型*/}
							<FormItem label="渠道类型" {...formItemLayout}>
                                {getFieldDecorator('channelType', {
                                    rules: [{required: true}],
                                    initialValue: this.props.channelList.EditParam.channelType
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
                                    rules: [{required: true}],
                                    initialValue: this.props.channelList.EditParam.isFree,
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
                            {/*扣量系数*/}
							<FormItem label="扣量系数" {...formItemLayout}>
                                {getFieldDecorator('reduce', {
                                    rules: [{pattern: /[0-100]$/, message: "只能0到100之间的整数"}],
                                    initialValue: this.props.channelList.EditParam.reduce
                                })(
									<Input addonAfter="%" onChange={this.changeReduce.bind(this)}/>
                                )}
							</FormItem>
                            {/*对外指标*/}
							<FormItem label="对外指标" {...formItemLayout}>
								<Checkbox onChange={this.handleCheckShowCol.bind(this)}
                                          checked={this.props.channelList.EditParam.showCol == '1' ? true : false}>
                                    健康度
                                </Checkbox>
							</FormItem>
                            {/*描述*/}
							<FormItem label="描述" {...formItemLayout}>
								<TextArea value={this.props.channelList.EditParam.channelDescribe} onChange={this.changeDescription.bind(this)}/>
							</FormItem>
                            {/*提交区域*/}
							<FormItem style={{textAlign:"center"}}>
								<ButtonGroup>
									<Button type="primary" htmlType="submit" style={{ textAlign: 'right', padding: "0px 24px" }}>修改</Button>
									<Button type="default" onClick={this.cancelForm.bind(this)} >取消</Button>
								</ButtonGroup>
							</FormItem>
						</Form>
					</Card>
				</Content>
			</Layout>
        );
    }
}

Edit = Form.create()(Edit);
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

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
