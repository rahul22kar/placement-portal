import axios from 'axios';
import * as actionTypes from '../actionTypes';
import constants from "../../../config/constants";
const FileDownload = require('js-file-download');
/*
    Fetch Student Profiles Data
 */
export const getAdminStudentProfiles = () => dispatch => {
    dispatch(studentProfilesStart());
    axios.get("/api/admin/student_profiles")
        .then(res => {
            dispatch(studentProfilesSuccess(res));
        })
        .catch(err => {
           dispatch(studentProfilesFail(err.response.data));
        })
        .catch(connErr => {
            dispatch(studentProfilesFail(constants.CONN_ERROR));
        })
};

export const studentProfilesStart = () => {
    return {
        type: actionTypes.ADMIN_GET_STUDENT_PROFILES,
        loading: true
    }
};

export const studentProfilesFail = (failResponse) => {
    return {
        type: actionTypes.ADMIN_GET_STUDENT_PROFILES_FAIL,
        payload: failResponse
    }
};

export const studentProfilesSuccess = (successResponse) => {
    return {
        type: actionTypes.ADMIN_GET_STUDENT_PROFILES_SUCCESS,
        payload: successResponse.data
    }
};

/*
    Approval
 */

export const approveStudentProfile = (id, email) => dispatch => {
    dispatch(approveProfileStart());
    axios.put(`/api/admin/approve_student_profile/${id}/${email}`)
        .then(res => {
            dispatch(approveProfileSuccess(res));
            dispatch(getAdminStudentProfiles())
        }).catch(err => {
            dispatch(approveProfileFail(err.response.data));
        }).catch(connErr => {
            dispatch(approveProfileFail(constants.CONN_ERROR));
    });
};

export const approveProfileStart = () => {
    return {
        type: actionTypes.ADMIN_APPROVE_STUDENT_PROFILE,
        loading: true
    }
};

export const approveProfileFail = (failResponse) => {
    return {
        type: actionTypes.ADMIN_APPROVE_STUDENT_PROFILE_FAIL,
        payload: failResponse
    }
};

export const approveProfileSuccess = (successResponse) => {
    return {
        type: actionTypes.ADMIN_APPROVE_STUDENT_PROFILE_SUCCESS,
        payload: successResponse.data
    }
};

/*
Disapproval
 */

export const disapproveStudentProfile = (id, email, changes) => dispatch => {
    dispatch(disapproveProfileStart());
    axios.put(`/api/admin/disapprove_student_profile/${id}/${email}`, {suggested_changes: changes})
        .then(res => {
            dispatch(disapproveProfileSuccess(res));
            dispatch(getAdminStudentProfiles())
        }).catch(err => {
            dispatch(disapproveProfileFail(err.response.data));
        }).catch(connErr => {
            dispatch(disapproveProfileFail(constants.CONN_ERROR));
    });
};

export const disapproveProfileStart = () => {
    return {
        type: actionTypes.ADMIN_DISAPPROVE_STUDENT_PROFILE,
        loading: true
    }
};

export const disapproveProfileFail = (failResponse) => {
    return {
        type: actionTypes.ADMIN_DISAPPROVE_STUDENT_PROFILE_FAIL,
        payload: failResponse
    }
};

export const disapproveProfileSuccess = (successResponse) => {
    return {
        type: actionTypes.ADMIN_DISAPPROVE_STUDENT_PROFILE_SUCCESS,
        payload: successResponse.data
    }
};

/*
    Create Announcements
 */


export const createAnnouncement = (values) => dispatch => {
    dispatch(createAnnouncementStart());
    axios.post(`/api/admin/create_announcement`, values)
        .then(res => {
            dispatch(createAnnouncementSuccess(res));
        }).catch(err => {
            dispatch(createAnnouncementFail(err.response.data));
        })
        .catch(connErr => {
            dispatch(createAnnouncementFail(constants.CONN_ERROR));
        })
};


export const createAnnouncementStart = () => {
    return {
        type: actionTypes.ADMIN_CREATE_ANNOUNCEMENT,
        loading: true
    }
};

export const createAnnouncementFail = (failResponse) => {
    return {
        type: actionTypes.ADMIN_CREATE_ANNOUNCEMENT_FAIL,
        payload: failResponse
    }
};

export const createAnnouncementSuccess = (successResponse) => {
    return {
        type: actionTypes.ADMIN_CREATE_ANNOUNCEMENT_SUCCESS,
        payload: successResponse.data
    }
};

export const approveStudentCv = (student_id, cv_id) => dispatch => {
    dispatch(approveCvStart());
    axios.put(`/api/admin/approve_student_cv/${student_id}/${cv_id}`)
        .then(res => {
            dispatch(approveCvSuccess(res));
        }).catch(err => {
            dispatch(approveCvFail(err.response.data));
        }).catch(connErr => {
            dispatch(approveCvFail(constants.CONN_ERROR));
    })
};

export const approveCvStart = () => {
    return {
        type: actionTypes.ADMIN_APPROVE_STUDENT_CV,
        loading: true
    }
};

export const approveCvFail = (failResponse) => {
    return {
        type: actionTypes.ADMIN_APPROVE_STUDENT_CV_FAIL,
        payload: failResponse
    }
};

export const approveCvSuccess = (successResponse) => {
    return {
        type: actionTypes.ADMIN_APPROVE_STUDENT_CV_SUCCESS,
        payload: successResponse.data
    }
};

export const disapproveStudentCv = (student_id, cv_id) => dispatch => {
    dispatch(disapproveCvStart());
    axios.put(`/api/admin/disapprove_student_cv/${student_id}/${cv_id}`)
        .then(res => {
            dispatch(disapproveCvSuccess(res));
        }).catch(err => {
            dispatch(disapproveCvFail(err.response.data));
        }).catch(connErr => {
            dispatch(disapproveCvFail(constants.CONN_ERROR));
    })
};

export const disapproveCvStart = () => {
    return {
        type: actionTypes.ADMIN_DISAPPROVE_STUDENT_CV,
    }
};

export const disapproveCvFail = (failResponse) => {
    return {
        type: actionTypes.ADMIN_DISAPPROVE_STUDENT_CV_FAIL,
        payload: failResponse
    }
};

export const disapproveCvSuccess = () => {
    return {
        type: actionTypes.ADMIN_DISAPPROVE_STUDENT_CV_SUCCESS,
    }
};

/*
Disable User
 */

export const disableStudentProfile = (id, email, reason) => dispatch => {
    dispatch(disableProfileStart());
    axios.put(`/api/admin/disable_student_profile/${id}/${email}`, {reason})
        .then(res => {
            dispatch(disableProfileSuccess(res));
            dispatch(getAdminStudentProfiles())
        }).catch(err => {
        dispatch(disableProfileFail(err.response.data));
    }).catch(connErr => {
        dispatch(disableProfileFail(constants.CONN_ERROR));
    });
};

export const disableProfileStart = () => {
    return {
        type: actionTypes.ADMIN_DISABLE_STUDENT_PROFILE,
        loading: true
    }
};

export const disableProfileFail = (failResponse) => {
    return {
        type: actionTypes.ADMIN_DISABLE_STUDENT_PROFILE_FAIL,
        payload: failResponse
    }
};

export const disableProfileSuccess = (successResponse) => {
    return {
        type: actionTypes.ADMIN_DISABLE_STUDENT_PROFILE_SUCCESS,
        payload: successResponse.data
    }
};

/*
Enable User
 */

export const enableStudentProfile = (id, email) => dispatch => {
    dispatch(enableProfileStart());
    axios.put(`/api/admin/enable_student_profile/${id}/${email}`)
        .then(res => {
            dispatch(enableProfileSuccess(res));
            dispatch(getAdminStudentProfiles())
        }).catch(err => {
        dispatch(enableProfileFail(err.response.data));
    }).catch(connErr => {
        dispatch(enableProfileFail(constants.CONN_ERROR));
    });
};

export const enableProfileStart = () => {
    return {
        type: actionTypes.ADMIN_ENABLE_STUDENT_PROFILE,
        loading: true
    }
};

export const enableProfileFail = (failResponse) => {
    return {
        type: actionTypes.ADMIN_ENABLE_STUDENT_PROFILE_FAIL,
        payload: failResponse
    }
};

export const enableProfileSuccess = (successResponse) => {
    return {
        type: actionTypes.ADMIN_ENABLE_STUDENT_PROFILE_SUCCESS,
        payload: successResponse.data
    }
};

/*
Download Data
 */

export const downloadData = (list) => dispatch => {
    dispatch(downloadDataStart());
    axios.post(`/api/admin/download_data`, {list}, {responseType: "blob"})
        .then(res => {
            FileDownload(res.data, 'Student_Data.zip');
            dispatch(downloadDataSuccess(res));
        }).catch(err => {
        dispatch(downloadDataFail(err.response.data));
    }).catch(connErr => {
        dispatch(downloadDataFail(constants.CONN_ERROR));
    });
};

export const downloadDataStart = () => {
    return {
        type: actionTypes.ADMIN_DOWNLOAD_DATA,
        loading: true
    }
};

export const downloadDataFail = (failResponse) => {
    return {
        type: actionTypes.ADMIN_DOWNLOAD_DATA_FAIL,
        payload: failResponse
    }
};

export const downloadDataSuccess = (successResponse) => {
    return {
        type: actionTypes.ADMIN_DOWNLOAD_DATA_SUCCESS,
        payload: successResponse
    }
};