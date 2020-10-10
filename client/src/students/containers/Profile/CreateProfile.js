import React, {Component} from 'react';
import {message, Steps, Layout, Row, Col, Typography} from 'antd';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import * as actionCreators from '../../../redux/actions';

import {GeneralDetailsForm, StudentDetailsForm} from '../../components/Profile'
import moment from "moment";

class CreateProfile extends Component {
    state = {
        step: 1,
        general_details: {
            first_name: '',
            middle_name: '',
            last_name: '',
            dob: '1998-11-07',
            gender: '',
            address_line_a: '',
            address_line_b: '',
            phone_a: '',
            phone_b: ''
        },
        student_details: {
            course_type: '',
            year_of_study: '',
            year_of_join: '2016-07',
            roll_number: '',
            branch: '',
            interests: '',
            skills: '',
            cpi: '',
            cv: '',
            check1: false,
            check2: false
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.success !== this.props.success && this.props.success === true) {
            message.success("Profile successfully created");
        }
        if (prevProps.errors !== this.props.errors && Object.keys(this.props.errors).length > 0) {
            Object.keys(this.props.errors).forEach((key, i) => {
                if(key !== "not_found") {
                    message.error(this.props.errors[key]);
                }
            });
        }
    }

    handleNextButtonClick = () => {
        const {step} = this.state;
        this.setState({step: step + 1});
    };

    handleBackButtonClick = () => {
        const {step} = this.state;
        this.setState({step: step - 1});
    };

    generalDetailsFormValues = (values) => {
        const {general_details} = this.state;
        this.setState({
            general_details: {
                ...general_details,
                ...values
            }
        })
    };

    studentDetailsFormValues = (values) => {
        const {student_details} = this.state;
        this.setState({
            student_details: {
                ...student_details,
                ...values
            }
        })
    };

    handleFormSubmission = (values) => {
        const {student_details} = this.state;
        this.setState({
            student_details: {
                ...student_details,
                ...values
            }
        }, () => {
            const {student_details, general_details} = this.state;
            general_details.dob = moment(general_details.dob).toISOString();
            student_details.year_of_join = moment(student_details.year_of_join, 'YYYY-MM').format('YYYY');
            const inputData = {
                ...general_details,
                ...student_details
            };
            const cvData = new FormData();
            student_details.cv.forEach(files => {
                cvData.append('cv', files.originFileObj);
            });
            this.props.onCreateProfile(cvData, inputData);
        })
    };

    render() {
        const {step, student_details, general_details} = this.state;
        const {Step} = Steps;
        const {Content} = Layout;
        const stepConfig = [
            {
                title: 'General Details'
            },
            {
                title: 'Student Details'
            }
        ];
        if (this.props.profileExists) {
            return (<Redirect to="/student/dashboard"/>);
        }
        return(
            <Layout>
                <Row type='flex' justify='center'>
                    <Col span={24}>
                        <Content
                            style={{
                                margin: 10,
                                padding: 24,
                                background: "#fff"
                            }}
                            >
                            <Row type='flex' justify='center' style={{background: '#fff'}}>
                                <Col span={24}>
                                    <Row type= 'flex' justify='center' style={{margin: 24}}>
                                        <Typography.Title>
                                            Create Profile
                                        </Typography.Title>
                                    </Row>
                                    <Row type='flex' justify='center' style={{margin: 24}}>
                                        <Col xs={24} sm={24} md={12}>
                                            <Steps current={step-1}>
                                                {stepConfig.map(item => (
                                                    <Step key={item.title} title={item.title}/>
                                                ))}
                                            </Steps>
                                        </Col>
                                    </Row>
                                    <Row type='flex' justify='center' style={{margin: 24}}>
                                        {step === 1 ?
                                            <Col xs={24} sm={18} md={12} lg={10} xl={10} xxl={6}>
                                                <GeneralDetailsForm {...general_details} handleNextButton={this.handleNextButtonClick}
                                                    submittedValues={this.generalDetailsFormValues}/>
                                            </Col>
                                        : null}
                                        {step === 2 ?
                                            <Col xs={24} sm={18} md={12} lg={10} xl={10} xxl={6}>
                                                <StudentDetailsForm {...student_details} handleConfirmButton={this.handleFormSubmission}
                                                    submittedValues={this.studentDetailsFormValues}
                                                    handleBackButton={this.handleBackButtonClick} loading={this.props.loading}/>
                                            </Col>
                                            : null}
                                    </Row>
                                </Col>
                            </Row>
                        </Content>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.profile.loading.page,
    errors: state.profile.errors,
    success: state.profile.success,
    profileExists: state.profile.profileExists
});

const mapDispatchToProps = dispatch => {
    return {
        onCreateProfile: (cvData, inputData) => dispatch(actionCreators.createStudentProfile(cvData, inputData))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateProfile));
