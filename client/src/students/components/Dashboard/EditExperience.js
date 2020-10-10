import React, {Component} from 'react';
import {Form, Input, Button, DatePicker, Checkbox, Spin, Drawer, Typography, Row, Col} from 'antd';
import moment from 'moment';

class EditExperience extends Component {

    state = {
        active: this.props.active,
        startValue: null,
        endValue: null
    };

    validateInput = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleEditExperience(this.props.experience_id, values);
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
        const {isMobile, loading, editExperienceVisible, onEditExperienceClose} = this.props
        return (
            <Drawer
                width={isMobile ? '100vw' : '40vw'}
                placement="right"
                onClose={onEditExperienceClose}
                visible={editExperienceVisible}
            >
                <Spin spinning={loading} tip="Loading...">
                    <Row type= 'flex' justify='center' style={{margin: 12}}>
                        <Typography.Title>
                            Edit Experience
                        </Typography.Title>
                    </Row>
                    <Row type='flex' justify='center'>
                        <Col xxl={18} xl={22} lg={24} md={24} xs={24} sm={24}>
                            <Form onSubmit={this.validateInput} style={{margin: 12}}>
                                <Form.Item label="Company Name">
                                    {getFieldDecorator('company_name', {
                                        rules: [{required: true, message: 'Company Name field is required'}],
                                        initialValue: this.props.company_name
                                    })(<Input placeholder="Enter the name of company"/>)}
                                </Form.Item>
                                <Form.Item label="Location">
                                    {getFieldDecorator('experience_location', {
                                        rules: [{required: true, message: 'Company Name field is required'}],
                                        initialValue: this.props.experience_location
                                    })(<Input placeholder="Enter the location here"/>)}
                                </Form.Item>
                                <Form.Item label="Title">
                                    {getFieldDecorator('experience_type', {
                                        rules: [{required: true, message: 'Experience title field is required'}],
                                        initialValue: this.props.experience_type
                                    })(<Input placeholder="Enter your experience title here"/>)}
                                </Form.Item>
                                <Form.Item label="Description">
                                    {getFieldDecorator('description', {
                                        rules: [{required: true, message: 'Experience description field is required'}],
                                        initialValue: this.props.description
                                    })(<Input.TextArea rows={5} onPressEnter={this.addBreakOverTextArea} placeholder="Enter your experience description here"/>)}
                                </Form.Item>
                                <Form.Item label="Start Date">
                                    {getFieldDecorator('start_date', {
                                        rules: [{required: true, message: 'Start date is required'}],
                                        initialValue: this.props.start_date ? moment(this.props.start_date, "YYYY-MM-DD") : this.state.startValue
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
                                        initialValue: this.props.end_date ? moment(this.props.end_date, "YYYY-MM-DD") :this.state.endValue
                                    })(<DatePicker
                                        disabledDate={this.disabledEndDate}
                                        format="YYYY-MM-DD"
                                        placeholder="End Date"
                                        onChange={this.onEndChange}
                                        disabled={this.state.active}
                                    />)}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('active', {
                                        initialValue: this.props.active ? this.props.active : this.state.active
                                    })(<Checkbox checked={this.state.active} onChange={this.handleActiveStatus}>I am Currently Working</Checkbox>)}
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Edit Experience
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Spin>
            </Drawer>
        );
    }
}

const EditExperienceForm = Form.create({name: 'edit_experience'})(EditExperience);

export default EditExperienceForm;
