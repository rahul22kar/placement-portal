import React, {Component} from 'react';
import ConfigurePortalTable from "../../components/Students/ConfigurePortal";
import {Layout, Row, Col, Spin, Typography} from "antd";

const {Content} = Layout;

class ConfigurePortal extends Component {
    render() {

        const data = [
            {
                key: 0,
                open: true,
                batch: "1",
                deadline: "27-10-2019"
            },
            {
                key: 1,
                open: false,
                batch: "2",
                deadline: null
            },
            {
                key: 2,
                open: false,
                batch: "3",
                deadline: null
            },
            {
                key: 3,
                open: true,
                batch: "4",
                deadline: null
            }
        ];

        return (
            <Layout>
                <Spin spinning={false} tip="Loading...">
                    <Content
                        style={{
                            background: '#fff',
                            margin: 10,
                            padding: 10
                        }}
                    >
                        <Row type='flex' justify='center' style={{margin: 10}}>
                            <Typography.Title>
                                Configure Portal
                            </Typography.Title>
                        </Row>
                        <Row type={'flex'} justify={"center"}>
                            <Col xs={24} sm={24} md={18} lg={12} xl={12} xxl={10}>
                                <ConfigurePortalTable data={data}/>
                            </Col>
                        </Row>
                    </Content>
                </Spin>
            </Layout>
        );
    }
}

export default ConfigurePortal;