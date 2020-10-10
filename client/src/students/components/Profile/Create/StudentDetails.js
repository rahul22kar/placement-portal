import React, {Component} from 'react';
import {Form, Input, Button, Select, Upload, Icon, DatePicker, Tooltip, Checkbox} from 'antd';
import moment from 'moment';
import * as commonConstants from '../../../../utils/Constants'

const {Option} = Select;
const {MonthPicker} = DatePicker;

class AcademicDetails extends Component {

    state = {
        check1: false,
        check2: false,
        interested_eligible: false
    };

    componentDidMount() {
        this.setState({
            check1: this.props.check1,
            check2: this.props.check2
        })
    }

    validateInput = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleConfirmButton(values);
            }
        });
    };

    fileSelect = (e) => {
        return e.fileList.slice(-3);
    };

    persistFormState = () => {
        const values = this.props.form.getFieldsValue();
        this.props.submittedValues(values);
        this.props.handleBackButton();
    };

    handleCheck1 = (e) => {
        this.setState({
            check1: e.target.checked
        })
    };

    handleCheck2 = (e) => {
        this.setState({
            check2: e.target.checked
        })
    };

    handleInterestedCheck = (e) => {
        this.setState({
            interested_eligible: e.target.checked
        })
    };

    render() {

        const {getFieldDecorator} = this.props.form;

        const uploadProps = {
            beforeUpload: file => {
                return false;
            },
            multiple: true,
            accept: 'application/pdf'
        };

        return (
            <div style={{textAlign: 'center'}}>
                <Form onSubmit={this.validateInput} colon={false}>
                    <Form.Item label="Course">
                        {getFieldDecorator('course_type', {
                            rules: [{required: true, message: 'This field is required'}],
                            initialValue: this.props.course_type
                        })(<Select placeholder="Select your course">
                            <Option value={commonConstants.COURSE_TYPE_CONSTANTS.BTECH}>B.Tech</Option>
                            <Option value={commonConstants.COURSE_TYPE_CONSTANTS.MTECH}>M.Tech</Option>
                        </Select>)}
                    </Form.Item>
                    <Form.Item label="Department of Study">
                        {getFieldDecorator('branch', {
                            rules: [{required: true, message: 'This field is required'}],
                            initialValue: this.props.branch
                        })(<Select placeholder="Select your department of study">
                            <Option value={commonConstants.BRANCH_CONSTANTS.COMPUTERS}>Computer Science and
                                Engineering</Option>
                            <Option value={commonConstants.BRANCH_CONSTANTS.ELECTRICAL}>Electrical Engineering</Option>
                            <Option value={commonConstants.BRANCH_CONSTANTS.MECHANICAL}>Mechanical Engineering</Option>
                            <Option value={commonConstants.BRANCH_CONSTANTS.MATHEMATICS}>Mathematics and
                                Computing</Option>
                        </Select>)}
                    </Form.Item>
                    <Form.Item label="Year of Study">
                        {getFieldDecorator('year_of_study', {
                            rules: [{required: true, message: 'This field is required'}],
                            initialValue: this.props.year_of_study
                        })(<Select placeholder="Select your year of study">
                            <Option value={commonConstants.YEAR_CONSTANTS.FIRST}>First</Option>
                            <Option value={commonConstants.YEAR_CONSTANTS.SECOND}>Second</Option>
                            <Option value={commonConstants.YEAR_CONSTANTS.THIRD}>Third</Option>
                            <Option value={commonConstants.YEAR_CONSTANTS.FOURTH}>Fourth</Option>
                        </Select>)}
                    </Form.Item>
                    <Form.Item label="Year of Join">
                        {getFieldDecorator('year_of_join', {
                            rules: [{type: 'object', required: true, message: 'Please select year of join'}],
                            initialValue: moment(this.props.year_of_join, 'YYYY-MM')
                        })(<MonthPicker format={'YYYY-MM'}/>)}
                    </Form.Item>
                    <Form.Item label="Roll Number">
                        {getFieldDecorator('roll_number', {
                            rules: [{required: true, message: 'Please enter your roll number'}],
                            initialValue: this.props.roll_number
                        })(<Input placeholder="Enter your roll number"/>)}
                    </Form.Item>
                    <Form.Item label="CPI">
                        {getFieldDecorator('cpi', {
                            rules: [{required: true, message: 'Please enter your CPI'}, { pattern: /^\d{1,6}(\.\d{1,2})?$/, message: 'Please input only decimal with 2 digits of precision'}],
                            initialValue: this.props.cpi
                        })(<Input placeholder="Enter your cumulative grade point"/>)}
                    </Form.Item>
                    <Form.Item label="CV">
                        {getFieldDecorator('cv', {
                            rules: [{required: true, message: 'Please attach your CV'}],
                            valuePropName: 'fileList',
                            getValueFromEvent: this.fileSelect
                        })(
                            <Upload {...uploadProps}>
                                <Button>
                                    <Icon type="upload"/> Select File
                                </Button>
                            </Upload>
                        )}
                    </Form.Item>
                    <Form.Item
                        label={<span>Interests&nbsp; <Tooltip title="Use , to separate tags"><Icon
                            type="question-circle-o"/></Tooltip></span>}
                    >
                        {getFieldDecorator('interests', {
                            rules: [{type: 'array', required: true, message: 'Fill this field'}],
                            initialValue: Array.isArray(this.props.interests) ? this.props.interests : ['Web Development', 'Machine Learning', 'Data Science']
                        })(<Select mode="tags" tokenSeparators={[',']}/>)}
                    </Form.Item>
                    <Form.Item
                        label={<span>Skills&nbsp; <Tooltip title="Use , to separate tags"><Icon
                            type="question-circle-o"/></Tooltip></span>}
                    >
                        {getFieldDecorator('skills', {
                            rules: [{type: 'array', required: true, message: 'Fill this field'}],
                            initialValue: Array.isArray(this.props.skills) ? this.props.skills : ['NodeJS', 'Python', 'C++']
                        })(<Select mode="tags" tokenSeparators={[',']}/>)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('check1', {
                            initialValue: this.state.check1
                        })(<Checkbox checked={this.state.check1} onChange={this.handleCheck1}>I agree to share my
                            personal data with the placement cell</Checkbox>)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('check2', {
                            initialValue: this.state.check2
                        })(<Checkbox checked={this.state.check2} onChange={this.handleCheck2}>
                            I have read the <a href='https://www.iitgoa.ac.in/placement/files/Student_Policies_IIT_Goa.pdf' target={'_blank'}>Placements
                            Policies</a>
                        </Checkbox>)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('interested_eligible', {
                            initialValue: this.state.interested_eligible
                        })(<Checkbox checked={this.state.interested_eligible} onChange={this.handleInterestedCheck}>
                            <i>I am interested/eligible to sit for placements.</i>
                        </Checkbox>)}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit"
                                disabled={this.props.loading || !this.state.check1 || !this.state.check2}
                                style={{margin: 10}}>
                            Submit
                        </Button>
                        <Button type="default" onClick={this.persistFormState} disabled={this.props.loading}
                                style={{margin: 10}}>
                            Previous
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const AcademicDetailsForm = Form.create({name: 'student_details'})(AcademicDetails);

export default AcademicDetailsForm;
