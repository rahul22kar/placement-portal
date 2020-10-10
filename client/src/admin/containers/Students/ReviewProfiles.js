import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import ReviewProfileTable from '../../components/Students/ReviewProfileTable';
import * as actionCreators from "../../../redux/actions";

class ReviewProfiles extends Component {

    componentDidMount(){
        this.props.onFetchAllProfiles()
    }

    render() {
        const {
            profiles,
            loading,
            approveProfile,
            disapproveProfile,
            disapproveStudentCv,
            approveStudentCv
        } = this.props;

        const filteredData = profiles.filter((student) => {
            let flag = false;
            student.cv.forEach((cv) => {
                if(cv.approved !== 1) {
                    flag = true
                }
            });
            return student.approval_status !== 1 || flag
        });

        const tableProps = {
            studentData: filteredData,
            loading,
            approveProfile,
            disapproveProfile,
            disapproveStudentCv,
            approveStudentCv
        };


        return (
            <ReviewProfileTable {...tableProps} />
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
        approveProfile: (id, email) => dispatch(actionCreators.approveStudentProfile(id, email)),
        disapproveProfile: (id, email,changes) => dispatch(actionCreators.disapproveStudentProfile(id, email, changes)),
        approveStudentCv: (student_id, cv_id) => dispatch(actionCreators.approveStudentCv(student_id, cv_id)),
        disapproveStudentCv: (student_id, cv_id) => dispatch(actionCreators.disapproveStudentCv(student_id, cv_id))

    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReviewProfiles));
