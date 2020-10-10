import React, {Component} from 'react';
import {Form, Icon, Input, Modal} from "antd";

class ResendEmailForm extends Component {
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err){
                this.props.handleOk(values)
            }
        })
    };

    render() {

        const {getFieldDecorator} = this.props.form;
        const {
            resendEmailVisible,
            handleCancel
        } = this.props;

        return (
            <Modal
                visible={resendEmailVisible}
                onOk={this.handleSubmit}
                onCancel={handleCancel}
                cancelText={'Close'}
                okText={'Submit'}
                title={'Resend Conformation Email'}
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
                                placeholder='Enter email to resend email'
                            />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const ResendEmailModal = Form.create({name: 'resend_email'})(ResendEmailForm);

export default ResendEmailModal;