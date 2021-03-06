import React from 'react';
import {Form, Input, Button, DatePicker, Select} from 'antd';
import moment from "moment";

const {Option} = Select;

const GeneralDetailsForm = Form.create({
    name: 'general_details'
})(props => {
    const {getFieldDecorator, validateFields} = props.form;

    const validateInput = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                props.submittedValues(values);
                props.handleNextButton();
            }
        });
    };
    const disabledDate = startValue => {
        return moment(new Date(startValue), "YYYY-MM-DD").isAfter(
            moment(new Date(), "YYYY-MM-DD").subtract("16", "years")
        );
    };
    const dobConfig = {
        rules: [
            {type: "object", required: true, message: "Please select your date of birth!"}
        ],
        initialValue: moment(props.dob, 'YYYY-MM-DD')
    };
    return (
        <div style={{textAlign: 'center'}}>
            <Form onSubmit={validateInput}>
                <Form.Item label="First Name">
                    {getFieldDecorator('first_name', {
                        rules: [{required: true, message: 'First name field is required'}],
                        initialValue: props.first_name
                    })(<Input placeholder="Enter your first name here"/>)}
                </Form.Item>
                <Form.Item label="Middle Name">
                    {getFieldDecorator('middle_name', {
                        initialValue: props.middle_name
                    })(<Input placeholder="Enter your middle name here"/>)}
                </Form.Item>
                <Form.Item label="Last Name">
                    {getFieldDecorator('last_name', {
                        rules: [{required: true, message: 'Last name field is required'}],
                        initialValue: props.last_name
                    })(<Input placeholder="Enter your last name here"/>)}
                </Form.Item>
                <Form.Item label="Date of Birth">
                    {getFieldDecorator("dob", dobConfig)(
                        <DatePicker
                            disabledDate={disabledDate}
                            defaultPickerValue={moment(
                                new Date(),
                                "YYYY-MM-DD"
                            ).subtract("16", "years")}
                            />
                    )}
                </Form.Item>
                <Form.Item label="Gender">
                    {getFieldDecorator("gender", {
                        rules: [
                            {required: true, message: "Please select your gender!"}
                        ],
                        initialValue: props.gender
                    })(
                        <Select placeholder="Select your gender">
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="Home Address">
                    {getFieldDecorator("address_line_a", {
                        rules: [
                            {required: true, message: "Please enter your home address"},
                            {max: 200, message: 'Characters limit reached. Shorten your address'}
                        ],
                        initialValue: props.address_line_a
                    })(<Input placeholder="Enter your home address"/>)}
                </Form.Item>
                <Form.Item label="Hostel Address">
                    {getFieldDecorator("address_line_b", {
                        rules: [
                            {required: true, message: "Please enter your hostel address"},
                            {max: 200, message: 'Characters limit reached. Shorten your address'}
                        ],
                        initialValue: props.address_line_b
                    })(<Input placeholder="Enter your hostel address"/>)}
                </Form.Item>
                <Form.Item label="Personal Contact">
                    {getFieldDecorator("phone_a", {
                        rules: [
                            {required: true, message: "Please enter your phone number"}
                        ],
                        initialValue: props.phone_a
                    })(<Input placeholder="Enter your personal phone number"/>)}
                </Form.Item>
                <Form.Item label="Alternate Contact">
                    {getFieldDecorator("phone_b", {
                        initialValue: props.phone_b
                    })(<Input placeholder="Enter your alternate contact number"/>)}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Next
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
});

export default GeneralDetailsForm;
