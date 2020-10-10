import React, {Component} from 'react';
import {withRouter, NavLink} from 'react-router-dom';

import {Layout, Row, Col, Empty, Button, Tabs} from 'antd';

import Experience from "./Experience"
import Project from "./Project"
import ProfileMessage from "./ProfileMessage"
import Profile from "./Profile"

import * as commonConstants from "../../../utils/Constants";

const {Content} = Layout;
const {TabPane} = Tabs;

class Main extends Component {

    render() {
        let dashboard = null;
        const {
            loading,
            approval_status,
            profileData,
            profileExists,
            handleRemoveExperience,
            handleRemoveProject,
            onEditProject,
            onEditExperience,
            active_status,
        } = this.props;

        const profileProps = {
            profileData,
            commonConstants,
            loading: loading.profile
        };

        const profileMessageProps = {
            approval_status,
            profileExists,
            active_status
        };

        const experienceProps = {
            onEditExperience,
            handleRemoveExperience,
            loading: loading.tabs,
            data: profileData["experience"]
        };

        const projectProps = {
            onEditProject,
            handleRemoveProject,
            loading: loading.tabs,
            data: profileData["projects"]
        };

        if (approval_status === 1 && profileExists && active_status) {
            dashboard = (
                <Row type="flex" justify="center">
                    <Col md={8} xs={24} sm={24}>
                        <Profile {...profileProps}/>
                    </Col>
                    <Col md={16} xs={24} sm={24}>
                        <Content
                            style={{
                                margin: "12px",
                                padding: 24,
                                background: "#fff"
                            }}
                            >
                            <Tabs defaultActivity="1">
                                <TabPane tab="Experience" key="1">
                                    {experienceProps.data.length > 0 ?
                                        <Experience {...experienceProps}/> :
                                        <Empty>
                                            <Button type="primary"><NavLink to="/student/profile/add_experience">Add Experience</NavLink></Button>
                                        </Empty>
                                    }
                                </TabPane>
                                <TabPane tab="Projects" key="2">
                                    {projectProps.data.length > 0 ?
                                        <Project {...projectProps} /> :
                                        <Empty>
                                            <Button type="primary"><NavLink to="/student/profile/add_project">Add Project</NavLink></Button>
                                        </Empty>
                                    }
                                </TabPane>
                            </Tabs>
                        </Content>
                    </Col>
                </Row>
            );
        } else {
            if (!loading.page){
                dashboard = (
                    <Row type="flex" justify="center">
                        <Col span={24}>
                            <ProfileMessage {...profileMessageProps}/>
                        </Col>
                    </Row>
                )
            } else {
                dashboard = (
                    <Row type="flex" justify="center">
                        <Col span={24}>
                            <Content
                                style={{
                                    margin: "6px",
                                    padding: 24,
                                    background: "#fff",
                                    height: '80vh'
                                }}
                            >
                            </Content>
                        </Col>
                    </Row>
                )
            }
        }

        return (
            <Layout>
                <Content>
                    {dashboard}
                </Content>
            </Layout>
        );
    }
}

export default withRouter(Main);
