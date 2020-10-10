import React, { Component } from 'react'
import { Row, Typography, Spin, Drawer} from 'antd'
import {withRouter} from 'react-router-dom'

import CompanyDetailsForm from '../../components/Dashboard/Forms/CompanyDetails'

class EditProfile extends Component {

    handleSubmit = (values) => {
        var logoData = null;
        if (values.logo_data[0].originFileObj){
            logoData = new FormData();
            logoData.append('logo', values.logo_data[0].originFileObj)
        } else {
            logoData = null;
            values.logo_link = this.props.profileData.logo_link
        }

        var contact_details = [];
        for (var i = 0; i < values.contact_designation.length; i++) {
            contact_details[i] = {
                designation: values.contact_designation[i],
                email: values.contact_email[i],
                phone: values.contact_number[i]
            }
        }
        values.contact_details = contact_details;

        this.props.onEditProfile(logoData, values)
    };

    render(){

        const {
            onClose,
            editVisible,
            loading,
            profileData,
            isMobile
        } = this.props

        let contact_designation = []
        let contact_email = []
        let contact_number = []

        for (var i = 0; i < profileData.contact_details.length; i++) {
            contact_designation[i] = profileData.contact_details[i].designation
            contact_email[i] = profileData.contact_details[i].email
            contact_number[i] = profileData.contact_details[i].phone
        }

        const fileList = [
            {
                uid: '1',
                name: "Logo.jpeg",
                status: 'done',
                url: profileData.logo_link,
                thumbUrl: profileData.logo_link
            }
        ]

        const fieldsValues = {
            ...profileData,
            contact_email,
            contact_number,
            contact_designation,
            fileList
        }

        return(
            <Drawer
                visible={editVisible}
                onClose={onClose}
                placement='right'
                width={isMobile ? '100vw' : '40vw'}
                >
                <Spin spinning = {loading} tip="Submitting profile ...">
                    <Row type= 'flex' justify='center'>
                        <Typography.Title>
                            Edit Profile
                        </Typography.Title>
                    </Row>
                    <Row type= 'flex' justify='center' style={{background: '#fff'}}>
                        <CompanyDetailsForm {...fieldsValues} handleSubmit={this.handleSubmit}/>
                    </Row>
                </Spin>
            </Drawer>
        )
    }
}

export default withRouter(EditProfile)
