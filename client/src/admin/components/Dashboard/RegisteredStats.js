import React, {Component} from 'react';
import {Tabs, Row, Col, Typography} from 'antd';
import { Chart, Tooltip, Axis, Legend, Coord, Pie } from 'viser-react';

const {TabPane} = Tabs;

class RegisteredStats extends Component {
    render() {

        const {
            studentProfiles,
            isMobile
        } = this.props;

        const btechData = studentProfiles.filter((student) => student.course_type === 'BTech');

        const mtechData = studentProfiles.filter((student) => student.course_type === 'MTech');

        const btechFirst= [
            { item: isMobile ? 'CSE' : "Computer Science", count: btechData.filter((student) => student.branch === 'cse' && student.year_of_study === "1").length},
            { item: isMobile ? 'EE' : "Electrical Engineering", count: btechData.filter((student) => student.branch === 'ee' && student.year_of_study === "1").length },
            { item: isMobile ? 'ME' : "Mechanical Engineering", count: btechData.filter((student) => student.branch === 'me' && student.year_of_study === "1").length },
            { item: isMobile ? 'MnC' : "Mathematics & Computing", count: btechData.filter((student) => student.branch === 'mc' && student.year_of_study === "1").length}
        ];

        const btechSecond= [
            { item: isMobile ? 'CSE' : "Computer Science", count: btechData.filter((student) => student.branch === 'cse' && student.year_of_study === "2").length},
            { item: isMobile ? 'EE' : "Electrical Engineering", count: btechData.filter((student) => student.branch === 'ee' && student.year_of_study === "2").length },
            { item: isMobile ? 'ME' : "Mechanical Engineering", count: btechData.filter((student) => student.branch === 'me' && student.year_of_study === "2").length },
            { item: isMobile ? 'MnC' : "Mathematics & Computing", count: btechData.filter((student) => student.branch === 'mc' && student.year_of_study === "2").length}
        ];

        const btechThird= [
            { item: isMobile ? 'CSE' : "Computer Science", count: btechData.filter((student) => student.branch === 'cse' && student.year_of_study === "3").length},
            { item: isMobile ? 'EE' : "Electrical Engineering", count: btechData.filter((student) => student.branch === 'ee' && student.year_of_study === "3").length },
            { item: isMobile ? 'ME' : "Mechanical Engineering", count: btechData.filter((student) => student.branch === 'me' && student.year_of_study === "3").length },
            { item: isMobile ? 'MnC' : "Mathematics & Computing", count: btechData.filter((student) => student.branch === 'mc' && student.year_of_study === "3").length}
        ];

        const btechFourth= [
            { item: isMobile ? 'CSE' : "Computer Science", count: btechData.filter((student) => student.branch === 'cse' && student.year_of_study === "4").length},
            { item: isMobile ? 'EE' : "Electrical Engineering", count: btechData.filter((student) => student.branch === 'ee' && student.year_of_study === "4").length },
            { item: isMobile ? 'ME' : "Mechanical Engineering", count: btechData.filter((student) => student.branch === 'me' && student.year_of_study === "4").length },
            { item: isMobile ? 'MnC' : "Mathematics & Computing", count: btechData.filter((student) => student.branch === 'mc' && student.year_of_study === "4").length}
        ];

        const mtechFirst= [
            { item: isMobile ? 'CSE' : "Computer Science", count: mtechData.filter((student) => student.branch === 'cse' && student.year_of_study === "1").length},
            { item: isMobile ? 'EE' : "Electrical Engineering", count: mtechData.filter((student) => student.branch === 'ee' && student.year_of_study === "1").length },
            { item: isMobile ? 'ME' : "Mechanical Engineering", count: mtechData.filter((student) => student.branch === 'me' && student.year_of_study === "1").length },
            { item: isMobile ? 'MnC' : "Mathematics & Computing", count: mtechData.filter((student) => student.branch === 'mc' && student.year_of_study === "1").length}
        ];

        const mtechSecond= [
            { item: isMobile ? 'CSE' : "Computer Science", count: mtechData.filter((student) => student.branch === 'cse' && student.year_of_study === "2").length},
            { item: isMobile ? 'EE' : "Electrical Engineering", count: mtechData.filter((student) => student.branch === 'ee' && student.year_of_study === "2").length },
            { item: isMobile ? 'ME' : "Mechanical Engineering", count: mtechData.filter((student) => student.branch === 'me' && student.year_of_study === "2").length },
            { item: isMobile ? 'MnC' : "Mathematics & Computing", count: mtechData.filter((student) => student.branch === 'mc' && student.year_of_study === "2").length}
        ];

        return (
            <div style={{margin: 10}}>
                <Typography.Title level={3} style={{margin: 10}}>
                    Students Registered
                </Typography.Title>
                <Tabs defaultActiveKey={'1'} style={{margin: 10}}>
                    <TabPane tab={"BTech"} key={'1'}>
                        <Row type={'flex'} justify={'space-between'} style={{margin: 20}}>
                            <Col xl={12} md={24} xs={24} lg={24}>
                                <Typography.Title level={4}>
                                    First Year
                                </Typography.Title>
                                <Chart height={isMobile ? 300 : 300} width={isMobile ? 250 : 500} data={btechFirst} fitview={'cc'}>
                                    <Tooltip showTitle={false} />
                                    <Axis/>
                                    <Legend dataKey="item" />
                                    <Coord type="theta" radius={0.75} innerRadius={0} />
                                    <Pie position="count" color="item" style={{ stroke: '#fff', lineWidth: 1 }}
                                         label={['count', {
                                             formatter: (val, item) => {
                                                 return item.point.item + ': ' + val;
                                             }
                                         }]}
                                    />
                                </Chart>
                            </Col>
                            <Col xl={12} md={24} xs={24} lg={24}>
                                <Typography.Title level={4}>
                                    Second Year
                                </Typography.Title>
                                <Chart height={isMobile ? 300 : 300} width={isMobile ? 250 : 500} data={btechSecond}>
                                    <Tooltip showTitle={false} />
                                    <Axis/>
                                    <Legend dataKey="item" />
                                    <Coord type="theta" radius={0.75} innerRadius={0} />
                                    <Pie position="count" color="item" style={{ stroke: '#fff', lineWidth: 1 }}
                                         label={['count', {
                                             formatter: (val, item) => {
                                                 return item.point.item + ': ' + val;
                                             }
                                         }]}
                                    />
                                </Chart>
                            </Col>
                            <Col xl={12} md={24} xs={24} lg={24}>
                                <Typography.Title level={4}>
                                    Third Year
                                </Typography.Title>
                                <Chart height={isMobile ? 300 : 300} width={isMobile ? 250 : 500} data={btechThird}>
                                    <Tooltip showTitle={false} />
                                    <Axis/>
                                    <Legend dataKey="item" />
                                    <Coord type="theta" radius={0.75} innerRadius={0} />
                                    <Pie position="count" color="item" style={{ stroke: '#fff', lineWidth: 1 }}
                                         label={['count', {
                                             formatter: (val, item) => {
                                                 return item.point.item + ': ' + val;
                                             }
                                         }]}
                                    />
                                </Chart>
                            </Col>
                            <Col xl={12} md={24} xs={24} lg={24}>
                                <Typography.Title level={4}>
                                    Fourth Year
                                </Typography.Title>
                                <Chart height={isMobile ? 300 : 300} width={isMobile ? 250 : 500} data={btechFourth}>
                                    <Tooltip showTitle={false} />
                                    <Axis/>
                                    <Legend dataKey="item" />
                                    <Coord type="theta" radius={0.75} innerRadius={0} />
                                    <Pie position="count" color="item" style={{ stroke: '#fff', lineWidth: 1 }}
                                         label={['count', {
                                             formatter: (val, item) => {
                                                 return item.point.item + ': ' + val;
                                             }
                                         }]}
                                    />
                                </Chart>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={"MTech"} key={"2"}>
                        <Row type={'flex'} justify={'space-between'} style={{margin: 20}}>
                            <Col xl={12} md={24} xs={24} lg={24}>
                                <Typography.Title level={4}>
                                    First Year
                                </Typography.Title>
                                <Chart height={isMobile ? 300 : 300} width={isMobile ? 250 : 500} data={mtechFirst}>
                                    <Tooltip showTitle={false} />
                                    <Axis/>
                                    <Legend dataKey="item" />
                                    <Coord type="theta" radius={0.75} innerRadius={0} />
                                    <Pie position="count" color="item" style={{ stroke: '#fff', lineWidth: 1 }}
                                         label={['count', {
                                             formatter: (val, item) => {
                                                 return item.point.item + ': ' + val;
                                             }
                                         }]}
                                    />
                                </Chart>
                            </Col>
                            <Col xl={12} md={24} xs={24} lg={24}>
                                <Typography.Title level={4}>
                                    Second Year
                                </Typography.Title>
                                <Chart height={isMobile ? 300 : 300} width={isMobile ? 250 : 500} data={mtechSecond}>
                                    <Tooltip showTitle={false} />
                                    <Axis/>
                                    <Legend dataKey="item" />
                                    <Coord type="theta" radius={0.75} innerRadius={0} />
                                    <Pie position="count" color="item" style={{ stroke: '#fff', lineWidth: 1 }}
                                         label={['count', {
                                             formatter: (val, item) => {
                                                 return item.point.item + ': ' + val;
                                             }
                                         }]}
                                    />
                                </Chart>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default RegisteredStats;


