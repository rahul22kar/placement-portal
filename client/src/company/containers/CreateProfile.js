import React, { Component } from 'react'
import {Row, Col, Typography, Layout, message} from 'antd'
import {withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import * as actionCreators from '../../redux/actions/index';

import CompanyDetailsForm from '../components/Dashboard/Forms/CompanyDetails'

const {Content} = Layout;

class CreateProfile extends Component {
    handleSubmit = (values) => {
        const logoData = new FormData();
        logoData.append('logo', values.logo_data[0].originFileObj);

        var contact_details = [];
        for (var i = 0; i < values.contact_designation.length; i++) {
            contact_details[i] = {
                designation: values.contact_designation[i],
                email: values.contact_email[i],
                phone: values.contact_number[i]
            }
        }
        values.contact_details = contact_details;

        this.props.onCreateProfile(logoData, values)
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
            message.success("Profile created successfully");
        }
    }

    render(){
        if(this.props.profileExists) {
            return (<Redirect to="/company/dashboard" />);
        }
        return(
            <Layout>
                <Content
                    style={{background: '#fff', margin: 10}}
                    >
                    <Row type= 'flex' justify='center' style={{margin: 10}}>
                        <Typography.Title>
                            Create Profile
                        </Typography.Title>
                    </Row>
                    <Row type= 'flex' justify='center'>
                        <Col md={12} xs={22} sm={22}>
                            <CompanyDetailsForm handleSubmit={this.handleSubmit}/>
                        </Col>
                    </Row>
                </Content>
            </Layout>

        )
    }
}
const mapStateToProps = (state) => ({
    loading: state.company_profile.loading,
    profileExists: state.company_profile.profileExists,
    success: state.company_profile.success
});

const mapDispatchToProps = dispatch => {
    return {
        onCreateProfile: (logoData, inputData) => dispatch(actionCreators.createCompanyProfile(logoData, inputData))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateProfile))
