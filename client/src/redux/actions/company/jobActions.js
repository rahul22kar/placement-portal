import axios from 'axios';
import * as actionTypes from '../actionTypes';
import constants from "../../../config/constants";

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('authToken');

/*
    Create Job
*/

export const createJob = (contractData, inputData) => dispatch => {
    dispatch(createJobStart());
    if (contractData) {
        axios.post('api/company/upload_contract', contractData, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(res => {
                const data = {
                    ...inputData,
                    contract_link: res.data.contract_link
                };
                axios.post('/api/company/create_job', data)
                    .then(res => {
                        dispatch(createJobSuccess(res))
                    })
                    .catch(err => {
                        dispatch(createJobFail(err.response.data))
                    })
                    .catch(connErr => {
                        dispatch(createJobFail(constants.CONN_ERROR));
                    })
            })
            .catch(err => {
                dispatch(createJobFail(err.response.data))
            })
            .catch(connErr => {
            dispatch(createJobFail(constants.CONN_ERROR));
            })
    } else {
        axios.post('/api/company/create_job', inputData)
            .then(res => {
                dispatch(createJobSuccess(res))
            })
            .catch(err => {
                dispatch(createJobFail(err.response.data))
            })
            .catch(connErr => {
                dispatch(createJobFail(constants.CONN_ERROR));
            })
    }
};

export const createJobStart = () => {
    return {
        type: actionTypes.COMPANY_JOB_CREATE,
        loading: true
    }
};

export const createJobSuccess = () => {
    return {
        type: actionTypes.COMPANY_JOB_CREATE_SUCCESS,
        loading: false
    }
};

export const createJobFail = (failResponse) => {
    return {
        type: actionTypes.COMPANY_JOB_CREATE_FAIL,
        payload: failResponse
    }
};

/*
Manage Jobs
*/

export const getJobs = () => dispatch => {
    dispatch(getJobStart());
    axios.get('api/company/jobs')
        .then(res => {
            dispatch(getJobSuccess(res))
        })
        .catch(err => {
            dispatch(getJobFail(err.response.data))
        })
        .catch(connErr => {
            dispatch(getJobFail(constants.CONN_ERROR));
        })
};

export const getJobStart = () => {
    return {
        type: actionTypes.GET_COMPANY_JOB,
        loading: true
    }
};

export const getJobSuccess = (successResponse) => {
    const {jobProfiles, success} = successResponse.data;
    let fetchPayload = {
        jobProfiles,
        success
    };
    return {
        type: actionTypes.GET_COMPANY_JOB_SUCCESS,
        payload: fetchPayload
    }
};

export const getJobFail = (failResponse) => {
    return {
        type: actionTypes.GET_COMPANY_JOB_FAIL,
        payload: failResponse
    }
};

/*
    Edit Job
*/

export const editJob = (contractData, inputData) => dispatch => {
    dispatch(editJobStart());
    if (contractData) {
        axios.post('api/company/upload_contract', contractData, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(res => {
                const data = {
                    ...inputData,
                    contract_link: res.data.contract_link
                };
                axios.post('/api/company/edit_job', data)
                    .then(res => {
                        dispatch(editJobSuccess(res));
                        dispatch(getJobs());
                    })
                    .catch(err => {
                        dispatch(editJobFail(err.response.data))
                    })
                    .catch(connErr => {
                        dispatch(editJobFail(constants.CONN_ERROR));
                    })
            })
            .catch(err => {
                dispatch(editJobFail(err.response.data))
            })
            .catch(connErr => {
                dispatch(editJobFail(constants.CONN_ERROR));
            })
    } else {
        axios.post('/api/company/edit_job', inputData)
            .then(res => {
                dispatch(editJobSuccess(res))
            })
            .catch(err => {
                dispatch(editJobFail(err.response.data))
            })
            .catch(connErr => {
                dispatch(editJobFail(constants.CONN_ERROR));
            })
    }
};

export const editJobStart = () => {
    return {
        type: actionTypes.COMPANY_JOB_EDIT,
        loading: true
    }
};

export const editJobSuccess = () => {
    return {
        type: actionTypes.COMPANY_JOB_EDIT_SUCCESS,
        loading: false
    }
};

export const editJobFail = (failResponse) => {
    return {
        type: actionTypes.COMPANY_JOB_EDIT_FAIL,
        payload: failResponse
    }
};

/*
    Delete Job
*/

export const deleteJob = (job_id) => dispatch => {
    dispatch(deleteJobStart());
    axios.post('api/company/delete_job', {job_id})
        .then(res => {
            dispatch(deleteJobSuccess())
        })
        .catch(err => {
            dispatch(deleteJobFail(err.response.data))
        })
        .catch(connErr => {
            dispatch(deleteJobFail(constants.CONN_ERROR));
        })

};

export const deleteJobStart = () => {
    return {
        type: actionTypes.DELETE_COMPANY_JOB,
        loading: true
    }
};

export const deleteJobSuccess = dispatch => {
    return {
        type: actionTypes.DELETE_COMPANY_JOB_SUCCESS,
    }
};

export const deleteJobFail = (failResponse) => {
    return {
        type: actionTypes.DELETE_COMPANY_JOB_FAIL,
        payload: failResponse
    }
};


/*
Student Profiles
*/

export const getStudentProfiles = () => dispatch => {
    dispatch(getStudentProfilesStart());
    axios.get('/api/company/student_profiles')
        .then(res => {
            dispatch(getStudentProfilesSuccess(res))
        })
        .catch(err => {
            dispatch(getStudentProfilesFail(err.response.data))
        })
        .catch(connErr => {
            dispatch(getStudentProfilesFail(constants.CONN_ERROR));
        })

};

export const getStudentProfilesStart = () => {
    return {
        type: actionTypes.GET_STUDENT_PROFILES,
        loading: true
    }
};

export const getStudentProfilesSuccess = (successResponse) => {
    const {studentProfiles, success} = successResponse.data;
    let fetchPayload = {
        studentProfiles,
        success
    };
    return {
        type: actionTypes.GET_STUDENT_PROFILES_SUCCESS,
        payload: fetchPayload
    }
};

export const getStudentProfilesFail = (failResponse) => {
    return {
        type: actionTypes.GET_STUDENT_PROFILES_FAIL,
        payload: failResponse
    }
};
