import React from 'react';
import {Form, Button, Select, Upload, Icon, Tooltip} from 'antd';

const ProfessionalDetailsForm = Form.create({
    name: 'professional_details_edit'
})(props => {
    const {getFieldDecorator, validateFields} = props.form;
    const formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 6},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 18},
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
                offset: 6,
            },
        },
    };

    const fileSelect = (e) => {
        return e.fileList.slice(-1);
    };

    const uploadProps = {
        beforeUpload: file => {
            return false;
        },
        accept: 'application/pdf'
    };

    const handleFormSubmission = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                props.onSubmit(values);
            }
        });
    };

    return (
        <Form {...formItemLayout} onSubmit={handleFormSubmission}>
            <Form.Item label="First CV">
                {getFieldDecorator('cv1', {
                    valuePropName: 'fileList',
                    getValueFromEvent: fileSelect
                })(
                    <Upload {...uploadProps}>
                        <Button>
                            <Icon type="upload"/> Select File
                        </Button>
                    </Upload>
                )}
            </Form.Item>
            <Form.Item label="Second CV">
                {getFieldDecorator('cv2', {
                    valuePropName: 'fileList',
                    getValueFromEvent: fileSelect
                })(
                    <Upload {...uploadProps}>
                        <Button>
                            <Icon type="upload"/> Select File
                        </Button>
                    </Upload>
                )}
            </Form.Item>
            <Form.Item label="Third CV">
                {getFieldDecorator('cv3', {
                    valuePropName: 'fileList',
                    getValueFromEvent: fileSelect
                })(
                    <Upload {...uploadProps}>
                        <Button>
                            <Icon type="upload"/> Select File
                        </Button>
                    </Upload>
                )}
            </Form.Item>
            <Form.Item
                label={<span>Interests&nbsp; <Tooltip title="Use , to separate tags"><Icon type="question-circle-o"/></Tooltip></span>}
            >
                {getFieldDecorator('interests', {
                    rules: [{type: 'array', required: true, message: 'Fill this field'}],
                    initialValue: Array.isArray(props.interests) ? props.interests : ['Web Development', 'Machine Learning', 'Data Science']
                })(<Select mode="tags" tokenSeparators={[',']}/>)}
            </Form.Item>
            <Form.Item
                label={<span>Skills&nbsp; <Tooltip title="Use , to separate tags"><Icon type="question-circle-o"/></Tooltip></span>}
            >
                {getFieldDecorator('skills', {
                    rules: [{type: 'array', required: true, message: 'Fill this field'}],
                    initialValue: Array.isArray(props.skills) ? props.skills : ['NodeJS', 'Python', 'C++']
                })(<Select mode="tags" tokenSeparators={[',']}/>)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" disabled={props.loading}>
                    Update
                </Button>
            </Form.Item>
        </Form>
    );
});

export default ProfessionalDetailsForm;