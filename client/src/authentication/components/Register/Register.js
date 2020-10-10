import React, {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom';

import {Form, Icon, Input, Button, Row, Col, Typography, Avatar} from "antd";

import Logo from '../../../assets/images/Logo.png'
import MediaQuery from "react-responsive";
import ResendEmailModal from "./ResendEmailModal";

class Register extends Component {

    state = {
        confirmDirty: false,
        resendEmailVisible: false
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onRegisterSubmit(values);
            }
        })
    };

    handleOk = (values) => {
        this.setState({
            resendEmailVisible: false
        });
        this.props.onResendEmail(values);
    };

    handleCancel = () => {
        this.setState({
            resendEmailVisible: false
        });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue("password")) {
            callback("Two passwords that you enter is inconsistent!");
        } else {
            callback();
        }
    };
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(["confirm"], {force: true});
        }
        callback();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const registerWrapper = {
            backgroundColor: "rgba(0,21,41,0.1)",
            borderRadius: "10px",
            padding: "30px"
        };

        const modalProps = {
            handleOk: this.handleOk,
            handleCancel: this.handleCancel,
            resendEmailVisible: this.state.resendEmailVisible
        };

        const DesktopHeader = (props) => (
            <MediaQuery query="(min-device-width: 1224px)">
                {props.children}
            </MediaQuery>
        );
        return (
            <div style={{overflowX: 'hidden'}}>
                <DesktopHeader>
                    <Row type='flex' gutter={16} justify='end' style={{backgroundColor: '#001529', overflowX: 'hidden'}}>
                        <Col>
                            <Icon type="mail" style={{padding: '5px', color: 'white', fontSize: '1.1rem'}}/>
                            <Typography.Text style={{padding: '5px', color: 'white'}}>placements@iitgoa.ac.in</Typography.Text>
                        </Col>
                        <Col>
                            <Icon type="phone" style={{padding: '5px', color: 'white', fontSize: '1.1rem'}}/>
                            <Typography.Text style={{padding: '5px', color: 'white'}}>+91 9920085577</Typography.Text>
                        </Col>
                    </Row>
                </DesktopHeader>
                <div style={{ width: '100%', overflow: 'hidden', marginTop: '3%'}}>
                    <Row type='flex' gutter={16} justify='center' align='top' style={this.props.isMobile ? {padding: 25, textAlign: 'center', marginBottom: '2%'} : {padding: 25, textAlign: 'left', marginBottom: '2%'}}>
                        <Col>
                            <Avatar src={Logo} alt="Logo" size={85}/>
                        </Col>
                        <Col>
                            <Typography.Title style={{fontSize: '1.2rem', paddingTop: '5%' }}>Placement Cell</Typography.Title>
                            <Typography.Text type='secondary'>Indian Institute of Technology, Goa</Typography.Text>
                        </Col>
                    </Row>
                    <ResendEmailModal {...modalProps}/>
                    <Row type='flex' justify='center' align='top'>
                        <Col xxxl={3} xxl={5} xl={6} lg={8} md={12} sm={14} xs={22}>
                            <div style={registerWrapper}>
                                <Row type='flex' justify='center' align='middle' style={{paddingBottom: 20}}>
                                    <Typography.Title level={3}>Register</Typography.Title>
                                </Row>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Item>
                                        {getFieldDecorator("email", {
                                            validateTrigger: "onSubmit",
                                            rules: [
                                                {
                                                    pattern: /@iitgoa.ac.in/,
                                                    message: "Enter a valid IIT Goa Email ID!"
                                                },
                                                {
                                                    required: true,
                                                    message: "This field cannot be empty!"
                                                }
                                            ]
                                        })(
                                            <Input
                                                size='large'
                                                prefix={
                                                    <Icon
                                                        type='user'
                                                        style={{color: "rgba(0,0,0,.25)"}}
                                                    />
                                                }
                                                placeholder='Email'
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator("password", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "Please input your password!"
                                                },
                                                {
                                                    validator: this.validateToNextPassword
                                                }
                                            ]
                                        })(
                                            <Input.Password
                                                size='large'
                                                prefix={
                                                    <Icon
                                                        type='lock'
                                                        style={{color: "rgba(0,0,0,.25)"}}
                                                    />
                                                }
                                                type='password'
                                                placeholder='Password'
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator("confirm_password", {
                                            validateTrigger: "onSubmit",
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "This field cannot be empty!"
                                                },
                                                {
                                                    validator: this.compareToFirstPassword
                                                }
                                            ]
                                        })(
                                            <Input.Password
                                                size='large'
                                                prefix={
                                                    <Icon
                                                        type='lock'
                                                        style={{color: "rgba(0,0,0,.25)"}}
                                                    />
                                                }
                                                type='password'
                                                placeholder='Confirm Password'
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        <Row type='flex' justify='center'>
                                            <Button
                                                type='primary'
                                                htmlType='submit'
                                                disabled={this.props.loading}
                                                style={{
                                                    width: '100%'
                                                }}
                                            >
                                                Register
                                            </Button>
                                        </Row>
                                        <Row type='flex' justify='space-around' style={{marginTop: 10}}>
                                            <Col>
                                                <Button type={'link'}>
                                                    <NavLink to="/">Log in</NavLink>
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button type={'link'} onClick={() => this.setState({resendEmailVisible: true})}>Resend Confirmation Email</Button>
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                    <Row type='flex' justify='center' align='middle' style={{position: 'static', bottom: 0,  zIndex: -1, margin: '2%'}}>
                        <Col>
                            ©2019 - All Rights Reserved - IIT-GOA
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

const RegisterForm = Form.create({name: 'register'})(Register);

export default withRouter(RegisterForm);
