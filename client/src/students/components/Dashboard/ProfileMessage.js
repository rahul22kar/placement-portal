import React, {Component} from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import {Layout, Result, Button} from 'antd';

const {Content} = Layout;

class ProfileMessage extends Component {
    render() {
        let profileMessage = null;
        const {profileExists, approval_status, active_status} = this.props;
        if (profileExists) {
            if (approval_status === -1) {
                profileMessage = (
                    <Content
                        style={{
                            margin: "6px",
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
                            margin: "6px",
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
                                    <NavLink to="/student/profile/edit">
                                        Edit Profile
                                    </NavLink>
                                </Button>
                            }
                        />
                    </Content>
                );
            }
        } else if (!active_status){
            profileMessage = (
                <Content
                    style={{
                        margin: "6px",
                        padding: 24,
                        background: "#fff"
                    }}
                >
                    <Result
                        status="error"
                        title="Disabled"
                        subTitle="Your profile is disbaled by admin"
                    />
                </Content>
            );
        } else {
            profileMessage = (
                <Content
                    style={{
                        margin: "6px",
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
                                <NavLink to="/student/profile/create">
                                    Create Profile
                                </NavLink>
                            </Button>
                        }
                    />
                </Content>
            );
        }

        return (
            <div>
                {profileMessage}
            </div>
        );
    }
}

export default withRouter(ProfileMessage);
