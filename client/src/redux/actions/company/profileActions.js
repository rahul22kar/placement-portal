import axios from 'axios';
import * as actionTypes from '../actionTypes';
import constants from "../../../config/constants";

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('authToken');

/*
    Create Profile
 */

export const createCompanyProfile = (logoData, inputData) => dispatch => {
    dispatch(createProfileStart());
    axios.post('/api/company/upload_logo', logoData, { headers: { 'Content-Type': 'multipart/form-data' }})
        .then(res => {
            const data = {
                ...inputData,
                logo_link: res.data.logo_link
            };
            axios.post('/api/company/create_profile', data)
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
        type: actionTypes.COMPANY_PROFILE_CREATE,
        loading: true
    }
};

export const createProfileSuccess = (successResponse) => {
    return {
        type: actionTypes.COMPANY_PROFILE_CREATE_SUCCESS,
        payload: successResponse.data
    }
};

export const createProfileFail = (failResponse) => {
    return {
        type: actionTypes.COMPANY_PROFILE_CREATE_FAIL,
        payload: failResponse
    }
};

/*
    Edit Profile
 */

export const editCompanyProfile = (logoData, inputData) => dispatch => {
    dispatch(editProfileStart());
    let data = {
        ...inputData
    };
    if (logoData !== null){
        axios.post('/api/company/upload_logo', logoData, { headers: { 'Content-Type': 'multipart/form-data' }})
        .then(res => {
            data = {
                ...data,
                logo_link: res.data.logo_link
            };
            axios.post('/api/company/edit_profile', data)
            .then(res => {
                dispatch(editProfileSuccess(res));
                dispatch(fetchCompanyProfile());
            })
            .catch(err => {
                dispatch(editProfileFail(err.response.data));
            })
            .catch(connErr => {
                dispatch(editProfileFail(constants.CONN_ERROR));
            })
        })
        .catch(err => {
            dispatch(editProfileFail(err.response.data));
        })
        .catch(connErr => {
            dispatch(editProfileFail(constants.CONN_ERROR));
        })
    } else {
        axios.post('/api/company/edit_profile', data)
        .then(res => {
            dispatch(editProfileSuccess(res));
            dispatch(fetchCompanyProfile());
        })
        .catch(err => {
            dispatch(editProfileFail(err.response.data));
        })
        .catch(connErr => {
            dispatch(editProfileFail(constants.CONN_ERROR));
        })
    };
};

export const editProfileStart = () => {
    return {
        type: actionTypes.COMPANY_PROFILE_EDIT,
        loading: true
    }
};

export const editProfileSuccess = (successResponse) => {
    return {
        type: actionTypes.COMPANY_PROFILE_EDIT_SUCCESS,
        payload: successResponse.data
    }
};

export const editProfileFail = (failResponse) => {
    return {
        type: actionTypes.COMPANY_PROFILE_EDIT_FAIL,
        payload: failResponse
    }
};


/*
    Fetch Profile data
 */

export const fetchCompanyProfile = () => dispatch => {
    dispatch(fetchProfileStart());
    axios.get('/api/company/fetch_profile')
        .then(res => {
            dispatch(fetchProfileSuccess(res));
        })
        .catch(err => {
            dispatch(fetchProfileFail(err.response.data));
        })
        .catch(connErr => {
            dispatch(fetchProfileFail(constants.CONN_ERROR));
        })
};

export const fetchProfileStart = () => {
    return {
        type: actionTypes.COMPANY_PROFILE_FETCH,
        loading: true
    }
};

export const fetchProfileSuccess = (successResponse) => {
    const { profileData, errors } = successResponse.data;
    const fetchedPayload = {
        errors,
        profileData
    };
    return {
        type: actionTypes.COMPANY_PROFILE_FETCH_SUCCESS,
        payload: fetchedPayload
    }
};

export const fetchProfileFail = (failResponse) => {
    return {
        type: actionTypes.COMPANY_PROFILE_FETCH_FAIL,
        payload: failResponse
    }
};
