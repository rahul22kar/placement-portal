import React, {Component} from 'react'
import {Row, Col, Button, Table, Typography, Tag, Drawer, Divider, Avatar, Tabs, Empty, Descriptions} from 'antd'
import {NavLink, withRouter} from 'react-router-dom'
import * as commonConstants from '../../../utils/Constants'
import Experience from "../../components/StudentProfile/Experience";
import Project from "../../components/StudentProfile/Projects";

const {TabPane} = Tabs;

const DescriptionItem = ({ title, content }) => (
    <div
        style={{
          fontSize: 14,
          lineHeight: '22px',
          marginBottom: 7,
          color: 'rgba(0,0,0,0.65)',
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
            }}
            >
            {title}:
        </p>
        {content}
    </div>
);

class StudentProfile extends Component{

    state={
        visible: false,
        index: 0
    };

    handleDetails = (id) => {
        let index = this.props.studentProfiles.map(profile => profile._id).indexOf(id)
        this.setState({
            visible: true,
            index
        })
    };

    onClose = () => {
        this.setState({
            visible: false
        })
    };

    render(){
        const {isMobile, studentProfiles, loading} = this.props;
        const columns = [
            {
                title: "Student Name",
                dataIndex: 'first_name',
                key: "name",
                fixed: 'left',
                align: 'center',
                width: 200,
                render : (text, row) =>
                    text + " " +row.last_name

            },
            {
                title: "CPI",
                dataIndex: 'cpi',
                key: 'cpi',
                align: 'center',
            },
            {
                title: "Year of study",
                dataIndex: 'year_of_study',
                key: 'year_of_study',
                align: 'center',
            },
            {
                title: "Interests",
                dataIndex: 'interests',
                key: 'interests',
                align: 'center',
                width: 300,
                render: interests =>
                    interests.map((tag) => <Tag color='blue' key={tag} style={{margin: 5}}>{tag}</Tag>)
            },
            {
                title: "Skills",
                dataIndex: 'skills',
                key: 'skills',
                align: 'center',
                width: 300,
                render: skills =>
                    skills.map((tag) => <Tag color='blue' key={tag} style={{margin: 5}}>{tag}</Tag>)
            },
            {
                title: "More details",
                dataIndex: '_id',
                key: 'id',
                align: 'center',
                fixed: 'right',
                width: 150,
                render: (id) =>
                    <Button
                        type = 'primary '
                        onClick = {() => this.handleDetails(id)}
                        size = "large"
                        shape = "circle"
                        icon = "info-circle"
                        />
            },

        ];
        const tableProps = {
            columns,
            dataSource: studentProfiles,
            loading,
            rowKey: '_id',
            scroll: {x: 900},
            bordered: true
        };

        return(
            <div>
                {typeof studentProfiles  !== 'undefined' ?
                    <Drawer
                    width={isMobile ? '100vw' : '40vw'}
                    placement="right"
                    onClose={this.onClose}
                    visible={this.state.visible}
                    >
                    <Row type="flex" justify="center">
                        <p style={{marginBottom: 24, fontSize: 24}}>Student Profile</p>
                    </Row>
                    <Row type='flex' justify='center'>
                        <Col>
                            <Row type="flex" justify='center' style={{margin: 10}}>
                                <Avatar src={studentProfiles[this.state.index].avatar_link} size={64}/>
                            </Row>
                            <Row type="flex" justify='center'>
                                <Typography.Title level={4}>
                                    {studentProfiles[this.state.index].first_name} {studentProfiles[this.state.index].last_name}
                                </Typography.Title>
                            </Row>
                        </Col>
                    </Row>
                    <Row type='flex' justify='center' style={{textAlign: 'center'}}>
                        <Typography.Text type='secondary'>
                            {commonConstants.yearToTextMap[studentProfiles[this.state.index].year_of_study] + " "}
                            {commonConstants.courseToTextMap[studentProfiles[this.state.index].course_type]}
                            <br/>
                            {commonConstants.branchToTextMap[studentProfiles[this.state.index].branch]}
                        </Typography.Text>
                    </Row>
                    <Divider/>
                    <div
                        style={{
                            margin: "12px",
                            padding: 24,
                            background: "#fff"
                        }}
                    >
                        <DescriptionItem title="CPI" content={studentProfiles[this.state.index].cpi}/>

                        <DescriptionItem title="CV Link" content={<a href={studentProfiles[this.state.index].cv[0].link} target={'_blank'}>Click Here</a>}/>

                        <DescriptionItem title="Skills" content={studentProfiles[this.state.index].skills.map((tag) =>
                                <Tag color='blue' key={tag} style={{margin: 5}}>{tag}</Tag>)}/>

                        <DescriptionItem title="Interests" content={studentProfiles[this.state.index].interests.map((interest) =>
                                <Tag color='blue' key={interest} style={{margin: 5}}>{interest}</Tag>)}/>

                    </div>
                    <Divider/>
                        <div
                            style={{
                                margin: "12px",
                                padding: 24,
                                background: "#fff"
                            }}
                        >
                            <Tabs defaultActivity="1">
                                <TabPane tab="Experience" key="1">
                                    {studentProfiles[this.state.index]["experience"].length > 0 ?
                                        <Experience data={studentProfiles[this.state.index]["experience"]} loading={false}/> :
                                        <Empty description={false}/>
                                    }
                                </TabPane>
                                <TabPane tab="Projects" key="2">
                                    {studentProfiles[this.state.index]["projects"].length > 0 ?
                                        <Project data={studentProfiles[this.state.index]["projects"]} loading={false}/> :
                                        <Empty description={false}/>
                                    }
                                </TabPane>
                            </Tabs>
                        </div>
                    </Drawer> :
                    null
                }
                <Row type='flex' justify='center' style={{margin: 24}}>
                    <Typography.Title>
                        Student Profiles
                    </Typography.Title>
                </Row>
                <Row type='flex' justify='center'>
                    <Col md={23} xs={24} sm={24}>
                        <Table {...tableProps}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(StudentProfile);
