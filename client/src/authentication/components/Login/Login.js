import React, {Component} from "react";
import {NavLink, withRouter} from "react-router-dom";

import MediaQuery from 'react-responsive';

import {Form, Icon, Input, Button, Select, message, Row, Col, Typography, Avatar} from "antd";

import ForgotPasswordModal from "./ForgotPasswordModal";

import Logo from '../../../assets/images/Logo.png'

class Login extends Component {
    state = {
        role: 'student',
        forgotPasswordVisible: false
    };

    componentDidMount() {
        const {search} = this.props.location;
        const params = new URLSearchParams(search);
        const confirmEmailStatus = params.get("status");
        if (confirmEmailStatus !== null) {
            if (confirmEmailStatus === "true") {
                message.success("Email successfully verified");
            } else {
                message.error("Something went wrong. Please try again.");
            }
            this.props.history.push("/");
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onLoginSubmit(values);
            }
        });
    };

    handleSelectChange = (value) => {
        this.setState({role: value});
    };

    handleOk = (values) => {
        this.setState({
            forgotPasswordVisible: false
        });
        this.props.onForgotPassword(values)
    };

    handleCancel = () => {
        this.setState({
            forgotPasswordVisible: false
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {Option} = Select;
        const DesktopHeader = (props) => (
            <MediaQuery query="(min-device-width: 1224px)">
                {props.children}
            </MediaQuery>
        );
        const modalProps = {
            handleOk: this.handleOk,
            handleCancel: this.handleCancel,
            forgotPasswordVisible: this.state.forgotPasswordVisible
        };

        const loginWrapper = {
            backgroundColor: "rgba(0,21,41,0.1)",
            borderRadius: "10px",
            padding: "30px"
        };

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
                    <ForgotPasswordModal {...modalProps}/>
                    <Row type='flex' justify='center' align='top'>
                        <Col xxxl={3} xxl={5} xl={6} lg={8} md={12} sm={14} xs={22}>
                            <div style={loginWrapper}>
                                <Row type='flex' justify='center' align='middle' style={{paddingBottom: 20}}>
                                    <Typography.Title level={3}>Login</Typography.Title>
                                </Row>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Item>
                                        {getFieldDecorator("email", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "Please input your email"
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
                                                    message: "Please input your Password!"
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
                                        {getFieldDecorator('role', {
                                            rules: [{required: true, message: 'Please select your role'}],
                                        })(
                                            <Select
                                                size='large'
                                                placeholder="Select role"
                                                onChange={this.handleSelectChange}
                                                initialValue="student"
                                            >
                                                <Option key="student">Student</Option>
                                                <Option key="admin">Admin</Option>
                                                <Option key="company">Company</Option>
                                            </Select>,
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
                                                Log in
                                            </Button>
                                        </Row>
                                        <Row type='flex' justify='space-around' style={{marginTop: 10}}>
                                            {this.state.role === 'student' ?
                                                <Col>
                                                    <Button type={'link'}>
                                                        <NavLink to="/register">Register</NavLink>
                                                    </Button>
                                                </Col>
                                            : null}
                                            <Col>
                                                <Button type={'link'} onClick={() => this.setState({forgotPasswordVisible: true})}>Forgot Password</Button>
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                    <Row type='flex' justify='center' align='middle' style={{position: 'static', bottom: 0,  zIndex: -1, margin: '2%'}}>
                        <Col>
                            ©2020 - All Rights Reserved - IIT-GOA
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

const LoginForm = Form.create({name: "login"})(Login);

export default withRouter(LoginForm);