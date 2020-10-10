import React from 'react';
import {Form, Input, Button, DatePicker, Select} from 'antd';
import moment from "moment";
import * as commonConstants from "../../../../utils/Constants";

const {Option} = Select;
const {MonthPicker} = DatePicker;

const AcademicDetailsForm = Form.create({
    name: 'academic_details_edit'
})(props => {
    const {getFieldDecorator, validateFields} = props.form;

    const formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 10},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 14},
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
                offset: 10,
            },
        },
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
            <Form.Item label="Course">
                {getFieldDecorator('course_type', {
                    rules: [{required: true, message: 'This field is required'}],
                    initialValue: props.course_type
                })(<Select placeholder="Select your course">
                    <Option value={commonConstants.COURSE_TYPE_CONSTANTS.BTECH}>B.Tech</Option>
                    <Option value={commonConstants.COURSE_TYPE_CONSTANTS.MTECH}>M.Tech</Option>
                    <Option value={commonConstants.COURSE_TYPE_CONSTANTS.PHD}>Ph.D</Option>
                </Select>)}
            </Form.Item>
            <Form.Item label="Department of Study">
                {getFieldDecorator('branch', {
                    rules: [{required: true, message: 'This field is required'}],
                    initialValue: props.branch
                })(<Select placeholder="Select your department of study">
                    <Option value={commonConstants.BRANCH_CONSTANTS.COMPUTERS}>Computer Science and Engineering</Option>
                    <Option value={commonConstants.BRANCH_CONSTANTS.ELECTRICAL}>Electrical Engineering</Option>
                    <Option value={commonConstants.BRANCH_CONSTANTS.MECHANICAL}>Mechanical Engineering</Option>
                    <Option value={commonConstants.BRANCH_CONSTANTS.MATHEMATICS}>Mathematics and Computing</Option>
                </Select>)}
            </Form.Item>
            <Form.Item label="Year of Study">
                {getFieldDecorator('year_of_study', {
                    rules: [{required: true, message: 'This field is required'}],
                    initialValue: props.year_of_study
                })(<Select placeholder="Select your year of study">
                    <Option value={commonConstants.YEAR_CONSTANTS.FIRST}>First</Option>
                    <Option value={commonConstants.YEAR_CONSTANTS.SECOND}>Second</Option>
                    <Option value={commonConstants.YEAR_CONSTANTS.THIRD}>Third</Option>
                    <Option value={commonConstants.YEAR_CONSTANTS.FOURTH}>Fourth</Option>
                    <Option value={commonConstants.YEAR_CONSTANTS.FIFTH}>Fifth</Option>
                </Select>)}
            </Form.Item>
            <Form.Item label="Year of Join">
                {getFieldDecorator('year_of_join', {
                    rules: [{type: 'object', required: true, message: 'Please select year of join'}],
                    initialValue: moment(props.year_of_join, 'YYYY-MM')
                })(<MonthPicker format={'YYYY-MM'}/>)}
            </Form.Item>
            <Form.Item label="Roll Number">
                {getFieldDecorator('roll_number', {
                    rules: [{required: true, message: 'Please enter your roll number'}],
                    initialValue: props.roll_number
                })(<Input placeholder="Enter your roll number"/>)}
            </Form.Item>
            <Form.Item label="CPI">
                {getFieldDecorator('cpi', {
                    rules: [{required: true, message: 'Please enter your CPI'}, { pattern: /^\d{1,6}(\.\d{1,2})?$/, message: 'Please input only decimal with 2 digits of precision'}],
                    initialValue: props.cpi
                })(<Input placeholder="Enter your cumulative grade point"/>)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" disabled={props.loading}>
                    Update
                </Button>
            </Form.Item>
        </Form>
    );
});

export default AcademicDetailsForm;
