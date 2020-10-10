import React, {Component} from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import {Layout, Row, Col, Result, Button, Descriptions, Spin, Typography} from 'antd';
import Logo from '../../../assets/images/Logo.png';

const {Content} = Layout;

class Main extends Component {

    render(){
        let profileMessage = null;

        const {
            profileExists,
            approval_status,
            onEditVisible,
            loading,
            profileData
        } = this.props;

        if (profileExists) {
            if (approval_status === -1) {
                profileMessage = (
                    <Content
                        style={{
                            margin: 10,
                            padding: 24,
                            background: "#fff"
                        }}
                    >
                        <Result
                            status="info"
                            title="Awaiting Approval"
                            subTitle="Your profile is yet to be approved by admin"
                        />
                    </Content>
                );
            } else if (approval_status === 0) {
                profileMessage = (
                    <Content
                        style={{
                            margin: 10,
                            padding: 24,
                            background: "#fff"
                        }}
                    >
                        <Result
                            status="error"
                            title="Disapproved"
                            subTitle="Your profile is disapproved by admin"
                            extra={
                                <Button type="primary">
                                    <NavLink to="/company/profile/edit">
                                        Edit Profile
                                    </NavLink>
                                </Button>
                            }
                        />
                    </Content>
                );
            } else if(approval_status === 1) {
                profileMessage = (
                    <Content
                        style={{
                            margin: 10,
                            padding: 24,
                            background: "#fff"
                        }}
                    >
                    <Row type='flex' justify='space-between' style={{margin: 20}}>
                        <Col>
                            <img src={Logo} alt={"IIT Goa Logo"} width={'200px'}/>
                        </Col>
                        <Col style={{textAlign: 'center'}}>
                            <Typography.Title level={2} style={{marginTop: 60}}>
                                IIT Goa <br/> Training and Placement Cell
                            </Typography.Title>
                        </Col>
                        <Col>
                            <img src={profileData.logo_link} alt="Logo" width='200px'/>
                        </Col>
                    </Row>
                    </Content>
                );
            }
        } else {
            profileMessage = (
                <Content
                    style={{
                        margin: 10,
                        padding: 24,
                        background: "#fff"
                    }}
                >
                    <Result
                        status="warning"
                        title="Create Profile"
                        subTitle="You need to create profile before you can perform any action."
                        extra={
                            <Button type="primary">
                                <NavLink to="/company/profile/create">
                                    Create Profile
                                </NavLink>
                            </Button>
                        }
                    />
                </Content>
            );
        }
        return (
            <Layout>
                <Spin spinning={loading} tip="Loading ...">
                    <Row type="flex" justify="center">
                        <Col span={24}>
                            {profileMessage}
                        </Col>
                    </Row>
                </Spin>
            </Layout>
        );
    }
}

export default withRouter(Main)
