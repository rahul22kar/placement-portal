import React, {Component} from 'react';
import {Form, Input, Button, DatePicker, Checkbox} from 'antd';

class AddExperience extends Component {

    state = {
        active: false,
        startValue: null,
        endValue: null
    };

    validateInput = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values);
            }
        });
    };

    handleActiveStatus = (e) => {
        this.setState({
            active: e.target.checked
        });
    };

    disabledStartDate = startValue => {
        const { endValue } = this.state;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = endValue => {
        const { startValue } = this.state;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };

    onDateChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    onStartChange = value => {
        this.onDateChange('startValue', value);
    };

    onEndChange = value => {
        this.onDateChange('endValue', value);
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 16},
                sm: {span: 6},
                md: {span: 8}
            },
            wrapperCol: {
                xs: {span: 16},
                sm: {span: 18},
                md: {span: 16}
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
            },
        };

        return (
            <Form {...formItemLayout} onSubmit={this.validateInput} style={{margin: 12}}>
                <Form.Item label="Company Name">
                    {getFieldDecorator('company_name', {
                        rules: [{required: true, message: 'Company Name field is required'}]
                    })(<Input placeholder="Enter the name of company"/>)}
                </Form.Item>
                <Form.Item label="Location">
                    {getFieldDecorator('experience_location', {
                        rules: [{required: true, message: 'Location field is required'}]
                    })(<Input placeholder="Enter the location here"/>)}
                </Form.Item>
                <Form.Item label="Title">
                    {getFieldDecorator('experience_type', {
                        rules: [{required: true, message: 'Experience title field is required'}]
                    })(<Input placeholder="Enter your experience title here"/>)}
                </Form.Item>
                <Form.Item label="Description">
                    {getFieldDecorator('description', {
                        rules: [{required: true, message: 'Experience description field is required'}]
                    })(<Input.TextArea rows={5} placeholder="Enter your experience description here"/>)}
                </Form.Item>
                <Form.Item label="Start Date">
                    {getFieldDecorator('start_date', {
                        rules: [{required: true, message: 'Start date is required'}],
                        initialValue: this.state.startValue
                    })(<DatePicker
                        disabledDate={this.disabledStartDate}
                        format="YYYY-MM-DD"
                        placeholder="Start Date"
                        onChange={this.onStartChange}
                    />)}
                </Form.Item>
                <Form.Item label="End Date">
                    {getFieldDecorator('end_date', {
                        rules: [{required: !this.state.active, message: 'End date is required'}],
                        initialValue: this.state.endValue
                    })(<DatePicker
                        disabledDate={this.disabledEndDate}
                        format="YYYY-MM-DD"
                        placeholder="End Date"
                        onChange={this.onEndChange}
                        disabled={this.state.active}
                    />)}
                </Form.Item>
                <Form.Item label="Currently Working">
                    {getFieldDecorator('active', {
                        initialValue: this.state.active
                    })(<Checkbox checked={this.state.active} onChange={this.handleActiveStatus} />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout} >
                    <Button type="primary" htmlType="submit">
                        Add Experience
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const AddExperienceForm = Form.create({name: 'add_experience'})(AddExperience);

export default AddExperienceForm;
