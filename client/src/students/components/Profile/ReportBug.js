import React, {Component} from 'react';
import {Form, Button, Input} from 'antd';

class ReportBug extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(((errors, values) => {
            if(!errors){
                this.props.onSubmit(values)
            }
        }))
    };

    render() {

        const formItemLayout = {
            labelCol: {
                xs: {span: 16},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 16},
                sm: {span: 18}
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
                    offset: 6,
                },
                md: {
                    span: 18,
                    offset: 6
                },
                lg: {
                    span: 18,
                    offset: 6
                },
                xl: {
                    span: 18,
                    offset: 6
                }

            },
        };

        const {getFieldDecorator} = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit} {...formItemLayout}>
                <Form.Item label={"Component"}>
                    {getFieldDecorator('feature', {
                        rules: [{required: true, message: 'Please Specify this field'}],
                    })(<Input placeholder="Page/feature where bug was discovered"/>)}
                </Form.Item>
                <Form.Item label={"Bug"}>
                    {getFieldDecorator('bug_description', {
                        rules: [{required: true, message: 'This field is required'}],
                    })(<Input.TextArea rows={4} placeholder="Please Describe the bug"/>)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const ReportBugForm = Form.create({name: 'report_bug'})(ReportBug);

export default ReportBugForm;