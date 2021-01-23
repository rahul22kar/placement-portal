import React, {Component} from 'react'
import {Form, InputNumber, Input, Icon, Button, Upload, Typography} from 'antd'

const uploadProps = {
    beforeUpload: file => {
        return false;
    },
    accept: 'application/pdf'
};


const fileSelect = (e) => {
    return e.fileList.slice(-1);
};

class SalaryDetails extends Component{

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
                   
                        <Typography.Paragraph style={{textAlign: "left"}}>
                            Please Note: <br/> 1. Performance based bonus should not be declared as part of Gross/CTC but to be indicated in Bonus/Perks/Incentive section. <br/> 2. Any amount to be disbursed later than the end of first 12 months should not be a part of Gross/CTC. <br/> 3. Joining Bonus/Signing Bonus to be indicated in Bonus/Perks/Incentive section.<br/> 4. Statutory Annual Payouts (e.g., Medical, LTC etc.) not to be a part of Gross.
                        </Typography.Paragraph>
                   
                    <Form.Item label="Cost To Company">
                        {getFieldDecorator("ctc", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input the CTC"
                                }
                            ],
                            initialValue: this.props.ctc
                        })(
                            <InputNumber
                                min={100000}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Gross salary (Before tax, after deductions)">
                        {getFieldDecorator("gross_salary", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input the Gross Salary"
                                }
                            ],
                            initialValue: this.props.ctc
                        })(
                            <InputNumber
                                min={100000}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Bonus (Perks/Incentives)">
                        {getFieldDecorator("bonus_perks", {
                            initialValue: this.props.bonus_perks
                        })(
                            <Input.TextArea
                                rows={4}
                                placeholder="Specify Bonus/perks (if any)"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Other Variable Pay">
                        {getFieldDecorator("variable_pay", {
                            initialValue: this.props.variable_pay
                        })(
                            <Input.TextArea
                                rows={4}
                                placeholder="Specify Other Variable Pay (if any)"
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

const SalaryDetailsForm = Form.create({name: "salarydetails"})(SalaryDetails);

export default SalaryDetailsForm
