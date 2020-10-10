import axios from 'axios';
import jwt_decode from 'jwt-decode';
import * as actionTypes from '../actionTypes';
import setAuthToken from '../../../utils/setAuthToken';
import constants from "../../../config/constants";

export const authRegister = (inputData) => dispatch => {
    dispatch(authStart());
    axios.post('/api/auth/register', inputData)
        .then(res => {
            dispatch(authRegisterSuccess(res));
        })
        .catch(err => {
            dispatch(authRegisterFail(err.response.data));
        })
        .catch(connErr => {
            dispatch(authRegisterFail(constants.CONN_ERROR));
        })
};

export const authLogin = (inputData) => dispatch => {
    dispatch(authStart());
    axios.post('/api/auth/login', inputData)
        .then(res => {
            dispatch(authLoginSuccess(res));
            dispatch(checkExpirationTimeout(res.data.expiresIn));
        })
        .catch(err => {
            dispatch(authLoginFail(err.response.data));
        })
        .catch(connError => {
            dispatch(authLoginFail(constants.CONN_ERROR));
        })
};

export const checkExpirationTimeout = (expireTime) => dispatch => {
    setTimeout(() => {
        dispatch(authLogout());
    }, expireTime*1000);
};

export const authLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedUserRole');
    setAuthToken(false);
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const authRegisterSuccess = (successResponse) => {
    return {
        type: actionTypes.AUTH_REGISTER_SUCCESS,
        response: successResponse
    };
};
export const authRegisterFail = (failResponse) => {
    return {
        type: actionTypes.AUTH_REGISTER_FAIL,
        response: failResponse
    }
};

export const authLoginSuccess = (successResponse) => {
    const { token, role } = successResponse.data;

    localStorage.setItem("authToken", token);
    localStorage.setItem("loggedUserRole", role);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    const loginPayload = {
        isAuthenticated: true,
        loggedUser: decoded.email,
        loggedUserRole: role
    };
    return {
        type: actionTypes.AUTH_LOGIN_SUCCESS,
        payload: loginPayload
    };
};

export const authLoginFail = (failResponse) => {
    return {
        type: actionTypes.AUTH_LOGIN_FAIL,
        response: failResponse
    };
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
        loading: true
    };
};

export const authCheckState = () => dispatch => {
    const token = localStorage.getItem('authToken');
    if(!token) {
        dispatch(authLogout());
    }
    else {
        const decoded = jwt_decode(token);
        const expirationTime = decoded.exp;
        const currentTime = Date.now() / 1000;
        if(expirationTime <= currentTime) {
            dispatch(authLogout());
        }
        else {
            const role = localStorage.getItem("loggedUserRole");
            const payload = {
                data: {
                    token,
                    role
                }
            };
            dispatch(authLoginSuccess(payload));
            dispatch(checkExpirationTimeout(expirationTime - currentTime));
        }
    }
};

export const forgotPassword = (values) => dispatch => {
    dispatch(forgotPasswordStart());
    axios.post('/api/auth/send_otp', values)
        .then(res =>{
            dispatch(forgotPasswordSuccess(res))
        })
        .catch(err => {
            dispatch(forgotPasswordFail(err.response.data))
        })
        .catch(connError => {
            dispatch(forgotPasswordFail(constants.CONN_ERROR));
        })
};

export const forgotPasswordStart = () => {
    return {
        type: actionTypes.AUTH_FORGOT_PASSWORD,
        loading: true
    };
};

export const forgotPasswordFail = (failResponse) => {
    return {
        type: actionTypes.AUTH_FORGOT_PASSWORD_FAIL,
        payload: failResponse
    };
};

export const forgotPasswordSuccess = (successResponse) => {
    return {
        type: actionTypes.AUTH_FORGOT_PASSWORD_SUCCESS,
        payload: successResponse
    };
};

export const resendEmail = (values) => dispatch => {
    dispatch(resendEmailStart());
    axios.post('/api/auth/resend_confirm_email', values)
        .then(res =>{
            dispatch(resendEmailSuccess(res))
        })
        .catch(err => {
            dispatch(resendEmailFail(err.response.data))
        })
        .catch(connError => {
            dispatch(resendEmailFail(constants.CONN_ERROR));
        })
};

export const resendEmailStart = () => {
    return {
        type: actionTypes.AUTH_RESEND_EMAIL,
        loading: true
    };
};

export const resendEmailFail = (failResponse) => {
    return {
        type: actionTypes.AUTH_RESEND_EMAIL_FAIL,
        payload: failResponse
    };
};

export const resendEmailSuccess = (successResponse) => {
    return {
        type: actionTypes.AUTH_RESEND_EMAIL_SUCCESS,
        payload: successResponse
    };
};