import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    isAuthenticated: false,
    loggedUser: null,
    loggedUserRole: null,
    success: false,
    forgot_pwd_success: false,
    resend_email_success: false,
    loading: false,
    errors: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case actionTypes.AUTH_START: return {
            ...state,
            loading: action.loading,
            success: false
        };
        case actionTypes.AUTH_REGISTER_SUCCESS: return {
            ...state,
            loading: false,
            success: true
        };
        case actionTypes.AUTH_REGISTER_FAIL: return {
            ...state,
            loading: false,
            errors: action.response.error
        };
        case actionTypes.AUTH_LOGIN_SUCCESS: return {
            ...state,
            ...action.payload,
            loading: false,
            success: true
        };
        case actionTypes.AUTH_LOGIN_FAIL: return {
            ...state,
            loading: false,
            errors: action.response.error,
            success: false
        };
        case actionTypes.AUTH_FORGOT_PASSWORD: return {
            ...state,
            loading: true,
            forgot_pwd_success: false
        };
        case actionTypes.AUTH_FORGOT_PASSWORD_SUCCESS: return {
            ...state,
            loading: false,
            forgot_pwd_success: true
        };
        case actionTypes.AUTH_FORGOT_PASSWORD_FAIL: return {
            ...state,
            loading: false,
            forgot_pwd_success: false,
            errors: action.payload.error
        };
        case actionTypes.AUTH_RESEND_EMAIL: return {
            ...state,
            loading: true,
            resend_email_success: false
        };
        case actionTypes.AUTH_RESEND_EMAIL_SUCCESS: return {
            ...state,
            loading: false,
            resend_email_success: true
        };
        case actionTypes.AUTH_RESEND_EMAIL_FAIL: return {
            ...state,
            loading: false,
            resend_email_success: false,
            errors: action.payload.error
        };
        case actionTypes.AUTH_LOGOUT: return initialState;
        default:
            return state;
    }
}