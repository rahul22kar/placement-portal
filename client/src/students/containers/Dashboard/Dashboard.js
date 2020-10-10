import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Main from "../../components/Dashboard";
import EditProject from "./EditProject";
import EditExperience from "./EditExperience";

import * as actionCreators from "../../../redux/actions";
import {message} from "antd";
import ConnectionFailed from "../../components/ConnectionFailed";

class Dashboard extends Component {

    state = {
        editProjectVisible: false,
        editExperienceVisible: false,
        experience: {},
        project: {}
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.errors !== prevProps.errors && this.props.loading.profile === false) {
            if(this.props.success === false) {
                Object.keys(this.props.errors).forEach((key, i) => {
                    if(key !== "not_found") {
                        message.error(this.props.errors[key]);
                    }
                });
            }
        }
    }

    componentDidMount() {
        this.props.onFetchProfile();
    }

    onEditExperience = (experience) => {
        this.setState({
            experience,
            editExperienceVisible: true
        })
    };

    onEditProject = (project) => {
        this.setState({
            project,
            editProjectVisible: true
        })
    };

    onEditExperienceClose =  () => {
        this.setState({
            editExperienceVisible: false
        })
    };

    onEditProjectClose = () => {
        this.setState({
            editProjectVisible: false
        })
    };

    render() {
        const {
            profileData,
            profileExists,
            approval_status,
            email,
            loading,
            active_status,
            errors,
            handleEditProject,
            handleRemoveProject,
            handleEditExperience,
            handleRemoveExperience,
            isMobile
        } = this.props;
        const {experience, project, editProjectVisible, editExperienceVisible} = this.state;
        const {onEditProject, onEditExperience, onEditProjectClose, onEditExperienceClose} = this;

        const data = {
            email
        };

        const mainProps = {
            userData: data,
            profileData: {
                ...profileData
            },
            profileExists,
            loading,
            approval_status,
            active_status,
            errors,
            onEditExperience,
            handleRemoveExperience,
            onEditProject,
            handleRemoveProject
        };

        const editExperienceProps = {
            ...experience,
            loading: loading.edit,
            handleEditExperience,
            onEditExperienceClose,
            editExperienceVisible,
            isMobile
        };

        const editProjectProps = {
            ...project,
            loading: loading.edit,
            handleEditProject,
            onEditProjectClose,
            editProjectVisible,
            isMobile
        };

        return (
            <div>
                {editProjectVisible ? <EditProject {...editProjectProps}/> : null}
                {editExperienceVisible? <EditExperience {...editExperienceProps}/> : null}
                {this.props.loading.profile === false && this.props.errors.hasOwnProperty('connection') ? <ConnectionFailed /> : <Main {...mainProps}/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    email: state.auth.loggedUser,
    loading: state.profile.loading,
    success: state.profile.success,
    errors: state.profile.errors,
    profileExists: state.profile.profileExists,
    profileData: state.profile.profileData,
    approval_status: state.profile.approval_status,
    active_status: state.profile.active_status
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchProfile: () => dispatch(actionCreators.fetchStudentProfile()),
        handleEditExperience: (id, data) => dispatch(actionCreators.editExperience(id, data)),
        handleRemoveExperience: (id) => dispatch(actionCreators.removeExperience(id)),
        handleEditProject: (id, data) => dispatch(actionCreators.editProject(id, data)),
        handleRemoveProject: (id) => dispatch(actionCreators.removeProject(id)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
