import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/modelManager/modelManager';
import {Layout, Card, Form, Select, Input, Button, Checkbox} from 'antd';
import NProgress from 'nprogress';

import {getRandomPassword} from '../../common/channelManagerUtil';
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
    }

    componentDidMount() {
        NProgress.done();

        this.getFirmList();
    }

    getFirmList() {
        this.props.getFirmList({
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

    changeFirm(curFirm) {
        this.props.setUpdateParam({
            createFirm: curFirm
        });
    }

    changeBrand(e) {
        this.props.setUpdateParam({
            createBrand: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let checkData = {
            firm: this.props.modelManager.UpdateParam.createFirm
        };
        let createData = {
            firm: this.props.modelManager.UpdateParam.createFirm,
            brand: this.props.modelManager.UpdateParam.createBrand
        };
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.check(checkData,createData);
            }
        });
    }

    cancelForm() {
        this.props.router.push('/sys/modal');
    }


    render() {

        const {getFieldDecorator} = this.props.form;

        return (
            <Layout style={{marginLeft: 180, position: "relative", marginTop: 60, overflow: "hidden"}}>
                {/*创建区域开始*/}
                <Content className="channel_filter">
                    <Card title="添加品牌" bordered={false} style={{width: "100%"}} noHovering={true}>
                        <Form layout={"horizontal"} onSubmit={this.handleSubmit.bind(this)} style={{maxWidth: "600px"}}>
                            {/*渠道组名称*/}
                            <FormItem label="厂商" {...formItemLayout}>
                                {getFieldDecorator('firm', {
                                    rules: [{required: true, message: '请选择厂商'}]
                                })(
                                    <Select
                                        placeholder="厂商选择"
                                        dropdownMatchSelectWidth={true}
                                        className="online"
                                        onChange={this.changeFirm.bind(this)}>
                                        <Option value="">请选择</Option>
                                        {this.renderFirmList()}
                                    </Select>
                                )}
                            </FormItem>
                            {/*品牌*/}
                            <FormItem label="品牌" {...formItemLayout}>
                                {getFieldDecorator('brand', {
                                    rules: [{required: true, message: '1-32个字符'},
                                        {pattern: /\S{1,32}$/, message: "1-32个字符，支持字母、数字和特殊字符"}]
                                })(
                                    <Input placeholder="请输入品牌" onChange={this.changeBrand.bind(this)}/>
                                )}
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
        modelManager: state.Reducer.modelManager
    }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
    //全量
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);