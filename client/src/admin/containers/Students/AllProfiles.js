import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import StudentProfilesTable from '../../components/Students/StudentProfilesTable';
import * as actionCreators from "../../../redux/actions";

class AllProfiles extends Component {

    componentDidMount(){
        this.props.onFetchAllProfiles()
    }

    render() {

        const {
            profiles,
            loading,
            disableStudentProfile,
            enableStudentProfile,
            downloadData,
        } = this.props;

        const filteredData = profiles.filter((student) => {
            return student.approval_status === 1
        });

        const tableProps = {
            studentData: filteredData,
            loading,
            disableStudentProfile,
            enableStudentProfile,
            downloadData,
        };


        return (
            <StudentProfilesTable {...tableProps} />
        );
    }
}
const mapStateToProps = (state) => ({
    profiles: state.admin.student_profiles,
    loading: state.admin.table_loading
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchAllProfiles: () => dispatch(actionCreators.getAdminStudentProfiles()),
        disableStudentProfile: (id, email, reason) => dispatch(actionCreators.disableStudentProfile(id, email, reason)),
        enableStudentProfile: (id, email) => dispatch(actionCreators.enableStudentProfile(id, email)),
        downloadData: (list) => dispatch(actionCreators.downloadData(list))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllProfiles));
