import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout, Spin, Row, Col, Typography, message} from 'antd'
import {withRouter} from 'react-router-dom';
import * as actionCreators from '../../../redux/actions';
import {AddExperienceForm} from '../../components/Profile';

const {Content} = Layout;

class AddExperience extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.errors !== prevProps.errors && this.props.loading === false) {
            if(this.props.success === false) {
                Object.keys(this.props.errors).forEach((key, i) => {
                    message.error(this.props.errors[key]);
                });
            }
        }
        if(this.props.success !== prevProps.success && this.props.success && this.props.loading === false) {
            message.success("Experience successfully added");
        }
    }

    handleFormSubmission = (values) => {
        this.props.onAddExperience(values);
    };
    render() {
        return (
            <div>
                <Spin spinning={this.props.loading} tip="Loading ...">
                    <Layout>
                        <Content
                            style={{
                                margin: 10,
                                backgroundColor: '#fff'
                            }}
                            >
                            <Row type= 'flex' justify='center' style={{margin: 12}}>
                                <Typography.Title>
                                    Add Experience
                                </Typography.Title>
                            </Row>
                            <Row type='flex' justify='center'>
                                <Col xxl={7} xl={10} lg={12} md={12} xs={24} sm={24}>
                                    <AddExperienceForm onSubmit={this.handleFormSubmission} />
                                </Col>
                            </Row>
                        </Content>
                    </Layout>
                </Spin>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.profile.loading.page,
    success: state.profile.success,
    errors: state.profile.errors
});

const mapDispatchToProps = dispatch => {
    return {
        onAddExperience: (inputData) => dispatch(actionCreators.addExperience(inputData))
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddExperience));
