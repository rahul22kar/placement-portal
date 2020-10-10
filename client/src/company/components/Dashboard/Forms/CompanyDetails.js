import React, {Component} from 'react'
import {Form, Input, Button, Upload, Icon, Select, Row, Col, Typography} from 'antd'
import {withRouter} from 'react-router-dom'

const {Option} = Select;

const uploadProps = {
    beforeUpload: file => {
        return false;
    },
    accept: 'image/jpeg'
};

const fileSelect = (e) => {
    return e.fileList.slice(-1);
};

class CompanyDetails extends Component{

    state={
        other: false,
        id: typeof this.props.contact_details !== 'undefined' ? this.props.contact_details.length - 1: 0
    };


    remove = k => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return
        }

        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        })
    };

    add = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        let nextKeys = 0;
        this.setState((prevState, props) => ({
            id: prevState.id + 1
        }), () => {
           nextKeys = keys.concat(this.state.id);
           form.setFieldsValue({
               keys: nextKeys,
           })
        });
    };

    handleSelect = (value) => {
        if (value === "other") {
            this.setState({
                other: true
            })
        } else {
            this.setState({
                other: false
            })
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.type_of_company === "other") {
                    values.type_of_company = values.other_type
                }
                this.props.handleSubmit(values)
            }
        })
    };

    render(){
        const {getFieldDecorator, getFieldValue} = this.props.form;
        const keyValues = typeof this.props.contact_details !== 'undefined' ? this.props.contact_details.map((value, index) => index) : [0];
        getFieldDecorator('keys', { initialValue: keyValues });
        const keys = getFieldValue('keys');

        const contactItems = keys.map((k, index) => (
            <Row type='flex' justify='start' align='middle' key={index}>
                <Col span={7}>
                    <Form.Item
                        label={index === 0 ? "Designation" : ''}
                        >
                        {getFieldDecorator(`contact_designation[${k}]`, {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input designation"
                                }
                            ],
                            initialValue: this.props.contact_designation ? this.props.contact_designation[index] : ''
                        })(<Input placeholder="Enter designation of person"/>)}
                    </Form.Item>
                </Col>
                <Col offset={1} span={7}>
                    <Form.Item
                        label={index === 0 ? "Email" : ''}
                        >
                        {getFieldDecorator(`contact_email[${k}]`, {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input email"
                                }
                            ],
                            initialValue: this.props.contact_email ? this.props.contact_email[index] : ''
                        })(<Input placeholder="Enter email of person"/>)}
                    </Form.Item>
                </Col>
                <Col offset={1} span={6}>
                    <Form.Item
                        label={index === 0 ? "Number" : ''}
                        >
                        {getFieldDecorator(`contact_number[${k}]`, {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input contact number"
                                }
                            ],
                            initialValue: this.props.contact_number ? this.props.contact_number[index] : ''
                        })(<Input placeholder="Enter contact number of person"/>)}
                    </Form.Item>

                </Col>
                <Col offset = {1} span={1}>
                    {keys.length > 1 ? (
                        <Form.Item
                            label={index === 0 ? "Remove" : null}
                            >
                            <Button
                                icon='minus-circle'
                                type='secondary'
                                onClick={() => this.remove(k)}
                            />
                        </Form.Item>
                    ) : null}
                </Col>
            </Row>
        ));


        return(
            <div>
                <Form onSubmit={this.handleSubmit} colon={false}>
                    <Form.Item label="Company Name">
                        {getFieldDecorator("company_name", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input company name"
                                }
                            ],
                            initialValue: this.props.company_name
                        })(
                            <Input
                                placeholder="Mention your company name"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Introduction">
                        {getFieldDecorator("company_introduction", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input Company Introduction"
                                }
                            ],
                            initialValue: this.props.company_introduction
                        })(
                            <Input.TextArea
                                rows={4}
                                placeholder="Write a brief introduction about your company"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Specialization">
                        {getFieldDecorator("company_specialization", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input Company Specialization"
                                }
                            ],
                            initialValue: this.props.company_specialization
                        })(
                            <Input
                                placeholder="Write about company specialization"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Type of Company">
                        {getFieldDecorator("type_of_company", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please select Company type"
                                }
                            ],
                            initialValue: this.props.type_of_company
                        })(
                            <Select
                                placeholder="Select type of your company"
                                onSelect={this.handleSelect}
                                >
                                <Option value="government">Government</Option>
                                <Option value="private">Private</Option>
                                <Option value="ngo">NGO</Option>
                                <Option value="mnc">MNC</Option>
                                <Option value="psu">PSU</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        )}
                    </Form.Item>
                    {this.state.other ?
                    <Form.Item>
                        {getFieldDecorator("other_type", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please specify other type"
                                }
                            ],
                            initialValue: this.props.type_of_company
                        })(
                            <Input
                                placeholder="Specify other type"
                            />
                        )}
                    </Form.Item> : null}
                    <Form.Item label="Company Website">
                        {getFieldDecorator("website", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input company website"
                                }
                            ],
                            initialValue: this.props.website
                        })(
                            <Input
                                placeholder="Mention your company website"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Address">
                        {getFieldDecorator("company_address", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input Company Address"
                                }
                            ],
                            initialValue: this.props.company_address
                        })(
                            <Input.TextArea
                                rows={2}
                                placeholder="Write your Address"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Company Logo">
                        {getFieldDecorator("logo_data",{
                            valuePropName: 'fileList',
                            getValueFromEvent: fileSelect,
                            rules: [
                                {required: true}
                            ],
                            initialValue: this.props.fileList
                        })(
                            <Upload {...uploadProps} listType='picture'>
                                <Button>
                                    <Icon type="upload"/> Select File
                                </Button>
                            </Upload>
                        )}
                    </Form.Item>
                    <Row type='flex' justify='start' style={{marginBottom: 10}}>
                        <Typography.Text style={{color: 'black'}}>Contact Details</Typography.Text>
                    </Row>
                    {contactItems}
                    <Form.Item>
                        <Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
                        <Icon type="plus" /> Add contact
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const CompanyDetailsForm = Form.create({name: "companydetails"})(CompanyDetails);

export default withRouter(CompanyDetailsForm)
