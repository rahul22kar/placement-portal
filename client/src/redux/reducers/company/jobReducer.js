import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    loading: false,
    table_loading: false,
    success: false,
    errors: {},
    approval_status: -1
};

export default function(state = initialState, action) {
    switch(action.type) {
        case actionTypes.COMPANY_JOB_CREATE: return {
            ...state,
            loading: action.loading
        };
        case actionTypes.COMPANY_JOB_CREATE_SUCCESS: return {
            ...state,
            loading: false,
            success: true
        };
        case actionTypes.COMPANY_JOB_CREATE_FAIL: return {
            ...state,
            errors: action.error,
            loading: false,
            success: false
        };
        case actionTypes.COMPANY_JOB_EDIT: return {
            ...state,
            loading: action.loading
        };
        case actionTypes.COMPANY_JOB_EDIT_SUCCESS: return {
            ...state,
            loading: false,
            success: true
        };
        case actionTypes.COMPANY_JOB_EDIT_FAIL: return {
            ...state,
            errors: action.error,
            loading: false,
            success: false
        };
        case actionTypes.GET_COMPANY_JOB: return {
            ...state,
            loading: action.loading
        };
        case actionTypes.GET_COMPANY_JOB_SUCCESS: return {
            ...state,
            ...action.payload,
            loading: false,
            success: true
        };
        case actionTypes.GET_COMPANY_JOB_FAIL: return {
            ...state,
            errors: action.payload.error,
            loading: false,
            success: false
        };
        case actionTypes.DELETE_COMPANY_JOB: return {
            ...state,
            loading: action.loading
        };
        case actionTypes.DELETE_COMPANY_JOB_SUCCESS: return {
            ...state,
            loading: false,
            success: true
        };
        case actionTypes.DELETE_COMPANY_JOB_FAIL: return {
            ...state,
            errors: action.payload.error,
            loading: false,
            success: false
        };
        case actionTypes.GET_STUDENT_PROFILES: return {
            ...state,
            loading: action.loading
        };
        case actionTypes.GET_STUDENT_PROFILES_SUCCESS: return {
            ...state,
            ...action.payload,
            loading: false,
            success: true
        };
        case actionTypes.GET_STUDENT_PROFILES_FAIL: return {
            ...state,
            errors: action.payload.error,
            loading: false,
            success: false
        };
        case actionTypes.AUTH_LOGOUT: return initialState;
        default:
            return state;
    }
}
