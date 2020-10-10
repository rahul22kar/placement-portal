import React , {Component} from 'react';
import {Modal, Input, Form, Icon} from 'antd';
import {withRouter} from "react-router-dom";

class ForgotPasswordForm extends Component {

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err){
                this.props.handleOk(values);
            }
        })
    };

    render() {

        const {getFieldDecorator} = this.props.form;
        const {
            forgotPasswordVisible,
            handleCancel
        } = this.props;

        return (
            <Modal
            visible={forgotPasswordVisible}
            onOk={this.handleSubmit}
            onCancel={handleCancel}
            cancelText={'Close'}
            okText={'Submit'}
            title={'Forgot Password'}
            >
                <Form>
                    <Form.Item>
                        {getFieldDecorator("email", {
                            validateTrigger: "onSubmit",
                            rules: [
                                {
                                    pattern: /@iitgoa.ac.in/,
                                    message: "Enter a valid IIT Goa Email ID!"
                                },
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
                                placeholder='Enter email to reset password'
                            />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}


const ForgotPasswordModal = Form.create({name: 'forgot_password'})(ForgotPasswordForm);

export default withRouter(ForgotPasswordModal);
