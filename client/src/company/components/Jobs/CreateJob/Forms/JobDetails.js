import React, {Component} from 'react'
import {Form, DatePicker, Input, Select, Button} from 'antd'
import moment from 'moment'

const { Option } = Select;

const disabledDate = startValue => {
    return moment(new Date(startValue), "YYYY-MM-DD").isBefore(
        moment(new Date(), "YYYY-MM-DD")
    );
};

const checkDate = deadlineDate => {
    if(deadlineDate){
        return disabledDate(deadlineDate) ? null : moment(deadlineDate)
    }
};

class JobDetails extends Component{

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.submitValues(values);
                this.props.handleNext()
            }
        })
    };

    render(){
        const {getFieldDecorator} = this.props.form;
        return(
            <div style={{textAlign: 'center'}}>
                <Form onSubmit={this.handleSubmit} colon={false}>
                    <Form.Item label="Job Headline">
                        {getFieldDecorator("job_headline", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input Job Headline"
                                }
                            ],
                            initialValue: this.props.job_headline
                        })(
                            <Input
                                placeholder="Specify headline for your Job  "
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Select the type of job">
                        {getFieldDecorator("type_of_job", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please select type of job"
                                }
                            ],
                            initialValue: this.props.type_of_job
                        })(
                            <Select>
                                <Option value="internship">Internship</Option>
                                <Option value="full_time">Full Time</Option>
                                <Option value="short_term">Short Term Contract</Option>
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Description">
                        {getFieldDecorator("job_description", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input Job Description"
                                }
                            ],
                            initialValue: this.props.job_description
                        })(
                            <Input.TextArea
                                rows={4}
                                placeholder="Describe your job in detail"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Location">
                        {getFieldDecorator("job_location", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input Job Location"
                                }
                            ],
                            initialValue: this.props.job_location
                        })(
                            <Input
                                placeholder="Specify the working location for this Job"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Designations">
                        {getFieldDecorator("job_designation", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input Job Designation"
                                }
                            ],
                            initialValue: this.props.job_designation
                        })(
                            <Input
                                placeholder="Designation for the Job"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Number of Openings">
                        {getFieldDecorator("number_of_openings", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input Number of openings"
                                }
                            ],
                            initialValue: this.props.number_of_openings
                        })(
                            <Input
                                placeholder="Number of Openings"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Application Deadline">
                        {getFieldDecorator("application_deadline", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input Application Deadline"
                                }
                            ],
                            initialValue: checkDate(this.props.application_deadline)
                        })(
                            <DatePicker
                                disabledDate={disabledDate}
                                defaultPickerValue={moment(
                                    new Date(),
                                    "YYYY-MM-DD"
                                ).add("1", "month")}
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            Next
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const JobDetailsForm = Form.create({name: "jobdetails"})(JobDetails);

export default JobDetailsForm
