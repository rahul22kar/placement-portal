import React, {Component} from 'react';
import { Layout, Typography, Table } from 'antd';

const {Content} = Layout;

class ContactDetails extends Component {
    render() {
        const placementOffice = [
            {
                key: '1',
                name: 'Mr. Rahul Bahadur',
                email: 'placements@iitgoa.ac.in',
                phone: '+91-9920085577'
            },
            {
                key: '2',
                name: 'Dr. Sudhakar Yogaraj',
                email: 'sudhakar@iitgoa.ac.in',
                phone: '-'
            }
        ];
        const facultyCoordinators = [
            {
                key: '1',
                name: 'Dr. Sreejith AV',
                dept: 'Computer Science and Engineering',
                email: 'sreejithav@iitgoa.ac.in'
            },
            {
                key: '2',
                name: 'Dr. Sashidhar Sampathirao',
                dept: 'Electrical Engineering',
                email: 'ssd@iitgoa.ac.in'
            },
            {
                key: '3',
                name: 'Dr. Harpreet Singh',
                dept: 'Mechanical Engineering',
                email: 'harpreet@iitgoa.ac.in'
            }
        ];
        const studentCoordinators = [
            {
                key: '1',
                name: 'Himali Goel',
                dept: 'Computer Science and Engineering',
                email: 'himali.goel.16001@iitgoa.ac.in'
            },
            {
                key: '2',
                name: 'Jarnu Girdhar',
                dept: 'Electrical Engineering',
                email: 'jarnu.girdhar.16002@iitgoa.ac.in'
            },
            {
                key: '3',
                name: 'Monish Lokhande',
                dept: 'Mechanical Engineering',
                email: 'monish.lokhande.16003@iitgoa.ac.in'
            },
            {
                key: '4',
                name: 'Raj Hansini Kohiwal',
                dept: 'Computer Science and Engineering',
                email: 'raj.kohiwal.17001@iitgoa.ac.in'
            },
            {
                key: '5',
                name: 'Prasoon Vishwakarma',
                dept: 'Electrical Engineering',
                email: 'prasoon.vishwakarma.17003@iitgoa.ac.in'
            },
            {
                key: '6',
                name: 'Piyush Singh',
                dept: 'Mechanical Engineering',
                email: 'piyush.singh.17003@iitgoa.ac.in'
            }
        ];
        const officeColumns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: 'Phone',
                dataIndex: 'phone',
                key: 'phone'
            }
        ];
        const commonColumns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Department',
                dataIndex: 'dept',
                key: 'dept'
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email'
            }
        ];
        return (
            <Content
                style={{
                    margin: 10,
                    padding: 24,
                    background: "#fff"
                }}
            >
                <Typography.Title level={3} style={{margin: 20}}>
                    Placement Office
                </Typography.Title>
                <Table dataSource={placementOffice} columns={officeColumns} pagination={false} scroll={{x: 1200}} bordered/>
                <Typography.Title level={3} style={{margin: 20}}>
                    Faculty Coordinators
                </Typography.Title>
                <Table dataSource={facultyCoordinators} columns={commonColumns} pagination={false} scroll={{x: 1200}} bordered/>
                <Typography.Title level={3} style={{margin: 20}}>
                    Student Coordinators
                </Typography.Title>
                <Table dataSource={studentCoordinators} columns={commonColumns} pagination={false} scroll={{x: 1200}} bordered/>
            </Content>
        );
    }
}

export default ContactDetails;