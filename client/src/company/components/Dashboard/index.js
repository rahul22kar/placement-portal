import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Layout, Row, Col} from 'antd';

import ProfileMessage from './ProfileMessage'
import Stats from "../../../admin/components/Dashboard/Stats";

const {Content} = Layout;

class Main extends Component {

    render(){

        const {
            loading,
            approval_status,
            profileExists,
            profileData,
            onEditVisible
        } = this.props;

        const profileMessageProps = {
            loading,
            onEditVisible,
            profileData,
            approval_status,
            profileExists
        };

        const colors = ["#1976D2", "#212121", "#03A9F4", "#512DA8", "#D32F2F", "#C2185B", "#7B1FA2", "#00796B", "#303F9F", "#5D4037", "#616161", "#FFA000"];
        const Title = ["Active Jobs", "Students Applied", "Pending Interviews", "Selected Students", "Applications", "Registered Students", "Awaiting Response"];
        const Numbers = [3, 70, 30, 10, 65, 121, 20, 5];

        const statValues = Title.map((title, i) => (
            [title, colors[i], Numbers[i]]
        ));

        const Cards = () =>
            statValues.map(data => (
                <Stats Color={data[1]} Title={data[0]} Number={data[2]} key={data[1]}/>
            ));

        let dashboard = null;
        if (approval_status === 1 && profileExists) {
            dashboard = (
                <>
                <Row type="flex" justify="center">
                    <Col span={24}>
                        <ProfileMessage {...profileMessageProps}/>
                    </Col>
                </Row>
                </>
            )
        } else {
            if (!loading){
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
                                    height: '50vh'
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

               {profileExists ? <Content
                    style={{
                        background: "#fff",
                        margin: 10
                    }}
                >
                    <Row style={{background: "#f0f2f5"}} gutter={[16,24]} align={'middle'}>
                        <Cards/>
                    </Row>
                </Content> : null}
            </Layout>
        );
    }
}

export default withRouter(Main)
