import React, {Component} from 'react'
import {Form, Col, Row, Input, Checkbox, Tooltip, InputNumber, Select, Icon, Button, Popconfirm} from 'antd'

const { Option } = Select;

class EligibilityCriteria extends Component{

    handleBack = () => {
        const values = this.props.form.getFieldsValue();
        this.props.submitValues(values);
        this.props.handleBack()
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSubmit(values)
            }
        })
    };

    render(){
        const {getFieldDecorator} = this.props.form;
        return(
            <div style={{textAlign: 'center'}}>
                <Form onSubmit={this.handleSubmit} colon={false}>
                <Form.Item label="Select programmes eligible for this job">
                        {getFieldDecorator("eligible_programmes", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please select Eligible Programmes for this Job"
                                }
                            ],
                            initialValue: this.props.eligible_programmes
                        })(
                            <Checkbox.Group>
                            <Row type='flex' justify='start' style={{margin: 5}}>
                                <Col>
                                    <Checkbox value="btech">BTech.</Checkbox>
                                </Col>
                            </Row>
                            <Row type='flex' justify='start' style={{margin: 5}}>
                                <Col>
                                    <Checkbox value="mtech">MTech.</Checkbox>
                                </Col>
                            </Row>
                            </Checkbox.Group>
                        )}
                    </Form.Item>
                    <Form.Item label="Select Branches eligible for this job">
                        {getFieldDecorator("eligible_branches", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please select Eligible Branches for this Job"
                                }
                            ],
                            initialValue: this.props.eligible_branches
                        })(
                            <Checkbox.Group>
                            <Row type='flex' justify='start' style={{margin: 5}}>
                                <Col>
                                    <Checkbox value="cse">Computer Science And Engineering</Checkbox>
                                </Col>
                            </Row>
                            <Row type='flex' justify='start' style={{margin: 5}}>
                                <Col>
                                    <Checkbox value="ee">Electrical Engineering</Checkbox>
                                </Col>
                            </Row>
                            <Row type='flex' justify='start' style={{margin: 5}}>
                                <Col>
                                    <Checkbox value="me">Mechanical Engineering</Checkbox>
                                </Col>
                            </Row>
                            <Row type='flex' justify='start' style={{margin: 5}}>
                                <Col>
                                    <Checkbox value="mc">Mathematics And Computing</Checkbox>
                                </Col>
                            </Row>
                            </Checkbox.Group>
                        )}
                    </Form.Item>
                    <Form.Item label="Are candidates who graduated already by June 2020 from IIT Goa also eligible to apply?">
                        {getFieldDecorator("graduate_candidates", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please specify"
                                }
                            ],
                            initialValue: this.props.graduate_candidates
                        })(
                        <Select>
                            <Option value="yes">Yes</Option>
                            <Option value="no">No</Option>
                        </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Additional Criteria (if any)">
                        {getFieldDecorator("additional_criteria", {
                            initialValue: this.props.additional_criteria
                        })(
                            <Input.TextArea
                                rows={4}
                                placeholder="Any Additional Eligibilty Criteria"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Special Needs (like medical, visa, etc)">
                        {getFieldDecorator("special_needs", {
                            initialValue: this.props.special_needs
                        })(
                            <Input.TextArea
                                rows={4}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Pre Placement Talk">
                        {getFieldDecorator("ppt", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please specify"
                                }
                            ],
                            initialValue: this.props.ppt
                        })(
                        <Select>
                            <Option value="on_campus">On Campus</Option>
                            <Option value="video_conference">Video Conference</Option>
                        </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Resume Shortlisting">
                        {getFieldDecorator("resume_shortlisting", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please specify"
                                }
                            ],
                            initialValue: this.props.resume_shortlisting
                        })(
                        <Select>
                            <Option value="yes">Yes</Option>
                            <Option value="no">No</Option>
                        </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Written Test">
                        {getFieldDecorator("written_test", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please specify"
                                }
                            ],
                            initialValue: this.props.written_test
                        })(
                        <Select>
                            <Option value="on_campus">On campus</Option>
                            <Option value="online">Online</Option>
                            <Option value="no_written_test">No Written Test</Option>
                        </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Group Discussion">
                        {getFieldDecorator("group_discussion", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please specify"
                                }
                            ],
                            initialValue: this.props.group_discussion
                        })(
                        <Select>
                            <Option value="yes">Yes</Option>
                            <Option value="no">No</Option>
                        </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Personal Interview">
                        {getFieldDecorator("personal_interview", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please specify"
                                }
                            ],
                            initialValue: this.props.personal_interview
                        })(
                        <Select>
                            <Option value="yes">Yes</Option>
                            <Option value="no">No</Option>
                        </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Expected Number of Rounds">
                        {getFieldDecorator("number_of_rounds", {
                            initialValue: this.props.number_of_rounds
                        })(
                            <InputNumber
                                min={1}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Technical Subjects in Written Test/Interview">
                        {getFieldDecorator("subjects", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please Specify"
                                }
                            ],
                            initialValue: this.props.subjects
                        })(
                            <Input.TextArea
                                rows={4}
                                placeholder=""
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.handleBack} style={{margin: 5}}>
                            Back
                        </Button>
                        <Popconfirm
                            placement="bottom"
                            onConfirm={this.handleSubmit}
                            title="Do you want to Submit?"
                            >
                            <Button type='primary' style={{margin: 5}}>
                                Submit
                            </Button>
                        </Popconfirm>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const EligibilityCriteriaForm = Form.create({name: "eligibilitycriteria"})(EligibilityCriteria);

export default EligibilityCriteriaForm
