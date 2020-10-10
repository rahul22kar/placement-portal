import React, {Component} from 'react';
import {Button, Form, Input} from "antd";
import {withRouter} from 'react-router-dom';

class ResetPassword extends Component {

    state = {
        confirmDirty: false
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue("password")) {
            callback("Two passwords that you enter is inconsistent!");
        } else {
            callback();
        }
    };
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(["confirm_password"], {force: true});
        }
        callback();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSubmit(values);
            }
        })
    };

    render() {
        const formItemLayout = {
            labelCol: {
                xs: {span: 16},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 16},
                sm: {span: 16}
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 18,
                    offset: 8,
                }

            },
        };

        const {getFieldDecorator} = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit} {...formItemLayout}>
                <Form.Item label={"New Password"}>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'This field is required'},{validator: this.validateToNextPassword}],
                    })(<Input.Password type='password' placeholder="Enter New Password"/>)}
                </Form.Item>
                <Form.Item label={"Confirm Password"}>
                    {getFieldDecorator('confirm_password', {
                        validateTrigger: "onSubmit",
                        rules: [{required: true, message: 'This field is required'},{validator: this.compareToFirstPassword}],
                    })(<Input.Password type='password' placeholder="Enter Confirm Password"/>)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type='primary' htmlType='submit'>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const ResetPasswordForm = Form.create({name: 'reset_password'})(ResetPassword);

export default withRouter(ResetPasswordForm);