import React, {Component} from 'react';
import {Button, Form, Input, Select} from "antd";
import * as commonConstants from '../../../utils/Constants'

const {Option} = Select

class CreateAnnouncements extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(((errors, values) => {
            if(!errors){
                this.props.onSubmit(values)
            }
        }))
    };

    render() {

        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 16},
                sm: {span: 8},
                md: {span: 8},
                lg: {span: 8},
                xl: {span: 8},
            },
            wrapperCol: {
                xs: {span: 16},
                sm: {span: 16},
                md: {span: 8},
                lg: {span: 8},
                xl: {span: 8},
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
                },
                lg: {
                    span: 16,
                    offset: 8
                },
                xl: {
                    span: 16,
                    offset: 8
                }

            },
        };

        return (
            <Form onSubmit={this.handleSubmit} {...formItemLayout}>
                <Form.Item label={"Subject"}>
                    {getFieldDecorator('subject', {
                        rules: [{required: true, message: 'Subject field is required'}],
                    })(<Input placeholder="Enter subject of your query"/>)}
                </Form.Item>
                <Form.Item label={"Description"}>
                    {getFieldDecorator('description', {
                        rules: [{required: true, message: 'Description field is required'}],
                    })(<Input.TextArea rows={4} placeholder="Enter your query"/>)}
                </Form.Item>
                <Form.Item label={"Select Branch"}>
                    {getFieldDecorator('branch', {
                        rules: [{required: true, message: 'Branch field is required'}],
                    })( <Select
                            mode="multiple"
                            placeholder="Select branches"
                            optionLabelProp="label"
                        >
                        <Option value={commonConstants.BRANCH_CONSTANTS.COMPUTERS} label={"CSE"}>Computer Science And Engineering</Option>
                        <Option value={commonConstants.BRANCH_CONSTANTS.ELECTRICAL} label={"EE"}>Electrical Engineering</Option>
                        <Option value={commonConstants.BRANCH_CONSTANTS.MECHANICAL} label={"ME"}>Mechanical Engineering</Option>
                        <Option value={commonConstants.BRANCH_CONSTANTS.MATHEMATICS} label={"MNC"}>Mathematics And Computing</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label={"Select Year"}>
                    {getFieldDecorator('year_of_study', {
                        rules: [{required: true, message: 'Year field is required'}],
                    })( <Select
                            mode="multiple"
                            placeholder="Select year"
                            optionLabelProp="label"
                        >
                        <Option value={commonConstants.YEAR_CONSTANTS.FIRST} label={"First"}>First</Option>
                        <Option value={commonConstants.YEAR_CONSTANTS.SECOND} label={"Second"}>Second</Option>
                        <Option value={commonConstants.YEAR_CONSTANTS.THIRD} label={"Third"}>Third</Option>
                        <Option value={commonConstants.YEAR_CONSTANTS.FOURTH} label={"Fourth"}>Fourth</Option>
                        <Option value={commonConstants.YEAR_CONSTANTS.FIFTH} label={"Fifth"}>Fifth</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label={"Select Course"}>
                    {getFieldDecorator('course_type', {
                        rules: [{required: true, message: 'Course field is required'}],
                    })( <Select
                            mode="multiple"
                            placeholder="Select courses"
                            optionLabelProp="label"
                        >
                        <Option value={commonConstants.COURSE_TYPE_CONSTANTS.BTECH} label={"BTech"}>BTech</Option>
                        <Option value={commonConstants.COURSE_TYPE_CONSTANTS.MTECH} label={"MTech"}>MTech</Option>
                        <Option value={commonConstants.COURSE_TYPE_CONSTANTS.PHD} label={"PhD"}>PhD</Option>
                        </Select>
                    )}
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

const CreateAnnouncementsForm = Form.create({name: 'create_announcements'})(CreateAnnouncements);

export default CreateAnnouncementsForm;