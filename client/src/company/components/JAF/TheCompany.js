import React, {Component} from 'react'
import {Form, Input, Select, Button} from 'antd'


const { Option } = Select;



class TheCompany extends Component{

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
                    <Form.Item label="Name of the Company">
                        {getFieldDecorator("company_name", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input the company name"
                                }
                            ],
                            initialValue: this.props.company_name
                        })(
                            <Input
                                placeholder="Specify the company's name  "
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Website">
                        {getFieldDecorator("company_website", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input the compnay's website"
                                }
                            ],
                            initialValue: this.props.company_website
                        })(
                            <Input
                                placeholder="Specify the company's website  "
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="About Company">
                        {getFieldDecorator("about_company", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input the Company Description"
                                }
                            ],
                            initialValue: this.props.about_company
                        })(
                            <Input.TextArea
                                rows={10}
                                placeholder="Introduction/Description of your company"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Company Specialization/Products">
                        {getFieldDecorator("company_specialization", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input Specialization"
                                }
                            ],
                            initialValue: this.props.company_specialization
                        })(
                            <Input
                                placeholder="Specify the company's specialization or Products"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Category">
                        {getFieldDecorator("company_category", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input Company Category"
                                }
                            ],
                            initialValue: this.props.company_category
                        })(
                        <Select>
                            <Option value="private">Private</Option>
                            <Option value="government">Government</Option>
                            <Option value="psu">PSU</Option>
                        </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Contact 1 (Name of HR)">
                        {getFieldDecorator("contact_1", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please enter name of HR"
                                }
                            ],
                            initialValue: this.props.contact_1
                        })(
                            <Input
                                placeholder="Name"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Phone Number(s)">
                        {getFieldDecorator("phone_number", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input Phone Number"
                                }
                            ],
                            initialValue: this.props.phone_number
                        })(
                            <Input
                                placeholder="Phone Number"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Mobile">
                        {getFieldDecorator("mobile", {
                            
                            initialValue: this.props.mobile
                        })(
                            <Input
                                placeholder="Mobile"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Email Address(es)">
                        {getFieldDecorator("email", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input Email"
                                }
                            ],
                            initialValue: this.props.email
                        })(
                            <Input
                                placeholder="Email"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Contact 2">
                        {getFieldDecorator("contact_2", {
                            initialValue: this.props.contact_2
                        })(
                            <Input.TextArea
                                rows={4}
                                placeholder="Alternate Contact Details"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Postal Address">
                        {getFieldDecorator("postal_address", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please enter Postal Address"
                                }
                            ],
                            initialValue: this.props.postal_address
                        })(
                            <Input.TextArea
                                rows={4}
                                placeholder="Postal Address of Company"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Any other Information/ Special Request">
                        {getFieldDecorator("other_info", {
                            initialValue: this.props.other_info
                        })(
                            <Input.TextArea
                                rows={4}
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            Next
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const TheCompanyForm = Form.create({name: "TheCompany"})(TheCompany);

export default TheCompanyForm
