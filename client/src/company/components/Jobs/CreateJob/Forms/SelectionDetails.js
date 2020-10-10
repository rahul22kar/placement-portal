import React, {Component} from 'react'
import {Form, Col, Row, Input, Checkbox, Tooltip, InputNumber, Select, Icon, Button} from 'antd'

class SelectionDetails extends Component{

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.submitValues(values);
                this.props.handleNext()
            }
        })
    };

    handleBack = () => {
        const values = this.props.form.getFieldsValue();
        this.props.submitValues(values);
        this.props.handleBack()
    };

    render(){
        const {getFieldDecorator} = this.props.form;
        return(
            <div style={{textAlign: 'center'}}>
                <Form onSubmit={this.handleSubmit} colon={false}>
                    <Form.Item label="Select branches eligible for this job">
                        {getFieldDecorator("eligible_branches", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please select Eligible branches for this Job"
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
                    <Form.Item label="Select type(s) of interview">
                        {getFieldDecorator("type_of_interview", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please select type of interview"
                                }
                            ],
                            initialValue: this.props.type_of_interview
                        })(
                            <Checkbox.Group>
                            <Row type='flex' justify='start' style={{margin: 5}}>
                                <Col>
                                    <Checkbox value="oncampus">On Campus</Checkbox>
                                </Col>
                            </Row>
                            <Row type='flex' justify='start' style={{margin: 5}}>
                                <Col>
                                    <Checkbox value="video_conf">Video Conference</Checkbox>
                                </Col>
                            </Row>
                            <Row type='flex' justify='start' style={{margin: 5}}>
                                <Col>
                                    <Checkbox value="telephonic">Telephonic</Checkbox>
                                </Col>
                            </Row>
                            <Row type='flex' justify='start' style={{margin: 5}}>
                                <Col>
                                    <Checkbox value="person_on_site">Person on Site</Checkbox>
                                </Col>
                            </Row>
                            </Checkbox.Group>
                        )}
                    </Form.Item>
                    <Form.Item
                        label={<span>Skills <Tooltip title="Use , to separate tags"><Icon type="question-circle-o"/></Tooltip></span>}
                        >
                        {getFieldDecorator("skills", {
                            rules: [
                                {
                                    type: 'array',
                                    required: true,
                                    message: "Please fill this field"
                                }
                            ],
                            initialValue: Array.isArray(this.props.skills) ? this.props.skills : ['NodeJS', 'Python', 'C++']
                        })(
                            <Select mode="tags" tokenSeparators={[',']}/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Test type"
                        >
                        {getFieldDecorator("test_type", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please select test type"
                                }
                            ],
                            initialValue: this.props.test_type
                        })(
                            <Checkbox.Group>
                            <Row type='flex' justify='start' style={{margin: 5}}>
                                <Col>
                                    <Checkbox value="none">None</Checkbox>
                                </Col>
                            </Row>
                            <Row type='flex' justify='start' style={{margin: 5}}>
                                <Col>
                                    <Checkbox value="written">Written</Checkbox>
                                </Col>
                            </Row>
                            <Row type='flex' justify='start' style={{margin: 5}}>
                                <Col>
                                    <Checkbox value="Online">Online</Checkbox>
                                </Col>
                            </Row>
                            <Row type='flex' justify='start' style={{margin: 5}}>
                                <Col>
                                    <Checkbox value="invigilated">invigilated</Checkbox>
                                </Col>
                            </Row>
                            </Checkbox.Group>
                        )}
                    </Form.Item>
                    <Form.Item label="Minimum CPI">
                        {getFieldDecorator("minimum_cpi", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input minimum CPI"
                                }
                            ],
                            initialValue: this.props.minimum_cpi
                        })(
                            <InputNumber
                                max={10}
                                step={0.1}
                                min={0}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Resume">
                        {getFieldDecorator("resume_criteria", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input resume criteria"
                                }
                            ],
                            initialValue: this.props.resume_criteria
                        })(
                            <Input.TextArea
                                rows={4}
                                placeholder="Mention resume criteria for shortlisting"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Special Requirements">
                        {getFieldDecorator("special_requirements", {
                            initialValue: this.props.special_requirements
                        })(
                            <Input.TextArea
                                rows={4}
                                placeholder="Mention special requirements (if any)"
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

const SelectionDetailsForm = Form.create({name: "selectiondetails"})(SelectionDetails);

export default SelectionDetailsForm
