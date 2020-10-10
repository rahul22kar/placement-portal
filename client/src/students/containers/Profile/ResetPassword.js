import React, {Component} from 'react';
import {Spin, Layout, Row, Typography, Col, message} from 'antd';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import ResetPasswordForm from "../../components/Profile/ResetPassword";
import * as actionCreators from '../../../redux/actions';

const {Content} = Layout;

class ResetPassword extends Component {

    handleReset = (values) => {
        this.props.onResetPassword(values)
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.errors !== prevProps.errors && this.props.success !== prevProps.success && this.props.loading === false) {
            if(this.props.success === false) {
                Object.keys(this.props.errors).forEach((key, i) => {
                    message.error(this.props.errors[key]);
                });
            }
        }
        if(this.props.success !== prevProps.success && this.props.success && this.props.loading === false) {
            message.success("Password successfully changed. Use new password to login next time.");
        }
    }

    render() {
        return (
            <Spin spinning={this.props.loading} tip={"Resetting .."}>
                <Layout>
                    <Content
                    style={{
                        background: '#fff',
                        margin: 10
                    }}>
                        <Row type={'flex'} justify={'center'} style={{margin: 20}}>
                            <Typography.Title>
                                Reset Password
                            </Typography.Title>
                        </Row>
                        <Row type={'flex'} justify={'center'}>
                            <Col xxl={7} xl={10} lg={12} md={12} xs={24} sm={24}>
                                <ResetPasswordForm handleSubmit={this.handleReset}/>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Spin>
        );
    }
}

const mapStateToProps =(state) => ({
    loading: state.profile.loading.tabs,
    errors: state.profile.errors,
    success: state.profile.success
});

const mapDispatchToProps = dispatch => {
    return {
        onResetPassword: (values) => dispatch(actionCreators.resetPassword(values))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPassword));