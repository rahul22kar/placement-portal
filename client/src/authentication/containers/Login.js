import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import {message, Spin} from 'antd';

import * as actionCreators from '../../redux/actions/index';

import LoginForm from '../components/Login/Login';
import Media from "react-media";

class Login extends Component {

    handleLoginSubmit = (values) => {
        this.props.onLogin(values);
    };

    handleForgotPassword = (values) => {
        this.props.onForgotPassword(values);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.error !== prevProps.error) {
            if (Object.keys(this.props.error).length > 0) {
                Object.keys(this.props.error).map((key, index) => message.error(this.props.error[key]));
            }
        }
        if (this.props.forgot_pwd_success !== prevProps.forgot_pwd_success && this.props.forgot_pwd_success === true) {
            message.success("Kindly check your registered email for OTP");
        }
    }

    render() {
        let redirect = null;
        if (this.props.isAuthenticated) {
            if (this.props.loggedUserRole === "student") {
                redirect = (<Redirect
                    to={this.props.location.state && this.props.location.state.from.pathname.split('/')[1] === "student" ? this.props.location.state.from.pathname : "/student/dashboard"}/>);
            } else if (this.props.loggedUserRole === "admin") {
                redirect = (<Redirect
                    to={this.props.location.state && this.props.location.state.from.pathname.split('/')[1] === "admin" ? this.props.location.state.from.pathname : "/admin/dashboard"}/>);
            } else {
                redirect = (<Redirect
                    to={this.props.location.state && this.props.location.state.from.pathname.split('/')[1] === "company" ? this.props.location.state.from.pathname : "/company/dashboard"}/>);
            }
        }
        return (
            <div>
                {redirect}
                <Media query={{maxWidth: '1224px'}}>
                    {matches =>
                        matches ? <Spin spinning={this.props.loading} tip="Logging in ...">
                            <LoginForm loading={this.props.loading} onLoginSubmit={this.handleLoginSubmit}
                                       onForgotPassword={this.handleForgotPassword}
                                       isMobile={true}/>
                        </Spin> : <Spin spinning={this.props.loading} tip="Logging in ...">
                            <LoginForm loading={this.props.loading} onLoginSubmit={this.handleLoginSubmit}
                                       onForgotPassword={this.handleForgotPassword}
                                       isMobile={false}/>
                        </Spin>}
                </Media>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (inputData) => dispatch(actionCreators.authLogin(inputData)),
        onForgotPassword: (inputData) => dispatch(actionCreators.forgotPassword(inputData))
    }
};

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated,
    loggedUserRole: state.auth.loggedUserRole,
    error: state.auth.errors,
    forgot_pwd_success: state.auth.forgot_pwd_success
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
