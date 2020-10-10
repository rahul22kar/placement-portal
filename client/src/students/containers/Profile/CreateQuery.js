import React, {Component} from 'react';
import {Col, Layout, message, Row, Spin, Typography} from "antd";
import {CreateQueryForm} from "../../components/Profile";
import {connect} from "react-redux";
import * as actionCreators from '../../../redux/actions';
import {withRouter} from 'react-router-dom'

const {Content} = Layout;

class CreateQuery extends Component {

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
            message.success("Query successfully created");
        }
    }

    render() {

        const formProps = {
            onSubmit: this.onSubmit
        };

        return (
            <Layout>
                <Spin spinning={this.props.loading} tip="Creating ...">
                    <Content
                        style={{
                            background: '#fff',
                            margin: 10,
                            padding: 10
                        }}
                    >
                        <Row type='flex' justify='center' style={{margin: 10}}>
                            <Typography.Title>
                                Create Query
                            </Typography.Title>
                        </Row>
                        <Row type={'flex'} justify={'center'}>
                            <Col xxl={7} xl={10} lg={12} md={12} xs={24} sm={24}>
                                <CreateQueryForm {...formProps}/>
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
        onSubmit: (values) => dispatch(actionCreators.createQuery(values))
    };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateQuery));