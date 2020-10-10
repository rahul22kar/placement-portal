import React, {Component} from 'react'
import { Row, Col, Icon, Button, Table, Typography} from 'antd'
import {withRouter} from 'react-router-dom'

class ManageJob extends Component{
    render(){
        const columns = [
            {
                title: "Job Headline",
                dataIndex: 'job_headline',
                key: "job_headline",
                fixed: 'left',
                align: 'center',
                width: 200
            },
            {
                title: 'Admin Approval',
                dataIndex: 'approval_status',
                align: 'center',
                render: status =>
                <Icon
                    {...(status === 1 ? {type: 'check-circle', theme: 'filled', style: {color: '#4bb543', fontSize: 20}} : (status === -1 ? {type: 'clock-circle', theme: 'filled', style: {color: '#1565C0', fontSize: 20}} : {type: 'close-circle', theme: 'filled', style: {color: '#f44336', fontSize: 20}} ))}
                />
            },
            {
                title: "Student Applications",
                key: 'student_applications',
                dataIndex: '_id',
                align: 'center',
                render: id =>
                    <Row type = 'flex' align = 'middle' justify = 'center'>
                        <Col style = {{margin: "0 10px"}}>
                            <Button type="primary" onClick={() => this.props.handleList(id)}>List</Button>
                        </Col>
                    </Row>

            },
            {
                title: "Actions",
                key: "actions",
                dataIndex: '_id',
                fixed: 'right',
                align: 'center',
                width: 200,
                render: id =>
                    <Row type = 'flex' align = 'middle' justify = 'center'>
                        <Col style = {{margin: "0 10px"}}>
                            <Button type = 'primary' onClick = {() => this.props.handleEditJob(id)} shape = "circle" icon = "edit"></Button>
                        </Col>
                        <Col style = {{margin: "0 10px"}}>
                            <Button type = 'danger ' onClick = {() => this.props.handleDeleteJob(id)} shape = "circle" icon = "close-circle"></Button>
                        </Col>
                    </Row>
            },

        ];
        return(
            <div>
                <Row type='flex' justify='center' style={{margin: 24}}>
                    <Typography.Title>
                        Manage Jobs
                    </Typography.Title>
                </Row>
                <Row type='flex' justify='center' style={{marginBottom: 40}}>
                    <Col md={14} xs={24} sm={24}>
                        <Table columns={columns} dataSource={this.props.jobProfiles} rowKey = "_id" scroll={{x: 700}} bordered loading={this.props.loading}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(ManageJob);
