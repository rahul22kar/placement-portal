import React, {Component} from 'react';
import {withRouter, NavLink , Link, Redirect} from 'react-router-dom';
import {Layout, Row, Col, Result, Button, Descriptions, Spin, Typography,Form, Input, InputNumber, message,Select } from 'antd';

const { Option } = Select;

const {Content} = Layout;

class LandingForm extends React.Component{
        state = {
            referrer: null,
            data : null
        };
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            //   console.log(values);
              this.setState({referrer : '/company/create_form'});
              this.setState({data : values});
          }
        });
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        const referrer = this.state.referrer;
        if (referrer) return <Redirect 
            to = {{
                pathname : referrer,
                state : this.state.data
            }}
        />;

        let profileMessage = null;

            profileMessage = (
                <Content
                    style={{
                        margin: 10,
                        padding: 24,
                        background: "#fff"
                    }}
                >
                    <Typography.Title level={3} style={{textAlign : 'center'}}>
                        Form Details
                    </Typography.Title>
                    <p style = {{ color : '#a0a0a0' , textAlign : 'center' }}>
                        Please mention the title of form the so that it would be easier for students.
                    </p>
                    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }} onSubmit={this.handleSubmit}>
                        <Form.Item label="Form Name">
                        {getFieldDecorator('form_name', {
                            rules: [{ 
                                required: true, 
                                message: 'Please input form name' 
                            }],
                        })(<Input 
                            placeholder = "Enter Company Name"
                        />)}
                        </Form.Item>
                        <Form.Item label="Description">
                        {getFieldDecorator('description', {
                            rules: [{ 
                                required: false, 
                                message: 'Please input your note!' 
                            }],
                        })(<Input.TextArea
                            rows = "5"
                            placeholder = "Please provide short description"
                        />)}
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        </Form.Item>
                    </Form>
                </Content>
            );
        return (
            <Layout>
                <Row type="flex" justify="center">
                    <Col span={24}>
                        {profileMessage}
                    </Col>
                </Row>
            </Layout>
        );
    }
    
}
const Landing = Form.create({ name: 'createform' })(LandingForm);

export default withRouter(Landing);
