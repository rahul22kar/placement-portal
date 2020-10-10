import React, {Component} from 'react'
import {Form, Input, Button, Icon} from 'antd';

class CreateLogin extends Component {

    state = {
        confirmDirty: false
    };

    validateInput = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values);
            }
        })
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
            form.validateFields(["confirm"], {force: true});
        }
        callback();
    };

    render() {
        const formItemLayout = {
            labelCol: {
                xs: {span: 16},
                sm: {span: 8},
                md: {span: 8},
                lg: {span: 8},
                xl: {span: 8}
            },
            wrapperCol: {
                xs: {span: 16},
                sm: {span: 16},
                md: {span: 8},
                lg: {span: 8},
                xl: {span: 8}
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
                md: {
                    span: 16,
                    offset: 8
                }
            },
        };

        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.validateInput} {...formItemLayout}>
                <Form.Item label="Email">
                    {getFieldDecorator("email", {
                        validateTrigger: "onSubmit",
                        rules: [
                            {
                                required: true,
                                message: "This field cannot be empty!"
                            }
                        ]
                    })(
                        <Input
                            size='large'
                            prefix={
                                <Icon
                                    type='user'
                                    style={{color: "rgba(0,0,0,.25)"}}
                                />
                            }
                            placeholder='Email'
                        />
                    )}
                </Form.Item>
                <Form.Item label="Password">
                    {getFieldDecorator("password", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your password!"
                            },
                            {
                                validator: this.validateToNextPassword
                            }
                        ]
                    })(
                        <Input.Password
                            size='large'
                            prefix={
                                <Icon
                                    type='lock'
                                    style={{color: "rgba(0,0,0,.25)"}}
                                />
                            }
                            type='password'
                            placeholder='Password'
                        />
                    )}
                </Form.Item>
                <Form.Item label="Confirm Password">
                    {getFieldDecorator("confirm_password", {
                        validateTrigger: "onSubmit",
                        rules: [
                            {
                                required: true,
                                message: "This field cannot be empty!"
                            },
                            {
                                validator: this.compareToFirstPassword
                            }
                        ]
                    })(
                        <Input.Password
                            size='large'
                            prefix={
                                <Icon
                                    type='lock'
                                    style={{color: "rgba(0,0,0,.25)"}}
                                />
                            }
                            type='password'
                            placeholder='Confirm Password'
                        />
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

const CreateLoginForm = Form.create({name: 'company_login'})(CreateLogin);

export default CreateLoginForm;
