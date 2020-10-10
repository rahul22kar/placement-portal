import axios from 'axios';
import * as actionTypes from '../actionTypes';

/*
    Fetch Company Profiles Data
 */
export const getAdminCompanyProfiles = () => dispatch => {
    dispatch(companyProfilesStart());
    axios.get("/api/admin/company_profiles")
        .then(res => {
            dispatch(companyProfilesSuccess(res));
        })
        .catch(err => {
            dispatch(companyProfilesFail(err.response.data));
        });
};

export const companyProfilesStart = () => {
    return {
        type: actionTypes.ADMIN_GET_COMPANY_PROFILES,
        loading: true
    }
};

export const companyProfilesFail = (failResponse) => {
    return {
        type: actionTypes.ADMIN_GET_COMPANY_PROFILES_FAIL,
        payload: failResponse
    }
};

export const companyProfilesSuccess = (successResponse) => {
    return {
        type: actionTypes.ADMIN_GET_COMPANY_PROFILES_SUCCESS,
        payload: successResponse.data
    }
};

/*
    Approval
 */

export const approveCompanyProfile = (id) => dispatch => {
    dispatch(approveProfileStart());
    axios.put(`/api/admin/approve_company_profile/${id}`)
        .then(res => {
            dispatch(approveProfileSuccess(res));
        }).catch(err => {
        dispatch(approveProfileFail(err.response.data));
    })
};

export const approveProfileStart = () => {
    return {
        type: actionTypes.ADMIN_APPROVE_COMPANY_PROFILE,
        loading: true
    }
};

export const approveProfileFail = (failResponse) => {
    return {
        type: actionTypes.ADMIN_APPROVE_COMPANY_PROFILE_FAIL,
        payload: failResponse
    }
};

export const approveProfileSuccess = (successResponse) => {
    return {
        type: actionTypes.ADMIN_APPROVE_COMPANY_PROFILE_SUCCESS,
        payload: successResponse.data
    }
};

export const disapproveCompanyProfile = (id) => dispatch => {
    dispatch(disapproveProfileStart());
    axios.put(`/api/admin/disapprove_company_profile/${id}`)
        .then(res => {
            dispatch(disapproveProfileSuccess(res));
        }).catch(err => {
        dispatch(disapproveProfileFail(err.response.data));
    })
};

export const disapproveProfileStart = () => {
    return {
        type: actionTypes.ADMIN_DISAPPROVE_COMPANY_PROFILE,
        loading: true
    }
};

export const disapproveProfileFail = (failResponse) => {
    return {
        type: actionTypes.ADMIN_DISAPPROVE_COMPANY_PROFILE_FAIL,
        payload: failResponse
    }
};

export const disapproveProfileSuccess = (successResponse) => {
    return {
        type: actionTypes.ADMIN_DISAPPROVE_COMPANY_PROFILE_SUCCESS,
        payload: successResponse.data
    }
};

/*
    Create Login
*/

export const createLogin = (values) => dispatch => {
        dispatch(createLoginStart())
        axios.post('/api/admin/create_company_login', values)
            .then(res => {
                dispatch(createLoginSuccess(res))
            })
            .catch(err => {
                dispatch(createLoginFail(err.response.data))
            })
}

export const createLoginStart = () => {
    return {
        type: actionTypes.ADMIN_CREATE_COMPANY_LOGIN,
        loading: true
    }
};

export const createLoginFail = (failResponse) => {
    return {
        type: actionTypes.ADMIN_CREATE_COMPANY_LOGIN_FAIL,
        payload: failResponse
    }
};

export const createLoginSuccess = (successResponse) => {
    return {
        type: actionTypes.ADMIN_CREATE_COMPANY_LOGIN_SUCCESS,
        payload: successResponse.data
    }
};
