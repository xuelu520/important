import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/modelManager/modelManager';
import {Layout, Card, Form, Select, Input, Button, Checkbox} from 'antd';
import NProgress from 'nprogress';

import {formItemLayout} from "../../common/formLayoutConfig";


const {Content} = Layout;
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const Option = Select.Option;

class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.props.setUpdateParam({
            editFirm: localStorage.getItem('editFirm'),
            editBrand: localStorage.getItem('editBrand')
        });
    }

    componentWillMount() {
        NProgress.start();
    }

    componentDidMount() {
        NProgress.done();

        this.getFirmList();
        this.getBrandList();
    }

    getFirmList() {
        this.props.getFirmList({
            firm: ''
        });
    }

    getBrandList() {
        this.props.getBrandList({
            firm: this.props.modelManager.UpdateParam.editFirm
        });
    }

    renderFirmList() {
        var arr = [];
        this.props.modelManager.Result.firmList.map((v, k) => {
            arr.push(<Option key={v.id} value={v.firm}>{v.firm}</Option>);
        });
        return arr;
    }

    renderBrandList() {
        var arr = [];
        this.props.modelManager.Result.brandList.map((v, k) => {
            arr.push(<Option key={v.id} value={v.brand}>{v.brand}</Option>);
        });
        return arr;
    }

    changeFirm(curFirm) {
        this.props.setUpdateParam({
            editFirm: curFirm
        });
        this.props.changeEditFirm({
            editFirm: curFirm
        });
    }

    changeBrand(curBrand) {
        this.props.setUpdateParam({
            editBrand: curBrand
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let postData = {
            firm: this.props.modelManager.UpdateParam.editFirm,
            brand: this.props.modelManager.UpdateParam.editBrand,
            id: this.props.modelManager.UpdateParam.editId
        };
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.edit(postData);
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
                    <Card title="编辑品牌" bordered={false} style={{width: "100%"}} noHovering={true}>
                        <Form layout={"horizontal"} onSubmit={this.handleSubmit.bind(this)} style={{maxWidth: "600px"}}>
                            {/*渠道组名称*/}
                            <FormItem label="厂商" {...formItemLayout}>
                                {getFieldDecorator('firm', {
                                    rules: [{required: true, message: '请选择厂商'}],
                                    initialValue: this.props.modelManager.UpdateParam.editFirm
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
                                    rules: [{required: true, message: '请选择品牌'}],
                                    initialValue: this.props.modelManager.UpdateParam.editBrand
                                })(
                                    <Select
                                        placeholder="品牌选择"
                                        dropdownMatchSelectWidth={true}
                                        className="online"
                                        onChange={this.changeBrand.bind(this)}>
                                        {this.renderBrandList()}
                                    </Select>
                                )}
                            </FormItem>
                            {/*提交区域*/}
                            <FormItem style={{textAlign: "center"}}>
                                <ButtonGroup>
                                    <Button type="primary" htmlType="submit"
                                            style={{textAlign: 'right', padding: "0px 24px"}}>修改</Button>
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

Edit = Form.create()(Edit);

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

export default connect(mapStateToProps, mapDispatchToProps)(Edit);