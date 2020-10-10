import React, {Component} from 'react';
import moment from "moment";
import {Button, Col, Icon, Row, Table} from "antd";
import JobDetailsModal from "./JobDetailsModal";

class ManageApplicationsTable extends Component {

    state = {
        id: '',
        modalVisible: false
    };

    handleOk = () => {
        // this.props.applyJob(this.state.id);
        this.setState({modalVisible: false});
        console.log("applied");
    };

    handleCancel = () => {
        this.setState({modalVisible: false})
    };

    render() {

        const columns = [
            {
                title: "Job",
                dataIndex: 'job_headline',
                key: 'job_headline',
                align: 'center',
            },
            {
                title: "Company",
                dataIndex: 'company_name',
                key: "company_name",
                align: 'center'
            },
            {
                title: "Applied On",
                dataIndex: 'created_date',
                key: 'created_date',
                align: 'center',
                render: (date) => moment(date, moment.ISO_8601).format('YYYY-MM-DD hh:mm:ss A')
            },
            {
                title: 'Application Status',
                dataIndex: 'application_status',
                align: 'center',
                render: status =>
                    <Icon
                        {...(status === 1 ? {type: 'check-circle', theme: 'filled', style: {color: '#4bb543', fontSize: 20}} : (status === -1 ? {type: 'clock-circle', theme: 'filled', style: {color: '#1565C0', fontSize: 20}} : {type: 'close-circle', theme: 'filled', style: {color: '#f44336', fontSize: 20}} ))}
                    />
            },
            {
                title: 'Action',
                dataIndex: '_id',
                align: 'center',
                render: id =>
                    <Row type = 'flex' align = 'middle' justify = 'center'>
                        <Col style = {{margin: "0 10px"}}>
                            <Button type = 'primary' onClick={() => this.setState({id, modalVisible: true})}>
                                Job details
                            </Button>
                        </Col>
                        <Col style = {{margin: "0 10px"}}>
                            <Button type={'danger'} onClick={() => console.log("withdraw")}>Withdraw</Button>
                        </Col>
                    </Row>


            }
        ];


        const {loading, jobs} = this.props;

        const tableProps = {
            columns,
            dataSource: jobs,
            loading: loading,
            rowKey: '_id',
            scroll: {x: 1200},
            bordered: true
        };

        const modalProps = {
            jobId: this.state.id,
            filteredJobs: jobs,
            modalVisible: this.state.modalVisible,
            handleOk: this.handleOk,
            handleCancel: this.handleCancel
        };

        return (
            <div>
                <Table {...tableProps}/>
                {
                    this.state.modalVisible === true ? <JobDetailsModal {...modalProps}/>  : null
                }
            </div>
        );
    }
}

export default ManageApplicationsTable;