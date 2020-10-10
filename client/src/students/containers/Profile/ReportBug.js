import React, {Component} from 'react';
import {Col, Layout, message, Row, Spin, Typography} from "antd";
import ReportBugForm from "../../components/Profile/ReportBug";
import {connect} from "react-redux";
import * as actionCreators from '../../../redux/actions';
import {withRouter} from 'react-router-dom'

const {Content} = Layout;

class ReportBug extends Component {

    onSubmit = (values) => {
        this.props.onSubmit(values)
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
            message.success("Bug successfully reported. Thank you.");
        }
    }

    render() {

        const formProps = {
            onSubmit: this.onSubmit
        };

        return (
            <Layout>
                <Spin spinning={this.props.loading} tip="Reporting ...">
                    <Content
                        style={{
                            background: '#fff',
                            margin: 10,
                            padding: 10
                        }}
                    >
                        <Row type='flex' justify='center' style={{margin: 10}}>
                            <Typography.Title>
                                Report Bug
                            </Typography.Title>
                        </Row>
                        <Row type='flex' justify='center'>
                            <Col xxl={7} xl={10} lg={12} md={12} xs={24} sm={24}>
                                <ReportBugForm {...formProps}/>
                            </Col>
                        </Row>
                    </Content>
                </Spin>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        loading: state.profile.loading.tabs,
        errors: state.profile.errors,
        success: state.profile.success
    };

};

const mapDispatchToProps = dispatch => {
    return{
        onSubmit: (values) => dispatch(actionCreators.reportBug(values))
    };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportBug));