import axios from 'axios';
import * as actionTypes from '../actionTypes';
import constants from "../../../config/constants";

axios.defaults.baseURL = constants.API_ENDPOINT;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('authToken');
axios.defaults.timeout = constants.AXIOS_TIMEOUT;
/*
    Create Profile
 */

export const createStudentProfile = (cvData, inputData) => dispatch => {
    dispatch(createProfileStart());
    axios.post('/api/students/upload_cv', cvData, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(res => {
            const data = {
                ...inputData,
                cv: res.data.cv_link
            };
            axios.post('/api/students/create_profile', data)
                .then(res => {
                    dispatch(createProfileSuccess(res));
                })
                .catch(err => {
                    dispatch(createProfileFail(err.response.data));
                })
                .catch(connErr => {
                    dispatch(createProfileFail(constants.CONN_ERROR));
                })
        })
        .catch(err => {
            dispatch(createProfileFail(err.response.data));
        })
        .catch(connErr => {
            dispatch(createProfileFail(constants.CONN_ERROR));
        })
};

export const createProfileStart = () => {
    return {
        type: actionTypes.STUDENT_PROFILE_CREATE,
        loading: true
    }
};

export const createProfileSuccess = (successResponse) => {
    return {
        type: actionTypes.STUDENT_PROFILE_CREATE_SUCCESS,
        payload: successResponse.data
    }
};

export const createProfileFail = (failResponse) => {
    return {
        type: actionTypes.STUDENT_PROFILE_CREATE_FAIL,
        payload: failResponse
    }
};

/*
    Fetch Profile data
 */

export const fetchStudentProfile = () => dispatch => {
    if (localStorage.getItem('authToken') !== null) {
        dispatch(fetchProfileStart());
        axios.get('/api/students/fetch_profile')
            .then(res => {
                dispatch(fetchProfileSuccess(res));
            })
            .catch(err => {
                dispatch(fetchProfileFail(err.response.data));
            })
            .catch(connErr => {
                dispatch(fetchProfileFail(constants.CONN_ERROR));
            })
    }
};

export const fetchProfileStart = () => {
    return {
        type: actionTypes.STUDENT_PROFILE_FETCH,
        loading: true
    }
};

export const fetchProfileSuccess = (successResponse) => {
    const {profileData, error} = successResponse.data;
    const fetchedPayload = {
        errors: error,
        profileData: profileData ? profileData : {},
        approval_status: profileData ? profileData.approval_status : -1,
        active_status: profileData ? profileData.active_status : false
    };
    return {
        type: actionTypes.STUDENT_PROFILE_FETCH_SUCCESS,
        payload: fetchedPayload
    }
};

export const fetchProfileFail = (failResponse) => {
    return {
        type: actionTypes.STUDENT_PROFILE_FETCH_FAIL,
        payload: failResponse
    }
};

/*
    Edit Student Profile
       1. Basic Details
       2. Academic Details
       3. Professional Details
 */

export const editStudentProfile = (type, cvData, inputData) => dispatch => {
    dispatch(editProfileStart());
    if (type === 'professional') {
        axios.post('/api/students/upload_cv', cvData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'filename': inputData.headers.filename,
                'fileindex': inputData.headers.fileindex
            }
        }).then(res => {
            const data = {
                ...inputData,
                cv: res.data.cv_link
            };
            delete data['headers'];
            axios.post('/api/students/edit_profile', data, {params: {'type': 'professional'}})
                .then(res => {
                    dispatch(editProfileSuccess(res));
                })
                .catch(err => {
                    dispatch(editProfileFail(err.response.data));
                })
                .catch(connErr => {
                    dispatch(editProfileFail(constants.CONN_ERROR));
                })
        }).catch(err => {
            dispatch(editProfileFail(err.response.data));
        }).catch(connErr => {
            dispatch(editProfileFail(constants.CONN_ERROR))
        })
    } else {
        const data = {
            ...inputData
        };
        axios.post('/api/students/edit_profile', data, {params: {'type': type}}).then(res => {
            dispatch(editProfileSuccess(res));
        }).catch(err => {
            dispatch(editProfileFail(err.response.data));
        }).catch(connErr => {
            dispatch(editProfileFail(constants.CONN_ERROR));
        })
    }
};

export const editProfileStart = () => {
    return {
        type: actionTypes.STUDENT_PROFILE_EDIT,
        loading: true
    }
};

export const editProfileSuccess = (successResponse) => {
    return {
        type: actionTypes.STUDENT_PROFILE_EDIT_SUCCESS,
        payload: successResponse.data
    }
};

export const editProfileFail = (failResponse) => {
    return {
        type: actionTypes.STUDENT_PROFILE_EDIT_FAIL,
        payload: failResponse
    }
};

/*
    Add Experience,
    Edit Experience,
    Remove Experience
 */

export const addExperience = (inputData) => dispatch => {
    dispatch(addExperienceStart());
    axios.post("/api/students/add_experience", inputData)
        .then(res => {
            dispatch(addExperienceSuccess(res))
        }).catch(err => {
        dispatch(addExperienceFail(err.response.data));
    }).catch(connErr => {
        dispatch(addExperienceFail(constants.CONN_ERROR));
    })
};

export const addExperienceStart = () => {
    return {
        type: actionTypes.STUDENT_PROFILE_ADD_EXPERIENCE,
        loading: true
    }
};

export const addExperienceFail = (failResponse) => {
    return {
        type: actionTypes.STUDENT_PROFILE_ADD_EXPERIENCE_FAIL,
        payload: failResponse
    }
};

export const addExperienceSuccess = (successResponse) => {
    return {
        type: actionTypes.STUDENT_PROFILE_ADD_EXPERIENCE_SUCCESS,
        payload: successResponse.data
    }
};

export const editExperience = (id, inputData) => dispatch => {
    dispatch(editExperienceStart());
    axios.put(`/api/students/edit_experience/${id}`, inputData)
        .then(res => {
            dispatch(editExperienceSuccess(res));
            dispatch(fetchStudentProfile());
        }).catch(err => {
        dispatch(editExperienceFail(err.response.data));
    }).catch(connErr => {
        dispatch(editExperienceFail(constants.CONN_ERROR));
    })
};

export const editExperienceStart = () => {
    return {
        type: actionTypes.STUDENT_PROFILE_EDIT_EXPERIENCE,
        tab_loading: true
    }
};

export const editExperienceFail = (failResponse) => {
    return {
        type: actionTypes.STUDENT_PROFILE_EDIT_EXPERIENCE_FAIL,
        payload: failResponse
    }
};

export const editExperienceSuccess = (successResponse) => {
    return {
        type: actionTypes.STUDENT_PROFILE_EDIT_EXPERIENCE_SUCCESS,
        payload: successResponse.data
    }
};

export const removeExperience = (id) => dispatch => {
    dispatch(removeExperienceStart());
    axios.delete(`/api/students/remove_experience/${id}`)
        .then(res => {
            dispatch(removeExperienceSuccess(res));
            dispatch(fetchStudentProfile())
        }).catch(err => {
        dispatch(removeExperienceFail(err.response.data));
    }).catch(connErr => {
        dispatch(removeExperienceFail(constants.CONN_ERROR));
    })
};

export const removeExperienceStart = () => {
    return {
        type: actionTypes.STUDENT_PROFILE_REMOVE_EXPERIENCE,
        loading: true
    }
};

export const removeExperienceFail = (failResponse) => {
    return {
        type: actionTypes.STUDENT_PROFILE_REMOVE_EXPERIENCE_FAIL,
        payload: failResponse
    }
};

export const removeExperienceSuccess = (successResponse) => {
    return {
        type: actionTypes.STUDENT_PROFILE_REMOVE_EXPERIENCE_SUCCESS,
        payload: successResponse.data
    }
};

/*
    Add Project,
    Edit Project,
    Remove Project
 */

export const addProject = (inputData) => dispatch => {
    dispatch(addProjectStart());
    axios.post("/api/students/add_project", inputData)
        .then(res => {
            dispatch(addProjectSuccess(res))
        }).catch(err => {
        dispatch(addProjectFail(err.response.data));
    }).catch(connErr => {
        dispatch(addProjectFail(constants.CONN_ERROR))
    });
};

export const addProjectStart = () => {
    return {
        type: actionTypes.STUDENT_PROFILE_ADD_PROJECT,
        loading: true
    }
};

export const addProjectFail = (failResponse) => {
    return {
        type: actionTypes.STUDENT_PROFILE_ADD_PROJECT_FAIL,
        payload: failResponse
    }
};

export const addProjectSuccess = (successResponse) => {
    return {
        type: actionTypes.STUDENT_PROFILE_ADD_PROJECT_SUCCESS,
        payload: successResponse.data
    }
};

export const editProject = (id, inputData) => dispatch => {
    dispatch(editProjectStart());
    axios.put(`/api/students/edit_project/${id}`, inputData)
        .then(res => {
            dispatch(editProjectSuccess(res));
            dispatch(fetchStudentProfile())
        }).catch(err => {
        dispatch(editProjectFail(err.response.data));
    }).catch(connErr => {
        dispatch(editProjectFail(constants.CONN_ERROR));
    })
};

export const editProjectStart = () => {
    return {
        type: actionTypes.STUDENT_PROFILE_EDIT_PROJECT,
        loading: true
    }
};

export const editProjectFail = (failResponse) => {
    return {
        type: actionTypes.STUDENT_PROFILE_EDIT_PROJECT_FAIL,
        payload: failResponse
    }
};

export const editProjectSuccess = (successResponse) => {
    return {
        type: actionTypes.STUDENT_PROFILE_EDIT_PROJECT_SUCCESS,
        payload: successResponse.data
    }
};

export const removeProject = (id) => dispatch => {
    dispatch(removeProjectStart());
    axios.delete(`/api/students/remove_project/${id}`)
        .then(res => {
            dispatch(removeProjectSuccess(res));
            dispatch(fetchStudentProfile())
        }).catch(err => {
        dispatch(removeProjectFail(err.response.data));
    }).catch(connErr => {
        dispatch(removeProjectFail(constants.CONN_ERROR));
    })
};

export const removeProjectStart = () => {
    return {
        type: actionTypes.STUDENT_PROFILE_REMOVE_PROJECT,
        loading: true
    }
};

export const removeProjectFail = (failResponse) => {
    return {
        type: actionTypes.STUDENT_PROFILE_REMOVE_PROJECT_FAIL,
        payload: failResponse
    }
};

export const removeProjectSuccess = (successResponse) => {
    return {
        type: actionTypes.STUDENT_PROFILE_REMOVE_PROJECT_SUCCESS,
        payload: successResponse.data
    }
};

export const createQuery = (inputData) => dispatch => {
    dispatch(createQueryStart());
    axios.post("/api/students/create_query", inputData)
        .then(res => {
            dispatch(createQuerySuccess(res))
        }).catch(err => {
            dispatch(createQueryFail(err.response.data));
    }).catch(connErr => {
        dispatch(createQueryFail(constants.CONN_ERROR));
    })
};

export const createQueryStart = () => {
    return {
        type: actionTypes.STUDENT_CREATE_QUERY,
        loading: true
    }
};

export const createQueryFail = (failResponse) => {
    return {
        type: actionTypes.STUDENT_CREATE_QUERY_FAIL,
        payload: failResponse
    }
};

export const createQuerySuccess = (successResponse) => {
    return {
        type: actionTypes.STUDENT_CREATE_QUERY_SUCCESS,
        payload: successResponse.data
    }
};

export const reportBug = (inputData) => dispatch => {
    dispatch(reportBugStart());
    axios.post("/api/students/report_bug", inputData)
        .then(res => {
            dispatch(reportBugSuccess(res))
        }).catch(err => {
        dispatch(reportBugFail(err.response.data));
    }).catch(connErr => {
        dispatch(reportBugFail(constants.CONN_ERROR));
    })
};

export const reportBugStart = () => {
    return {
        type: actionTypes.STUDENT_REPORT_BUG,
        loading: true
    }
};

export const reportBugFail = (failResponse) => {
    return {
        type: actionTypes.STUDENT_REPORT_BUG_FAIL,
        payload: failResponse
    }
};

export const reportBugSuccess = (successResponse) => {
    return {
        type: actionTypes.STUDENT_REPORT_BUG_SUCCESS,
        payload: successResponse.data
    }
};

export const fetchAnnouncements = (inputData) => dispatch => {
    dispatch(fetchAnnouncementsStart());
    axios.get('/api/students/fetch_announcements', {
        params: {
            'course_type': inputData.course_type,
            'branch': inputData.branch,
            'year_of_study': inputData.year_of_study
        }
    }).then(res => {
            dispatch(fetchAnnouncementsSuccess(res))
        }).catch(err => {
            dispatch(fetchAnnouncementsFail(err.response.data));
        })
        .catch(connErr => {
            dispatch(fetchAnnouncementsFail(constants.CONN_ERROR));
        })
};

export const fetchAnnouncementsStart = () => {
    return {
        type: actionTypes.STUDENT_FETCH_ANNOUNCEMENTS,
        loading: true
    }
};

export const fetchAnnouncementsFail = (failResponse) => {
    return {
        type: actionTypes.STUDENT_FETCH_ANNOUNCEMENTS_FAIL,
        payload: failResponse
    }
};

export const fetchAnnouncementsSuccess = (successResponse) => {
    return {
        type: actionTypes.STUDENT_FETCH_ANNOUNCEMENTS_SUCCESS,
        payload: successResponse.data
    }
};

export const resetPassword = (values) => dispatch => {
    dispatch(resetPasswordStart());
    axios.post('/api/students/reset_password', values)
        .then(res => {
            dispatch(resetPasswordSuccess(res))
        })
        .catch(err => {
            dispatch(resetPasswordFail(err.response.data))
        })
        .catch(connErr => {
            dispatch(resetPasswordFail(constants.CONN_ERROR))
        })

};

export const resetPasswordStart = () => {
    return {
        type: actionTypes.STUDENT_RESET_PASSWORD,
        loading: true
    }
};

export const resetPasswordFail = (failResponse) => {
    return {
        type: actionTypes.STUDENT_RESET_PASSWORD_FAIL,
        payload: failResponse
    }
};

export const resetPasswordSuccess = (successResponse) => {
    return {
        type: actionTypes.STUDENT_RESET_PASSWORD_SUCCESS,
        payload: successResponse.data
    }
};

export const findJobs = () => dispatch => {
    dispatch(findJobsStart());
    axios.get('/api/students/current_openings')
        .then(res => {
            dispatch(findJobsSuccess(res))
        })
        .catch(err => {
            dispatch(findJobsFail(err.response.data))
        })
        .catch(connErr => {
            dispatch(findJobsFail(constants.CONN_ERROR))
        })

};

export const findJobsStart = () => {
    return {
        type: actionTypes.STUDENT_GET_JOBS,
        loading: true
    }
};

export const findJobsFail = (failResponse) => {
    return {
        type: actionTypes.STUDENT_GET_JOBS_FAIL,
        payload: failResponse
    }
};

export const findJobsSuccess = (successResponse) => {
    return {
        type: actionTypes.STUDENT_GET_JOBS_SUCCESS,
        payload: successResponse.data
    }
};