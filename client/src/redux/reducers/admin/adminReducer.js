import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    student_profiles: [],
    company_profiles: [],
    jobs: [],
    success: false,
    ui: {
        table_loading: false,
        page_loading: false
    },
    errors: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case actionTypes.AUTH_LOGOUT: return initialState;

        case actionTypes.ADMIN_GET_STUDENT_PROFILES: return{
            ...state,
            table_loading: action.loading,
            success: false
        };

        case actionTypes.ADMIN_GET_STUDENT_PROFILES_FAIL: return{
            ...state,
            errors: action.payload.error,
            success: false,
            table_loading: false
        };

        case actionTypes.ADMIN_GET_STUDENT_PROFILES_SUCCESS: return{
            ...state,
            student_profiles: action.payload.data,
            table_loading: false
        };

        case actionTypes.ADMIN_APPROVE_STUDENT_PROFILE: return{
            ...state,
            table_loading: action.loading,
            success: false
        };

        case actionTypes.ADMIN_APPROVE_STUDENT_PROFILE_FAIL: return{
            ...state,
            errors: action.payload.error,
            success: false,
            table_loading: false
        };

        case actionTypes.ADMIN_APPROVE_STUDENT_PROFILE_SUCCESS: return{
            ...state,
            ...action.payload,
            table_loading: false
        };

        case actionTypes.ADMIN_DISAPPROVE_STUDENT_PROFILE: return{
            ...state,
            table_loading: action.loading,
            success: false
        };

        case actionTypes.ADMIN_DISAPPROVE_STUDENT_PROFILE_FAIL: return{
            ...state,
            errors: action.payload.error,
            success: false,
            table_loading: false
        };

        case actionTypes.ADMIN_DISAPPROVE_STUDENT_PROFILE_SUCCESS: return{
            ...state,
            ...action.payload,
            table_loading: false
        };

        case actionTypes.ADMIN_CREATE_COMPANY_LOGIN: return{
            ...state,
            page_loading: action.loading,
            success: false
        };

        case actionTypes.ADMIN_CREATE_COMPANY_LOGIN_SUCCESS: return{
            ...state,
            ...action.payload,
            page_loading: false
        };

        case actionTypes.ADMIN_CREATE_COMPANY_LOGIN_FAIL: return{
            ...state,
            errors: action.payload.error,
            success: false,
            page_loading: false
        };

        case actionTypes.ADMIN_GET_COMPANY_PROFILES: return{
            ...state,
            table_loading: action.loading,
            success: false
        };

        case actionTypes.ADMIN_GET_COMPANY_PROFILES_FAIL: return{
            ...state,
            errors: action.payload.error,
            success: false,
            table_loading: false
        };

        case actionTypes.ADMIN_GET_COMPANY_PROFILES_SUCCESS: return{
            ...state,
            company_profiles: action.payload.data,
            table_loading: false
        };

        case actionTypes.ADMIN_CREATE_ANNOUNCEMENT: return{
            ...state,
            page_loading: action.loading,
            success: false
        };

        case actionTypes.ADMIN_CREATE_ANNOUNCEMENT_FAIL: return{
            ...state,
            errors: action.payload.error,
            success: false,
            page_loading: false
        };

        case actionTypes.ADMIN_CREATE_ANNOUNCEMENT_SUCCESS: return{
            ...state,
            page_loading: false
        };

        case actionTypes.ADMIN_APPROVE_STUDENT_CV_FAIL: return{
            ...state,
            errors: action.payload.error,
            success: false
        };

        case actionTypes.ADMIN_APPROVE_STUDENT_CV_SUCCESS: return{
            ...state,
            success: true
        };

        case actionTypes.ADMIN_DISAPPROVE_COMPANY_PROFILE_FAIL: return{
            ...state,
            errors: action.payload.error,
            success: false
        };

        case actionTypes.ADMIN_DISAPPROVE_COMPANY_PROFILE_SUCCESS: return{
            ...state,
            success: true
        };

        case actionTypes.ADMIN_DISABLE_STUDENT_PROFILE: return{
            ...state,
            table_loading: action.loading,
            success: false
        };

        case actionTypes.ADMIN_DISABLE_STUDENT_PROFILE_FAIL: return{
            ...state,
            errors: action.payload.error,
            success: false,
            table_loading: false
        };

        case actionTypes.ADMIN_DISABLE_STUDENT_PROFILE_SUCCESS: return{
            ...state,
            ...action.payload,
            table_loading: false
        };

        case actionTypes.ADMIN_ENABLE_STUDENT_PROFILE: return{
            ...state,
            table_loading: action.loading,
            success: false
        };

        case actionTypes.ADMIN_ENABLE_STUDENT_PROFILE_FAIL: return{
            ...state,
            errors: action.payload.error,
            success: false,
            table_loading: false
        };

        case actionTypes.ADMIN_ENABLE_STUDENT_PROFILE_SUCCESS: return{
            ...state,
            ...action.payload,
            table_loading: false
        };

        case actionTypes.ADMIN_DOWNLOAD_DATA: return{
            ...state,
            success: false
        };

        case actionTypes.ADMIN_DOWNLOAD_DATA_FAIL: return{
            ...state,
            errors: action.payload.error,
            success: false,
        };

        case actionTypes.ADMIN_DOWNLOAD_DATA_SUCCESS: return{
            ...state
        };

        default:
            return state;

    }
}
