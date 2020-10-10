import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Main from "../../components/Dashboard";
import EditProfile from './EditProfile';
import * as actionCreators from "../../../redux/actions";

class Dashboard extends Component {

    state={
        editVisible: false
    };

    onEditVisible = () => {
        this.setState({editVisible: true});
    };

    onClose = () => {
        this.setState({editVisible: false});
    };

    componentDidMount() {
        this.props.onFetchProfile();
    };

    render(){
        const {
            profileData,
            profileExists,
            loading,
            active_status,
            errors,
            email,
            onEditProfile,
            isMobile
        } = this.props;

        const approval_status = profileData.approval_status;

        const {
            onClose,
            onEditVisible
        } = this;

        const {editVisible} = this.state;

        const userData = {
            email
        };

        const mainProps = {
            userData,
            profileData,
            profileExists,
            loading: loading.page,
            approval_status,
            active_status,
            errors,
            onEditVisible,
            onClose
        };

        const editProfileProps = {
            loading: loading.edit,
            editVisible,
            onClose,
            profileData,
            onEditProfile,
            isMobile
        };

        return(
            <div>
                {this.state.editVisible ? <EditProfile {...editProfileProps}/> : null}
                <Main {...mainProps}/>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    email: state.auth.loggedUser,
    loading: state.company_profile.loading,
    profileExists: state.company_profile.profileExists,
    profileData: state.company_profile.profileData,
    active_status: state.company_profile.active_status
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchProfile: () => dispatch(actionCreators.fetchCompanyProfile()),
        onEditProfile: (logoData, inputData) => dispatch(actionCreators.editCompanyProfile(logoData, inputData))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
