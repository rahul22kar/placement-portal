import React, {Component} from 'react';
import {Layout, Spin, Row} from 'antd';

import Stats from "./Stats";
const {Content} = Layout;

class Main extends Component {

    componentDidMount() {
        this.props.onFetchProfiles()
    }

    render() {

        const statsProps = {
            studentProfiles: this.props.studentProfiles,
            isMobile: this.props.isMobile
        };

        const colors = ["#1976D2", "#212121", "#03A9F4", "#512DA8", "#D32F2F", "#C2185B", "#7B1FA2", "#00796B", "#303F9F", "#5D4037", "#616161", "#FFA000"];
        const Title = ["Students Placed", "Companies", "Pending Interviews", "Applications", "Registered Students", "Awaiting Response", "To-Do"];
        const Numbers = [91, 52, 20, 120, 150, 12, 5];

        const statValues = Title.map((title, i) => (
            [title, colors[i], Numbers[i]]
        ));

        const Cards = () =>
            statValues.map(data => (
                <Stats Color={data[1]} Title={data[0]} Number={data[2]}/>
            ));

        return (
            <Layout>
                <Content
                    style={{
                        background: "#fff",
                        margin: 10
                    }}
                >
                    <Row style={{background: "#f0f2f5"}} gutter={[16,24]} align={'middle'}>
                        <Cards/>
                    </Row>
                </Content>
            </Layout>
        );
    }
}

export default Main;
