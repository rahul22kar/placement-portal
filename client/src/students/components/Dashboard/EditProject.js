import React, {Component} from 'react';
import {Form, Input, Button, DatePicker, Checkbox, Drawer, Spin, Row, Col, Typography } from 'antd';
import moment from 'moment'

class EditProject extends Component {

    state = {
        active: this.props.active,
        startValue: null,
        endValue: null
    };

    validateInput = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleEditProject(this.props.project_id, values);
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
        const {loading, isMobile, onEditProjectClose, editProjectVisible} = this.props
        return (
            <Drawer
                width={isMobile ? '100vw' : '40vw'}
                placement="right"
                onClose={onEditProjectClose}
                visible={editProjectVisible}
                >
                <Spin spinning={loading} tip="Loading...">
                    <Row type= 'flex' justify='center' style={{margin: 12}}>
                        <Typography.Title>
                            Edit Project
                        </Typography.Title>
                    </Row>
                    <Row type='flex' justify='center'>
                        <Col span={24}>
                            <Form onSubmit={this.validateInput} style={{margin: 12}}>
                                <Form.Item label="Project Name">
                                    {getFieldDecorator('project_name', {
                                        rules: [{required: true, message: 'Project Name field is required'}],
                                        initialValue: this.props.project_name
                                    })(<Input placeholder="Enter the name of project"/>)}
                                </Form.Item>
                                <Form.Item label="Location">
                                    {getFieldDecorator('project_location', {
                                        rules: [{required: true, message: 'Location field is required'}],
                                        initialValue: this.props.project_location
                                    })(<Input placeholder="Enter the location here"/>)}
                                </Form.Item>
                                <Form.Item label="Guidance">
                                    {getFieldDecorator('guidance', {
                                        rules: [{required: true, message: 'Project guide field is required'}],
                                        initialValue: this.props.guidance
                                    })(<Input placeholder="Enter your project title here"/>)}
                                </Form.Item>
                                <Form.Item label="Description">
                                    {getFieldDecorator('description', {
                                        rules: [{required: true, message: 'Project description field is required'}],
                                        initialValue: this.props.description
                                    })(<Input.TextArea rows={5} placeholder="Enter your project description here"/>)}
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
                                <Form.Item label="Currently Working">
                                    {getFieldDecorator('active', {
                                        initialValue: this.props.active ? this.props.active : this.state.active
                                    })(<Checkbox checked={this.state.active} onChange={this.handleActiveStatus}>I am Currently Working</Checkbox>)}
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Edit Project
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

const EditProjectForm = Form.create({name: 'edit_project'})(EditProject);

export default EditProjectForm;
