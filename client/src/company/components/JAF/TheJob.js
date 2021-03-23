import React, {Component} from 'react'
import {Form, DatePicker, InputNumber, Input, Button, Popconfirm} from 'antd'
import moment from 'moment'

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

class TheJob extends Component{

    handleBack = () => {
        const values = this.props.form.getFieldsValue();
        this.props.submitValues(values);
        this.props.handleBack()
    };

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
                    <Form.Item label="Designation">
                        {getFieldDecorator("job_designation", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input the Job Designation"
                                }
                            ],
                            initialValue: this.props.job_designation
                        })(
                            <Input.TextArea
                                rows={4}
                                placeholder="The Job Designation"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Job Description">
                        {getFieldDecorator("job_description", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input the Job Description"
                                }
                            ],
                            initialValue: this.props.job_description
                        })(
                            <Input.TextArea
                                rows={10}
                                placeholder="The Job Description"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Expected Number of Hires">
                        {getFieldDecorator("expected_number_of_hires", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input the Number of Hires"
                                }
                            ],
                            initialValue: this.props.expected_number_of_hires
                        })(
                            <InputNumber
                                min={1}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Service Contract/Bond (If any)">
                        {getFieldDecorator("bond", {
                            initialValue: this.props.bond
                        })(
                            <Input
                                placeholder="Specify if there is any Service Contract or Bond"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Tentative Location">
                        {getFieldDecorator("job_location", {
                             rules: [
                                {
                                    required: true,
                                    message: "Please specify the Job Location"
                                }
                            ],
                            initialValue: this.props.job_location
                        })(
                            <Input
                                placeholder="Specify the working location for this Job"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Tentative Joining Date">
                        {getFieldDecorator("joining_date", {
                            initialValue: checkDate(this.props.joining_date)
                        })(
                            <DatePicker
                                disabledDate={disabledDate}
                                defaultPickerValue={moment(
                                    new Date(),
                                    "DD-MM-YYYY"
                                ).add("1", "month")}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Number of Working Weekdays">
                        {getFieldDecorator("working_weekdays", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input the Number of Working weekdays"
                                }
                            ],
                            initialValue: this.props.working_weekdays
                        })(
                            <InputNumber
                                min={1}
                                max={7}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Any Other Information">
                        {getFieldDecorator("job_other_info", {
                            initialValue: this.props.job_other_info
                        })(
                            <Input.TextArea
                                rows={4}
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.handleBack} style={{margin: 5}}>
                            Back
                        </Button>
                        <Button type='primary' htmlType='submit' style={{margin: 5}}>
                        Next
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const TheJobForm = Form.create({name: "thejob"})(TheJob);

export default TheJobForm
