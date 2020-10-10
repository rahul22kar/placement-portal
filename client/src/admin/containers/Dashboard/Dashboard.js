import React, {Component} from 'react';
import Main from '../../components/Dashboard';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'
import * as actionCreators from "../../../redux/actions";

class Dashboard extends Component {
    render() {
        const mainProps = {
            loading: this.props.loading,
            studentProfiles: this.props.studentProfiles,
            onFetchProfiles: this.props.onFetchAllProfiles,
            isMobile: this.props.isMobile
        };
        return (
            <Main {...mainProps} />
        );
    }
}

const mapStateToProps = (state) => ({
    studentProfiles: state.admin.student_profiles,
    loading: state.admin.table_loading
});

const mapDispatchToProps = dispatch => {
    return{
        onFetchAllProfiles: () => dispatch(actionCreators.getAdminStudentProfiles())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
