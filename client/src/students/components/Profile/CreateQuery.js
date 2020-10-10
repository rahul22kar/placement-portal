import React, {Component} from 'react';
import {Form, Button, Input} from 'antd';

class CreateQuery extends Component {

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
                <Form.Item label={"Subject"}>
                    {getFieldDecorator('subject', {
                        rules: [{required: true, message: 'Subject field is required'}],
                    })(<Input placeholder="Enter subject of your query"/>)}
                </Form.Item>
                <Form.Item label={"Query"}>
                    {getFieldDecorator('query', {
                        rules: [{required: true, message: 'Query field is required'}],
                    })(<Input.TextArea rows={4} placeholder="Enter your query"/>)}
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

const CreateQueryForm = Form.create({name: 'create_query'})(CreateQuery);

export default CreateQueryForm;