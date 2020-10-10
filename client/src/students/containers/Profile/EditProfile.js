import React, {Component} from 'react';
import {Tabs, Layout, message, Spin, Row, Col} from 'antd';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actionCreators from '../../../redux/actions';

import {BasicDetailsForm, AcademicDetailsForm, ProfessionalDetailsForm} from "../../components/Profile"

const {Content} = Layout;
const { TabPane } = Tabs;

class EditProfile extends Component {
    state = {
        activeKey: "1",
        general_details: {
            first_name: this.props.profileData ? this.props.profileData.first_name : '',
            middle_name: this.props.profileData ? this.props.profileData.middle_name : '',
            last_name: this.props.profileData ? this.props.profileData.last_name : '',
            dob: this.props.profileData ? this.props.profileData.dob : '1998-11-07',
            gender: this.props.profileData ? this.props.profileData.gender : '',
            address_line_a: this.props.profileData ? this.props.profileData.address_line_a : '',
            address_line_b: this.props.profileData ? this.props.profileData.address_line_b : '',
            phone_a: this.props.profileData ? this.props.profileData.phone_a : '',
            phone_b: this.props.profileData ? this.props.profileData.phone_b : ''
        },
        academic_details: {
            course_type: this.props.profileData ? this.props.profileData.course_type : '',
            year_of_study: this.props.profileData ? this.props.profileData.year_of_study : '',
            year_of_join: this.props.profileData ? this.props.profileData.year_of_join + '-07' : '2016-07' ,
            branch: this.props.profileData ? this.props.profileData.branch : '',
            roll_number: this.props.profileData ? this.props.profileData.roll_number : '',
            cpi: this.props.profileData ? this.props.profileData.cpi : ''
        },
        professional_details: {
            interests: this.props.profileData ? this.props.profileData.interests : '',
            skills: this.props.profileData ? this.props.profileData.skills : '',
            cv1: '',
            cv2: '',
            cv3: '',
            current_cv_array: this.props.profileData ? this.props.profileData.cv : ''
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.errors !== prevProps.errors && this.props.loading === false) {
            if(this.props.success === false) {
                Object.keys(this.props.errors).forEach((key, i) => {
                    message.error(this.props.errors[key]);
                });
            }
        }
        if(this.props.success !== prevProps.success && this.props.success && this.props.loading === false) {
            message.success("Profile successfully updated");
        }
        if(this.props.profileData !== prevProps.profileData) {
            this.setState({
                ...this.state,
                general_details: {
                    first_name: this.props.profileData.first_name,
                    middle_name: this.props.profileData.middle_name,
                    last_name: this.props.profileData.last_name,
                    dob: this.props.profileData.dob,
                    gender: this.props.profileData.gender,
                    address_line_a: this.props.profileData.address_line_a,
                    address_line_b: this.props.profileData.address_line_b,
                    phone_a: this.props.profileData.phone_a,
                    phone_b: this.props.profileData.phone_b
                },
                academic_details: {
                    course_type: this.props.profileData.course_type,
                    year_of_study: this.props.profileData.year_of_study,
                    year_of_join: this.props.profileData.year_of_join + '-07',
                    branch: this.props.profileData.branch,
                    roll_number: this.props.profileData.roll_number,
                    cpi: this.props.profileData.cpi
                },
                professional_details: {
                    interests: this.props.profileData.interests,
                    skills: this.props.profileData.skills,
                    cv1: '',
                    cv2: '',
                    cv3: '',
                    current_cv_array: this.props.profileData.cv
                }
            });
        }
    }

    handleTabChange = (activeKey) => {
        this.setState({activeKey});
    };


    handleBasicDetailsSubmit = (values) => {
        this.props.onEditProfile('basic', null, values);
    };

    handleAcademicDetailsFormSubmit = (values) => {
        this.props.onEditProfile('academic', null, values);
    };

    handleProfessionalDetailsFormSubmit = (values) => {
        const { current_cv_array } = this.state.professional_details;
        let cv1_name = current_cv_array[0].link.split('/')[current_cv_array[0].link.split('/').length - 1].split('.')[0];
        let cv2_name = cv1_name.substring(0, cv1_name.length-1) + '1.pdf';
        let cv3_name = cv1_name.substring(0, cv1_name.length-1) + '2.pdf';
        // if(current_cv_array.length > 1) {
        //     cv2_name = current_cv_array[1].link.split('/')[current_cv_array[1].link.split('/').length - 1];
        // }
        // else {
        //     cv2_name = cv1_name.substring(0, cv1_name.length-1) + '1.pdf';
        // }
        // if(current_cv_array.length > 2) {
        //     cv3_name = current_cv_array[2].link.split('/')[current_cv_array[2].link.split('/').length - 1];
        // }
        // else {
        //     cv3_name = cv1_name.substring(0, cv1_name.length-1) + '2.pdf';
        // }
        let filename = [undefined, undefined, undefined];
        let fileindex = [];
        const cvData = new FormData();
        if(values.cv1 && values.cv1.length > 0) {
            filename[0] = cv1_name;
            fileindex.push(0);
            cvData.append('cv', values.cv1[0].originFileObj);
        }
        if(values.cv2 && values.cv2.length > 0) {
            filename[1] = cv2_name;
            fileindex.push(1);
            cvData.append('cv', values.cv2[0].originFileObj);
        }
        if(values.cv3 && values.cv3.length > 0) {
            filename[2]= cv3_name;
            fileindex.push(2);
            cvData.append('cv', values.cv3[0].originFileObj);
        }
        values.headers = {
            filename: filename.join(),
            fileindex: fileindex.join()
        };
        this.props.onEditProfile('professional', cvData, values);
    };

    render() {
        const { general_details, academic_details, professional_details, activeKey} = this.state;
        const {isMobile} = this.props;
        return (
            <Layout>
                <Content
                    style={{
                        margin: 10,
                        padding: 10,
                        backgroundColor: '#fff'
                    }}
                    >
                    <Tabs defaultActiveKey={activeKey ? activeKey : "1" } tabPosition={isMobile ? "top" :"left"} onChange={this.handleTabChange}>
                        <TabPane tab="Basic" key="1" style={{backgroundColor: '#fff', margin: 15, padding: 10}}>
                            <Spin spinning={this.props.loading} tip="Processing..">
                                <Row type='flex' justify='start' style={{margin: 24}}>
                                    <Col xs={24} sm={18} md={14} lg={14} xl={12} xxl={8}>
                                        <BasicDetailsForm {...general_details} onSubmit={this.handleBasicDetailsSubmit} />
                                    </Col>
                                </Row>
                            </Spin>
                        </TabPane>
                        <TabPane tab="Academic" key="2" style={{backgroundColor: '#fff', margin: -15, padding: 10}}>
                            <Spin spinning={this.props.loading} tip="Processing..">
                                <Row type='flex' justify='start' style={{margin: 24}}>
                                    <Col xs={24} sm={18} md={12} lg={12} xl={12} xxl={8}>
                                        <AcademicDetailsForm {...academic_details} onSubmit={this.handleAcademicDetailsFormSubmit} />
                                    </Col>
                                </Row>
                            </Spin>
                        </TabPane>
                        <TabPane tab="Professional" key="3" style={{backgroundColor: '#fff', margin: 15, padding: 10}}>
                            <Spin spinning={this.props.loading} tip="Processing..">
                                <Row type='flex' justify='start' style={{margin: 24}}>
                                    <Col xs={24} sm={18} md={12} lg={12} xl={12} xxl={8}>
                                        <ProfessionalDetailsForm {...professional_details} onSubmit={this.handleProfessionalDetailsFormSubmit} />
                                    </Col>
                                </Row>
                            </Spin>
                        </TabPane>
                    </Tabs>
                </Content>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    profileData: state.profile.profileData,
    profileExists: state.profile.profileExists,
    loading: state.profile.loading.edit,
    errors: state.profile.errors,
    success: state.profile.success
});

const mapDispatchToProps = dispatch => {
    return {
        onEditProfile: (type, cvData, inputData) => dispatch(actionCreators.editStudentProfile(type, cvData, inputData))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfile));
