import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Spin, message} from 'antd';

import * as actionCreators from "../../redux/actions";

import RegisterForm from '../components/Register/Register';
import Media from "react-media";


class Register extends Component {

    handleRegisterSubmit = (values) => {
        this.props.onRegister(values);
    };

    handleResendEmail = (values) => {
        this.props.onResendEmail(values);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.error !== prevProps.error) {
            if (Object.keys(this.props.error).length > 0) {
                Object.keys(this.props.error).map((key, index) => message.error(this.props.error[key]));
            }
        }
        if (this.props.resend_email_success !== prevProps.resend_email_success && this.props.resend_email_success === true) {
            message.success("Email resent successfully.");
        }
        if (this.props.success !== prevProps.success && this.props.success === true) {
            message.success("Successfully registered, kindly check you registered email for verification link");
        }
    }

    render() {
        let redirect = null;
        if (this.props.isAuthenticated) {
            if (this.props.loggedUserRole === "student") {
                redirect = (<Redirect
                    to={this.props.location.state ? this.props.location.state.from.pathname : "/student/dashboard"}/>);
            } else if (this.props.loggedUserRole === "admin") {
                redirect = (<Redirect
                    to={this.props.location.state ? this.props.location.state.from.pathname : "/admin/dashboard"}/>);
            } else {
                redirect = (<Redirect to="/"/>);
            }
        }
        return (
            <div>
                {redirect}
                <Media query={{maxWidth: '1224px'}}>
                    {matches =>
                        matches ? <Spin spinning={this.props.loading} tip="Signing up ...">
                            <RegisterForm loading={this.props.loading} onRegisterSubmit={this.handleRegisterSubmit}
                                          isMobile={true} onResendEmail={this.handleResendEmail}/>
                        </Spin> : <Spin spinning={this.props.loading} tip="Signing up ...">
                            <RegisterForm loading={this.props.loading} onRegisterSubmit={this.handleRegisterSubmit}
                                          isMobile={false} onResendEmail={this.handleResendEmail}/>
                        </Spin>
                    }
                </Media>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (inputData) => dispatch(actionCreators.authRegister(inputData)),
        onResendEmail: (inputData) => dispatch(actionCreators.resendEmail(inputData))
    }
};

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated,
    loggedUserRole: state.auth.loggedUserRole,
    error: state.auth.errors,
    resend_email_success: state.auth.resend_email_success,
    success: state.auth.success
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
