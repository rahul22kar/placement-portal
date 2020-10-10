import React, { Component } from 'react';
import { Layout} from 'antd';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actionCreators from '../../../../redux/actions/index';

import {ManageJob} from '../../../components/Jobs';
import EditJob from './EditJob/EditJob';
import ListStudentsModal from "./ListStudentsModal";

const {Content} = Layout;


class ManageJobs extends Component{

    state={
        index: 0,
        editVisible: false,
        modalVisible: false
    };

    componentDidMount(){
        this.props.getJobs()
    };

    handleOk = () => {
        // this.props.applyJob(this.state.id);
        this.setState({modalVisible: false});
        console.log("applied");
    };

    handleCancel = () => {
        this.setState({modalVisible: false})
    };

    handleEditJob = (id) => {
        let index = this.props.jobProfiles.map(profile => profile._id).indexOf(id)
        this.setState({index, editVisible: true})
    };

    onClose = () => {
        this.setState({
            editVisible: false
        })
    };

    handleDeleteJob = (id) => {
        this.props.deleteJob(id);
        this.props.getJobs();
    };

    handleList = (id) => {
        // let index = this.props.jobProfiles.map(profile => profile._id).indexOf(id)
        // this.props.history.push({
        //     pathname: '/company/students',
        //     data: {profile: this.props.jobProfiles[index].applicants}
        // })
        this.setState({modalVisible: true})
    };

    render(){

        const {
            jobProfiles,
            loading,
            isMobile,
        } = this.props;

        const {
            handleEditJob,
            handleDeleteJob,
            handleList,
            onClose
        } = this;

        const manageJobsProps = {
            handleEditJob,
            handleDeleteJob,
            handleList,
            jobProfiles,
            loading
        };

        const editJobProps = {
            onClose,
            editVisible: this.state.editVisible,
            isMobile,
            loading
        };

        const modalProps = {
            modalVisible: this.state.modalVisible,
            handleOk: this.handleOk,
            handleCancel: this.handleCancel,
        };

        return(
            <div>
                {this.state.editVisible ? <EditJob {...editJobProps} profile={jobProfiles[this.state.index]}/> : null}
                {
                    this.state.modalVisible === true ? <ListStudentsModal {...modalProps}/>  : null
                }
                <Layout>
                    <Content
                        style={{
                            background: '#fff',
                            margin: 10
                        }}>
                        <ManageJob {...manageJobsProps} />
                    </Content>
                </Layout>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    loading: state.job.loading,
    jobProfiles: state.job.jobProfiles,
});

const mapDispatchToProps = dispatch => {
    return{
        getJobs: () => {dispatch(actionCreators.getJobs())},
        deleteJob: (job_id) => {dispatch(actionCreators.deleteJob(job_id))}
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageJobs));
