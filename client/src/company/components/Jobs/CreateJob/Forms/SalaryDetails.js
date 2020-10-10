import React, {Component} from 'react'
import {Form, InputNumber, Input, Icon, Button, Upload} from 'antd'

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
                    <Form.Item label="Base Salary">
                        {getFieldDecorator("base_salary", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input the base salary"
                                }
                            ],
                            initialValue: this.props.base_salary
                        })(
                            <InputNumber
                                step={1000}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Bonus/perks">
                        {getFieldDecorator("bonus_perks", {
                            initialValue: this.props.bonus_perks
                        })(
                            <Input
                                placeholder="Specify Bonus/perks (if any)"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Other pay">
                        {getFieldDecorator("other_pay", {
                            initialValue: this.props.other_pay
                        })(
                            <Input
                                placeholder="Other Pay"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="CTC effective">
                        {getFieldDecorator("ctc_effective", {
                            initialValue: this.props.ctc_effective
                        })(
                            <Input
                                placeholder="CTC effective (if any)"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Service Contract">
                        {getFieldDecorator("contract_data",{
                            valuePropName: 'fileList',
                            getValueFromEvent: fileSelect,
                            initialValue: this.props.contract_data
                        })(
                            <Upload {...uploadProps}>
                                <Button>
                                    <Icon type="upload"/> Select File
                                </Button>
                            </Upload>
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
