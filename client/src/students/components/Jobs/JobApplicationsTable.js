import React, {Component} from 'react';
import {Table, Button, Tag, Avatar} from 'antd';
import moment from "moment";
import ApplicationModal from "./ApplicationModal";


class JobApplicationsTable extends Component {

    state = {
        id: '',
        modalVisible: false
    };

    handleApplyNow = (id) => {
        this.setState({id, modalVisible: true})
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
                title: "Logo",
                dataIndex: "logo_link",
                key: "logo_link",
                align: "center",
                render: link =>
                    <Avatar src={"https://i2.wp.com/www.xanjero.com/wp-content/uploads/2018/04/G-Suite-apps-cards.png?fit=512%2C512"}/>
            },
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
                title: "Application Deadline",
                dataIndex: 'application_deadline',
                key: 'application_deadline',
                align: 'center',
                render: (date) => moment(date, moment.ISO_8601).format('YYYY-MM-DD hh:mm:ss A')
            },
            {
                title: "Skills Required",
                dataIndex: 'skills',
                key: 'skills',
                align: 'center',
                render: (skills) => skills ? skills.map(item => <Tag key={item} color='blue' style={{margin: 5}}>{item}</Tag>) : null
            },
            {
                title: 'Action',
                dataIndex: '_id',
                align: 'center',
                render: id =>
                    <Button type={'primary'} onClick={() => this.handleApplyNow(id)}>Apply Now</Button>
            }
        ];


        const {loading, profileData, jobs} = this.props;

        const filteredJobs = jobs.filter((job) => {
            console.log(job.minimum_cpi, profileData.cpi);
            return job.minimum_cpi <= profileData.cpi && job.eligible_branches.includes(profileData.branch) && job.active
        });

        const tableProps = {
            columns,
            dataSource: filteredJobs ? filteredJobs : [],
            loading: loading,
            rowKey: '_id',
            scroll: {x: 1200},
            bordered: true
        };

        const modalProps = {
            jobId: this.state.id,
            profileData,
            filteredJobs,
            modalVisible: this.state.modalVisible,
            handleOk: this.handleOk,
            handleCancel: this.handleCancel
        };

        return (
            <div>
                <Table {...tableProps}/>
                {
                    this.state.modalVisible === true ? <ApplicationModal {...modalProps}/>  : null
                }
            </div>
        );
    }
}

export default JobApplicationsTable;