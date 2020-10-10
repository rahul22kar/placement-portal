import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    profileExists: false,
    loading: {
        page: false,
        edit: false
    },
    active_status: false,
    success: false,
    profileData: {},
    errors: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case actionTypes.COMPANY_PROFILE_CREATE: return {
            ...state,
            loading: {
                ...state.loading,
                page: action.loading
            }
        };
        case actionTypes.COMPANY_PROFILE_CREATE_SUCCESS: return {
            ...state,
            loading: {
                ...state.loading,
                page: false
            },
            success: true
        };
        case actionTypes.COMPANY_PROFILE_CREATE_FAIL: return {
            ...state,
            errors: action.payload.error,
            loading: {
                ...state.loading,
                page: false
            },
            success: false
        };
        case actionTypes.COMPANY_PROFILE_EDIT: return {
            ...state,
            loading: {
                ...state.loading,
                edit: action.loading
            }
        };
        case actionTypes.COMPANY_PROFILE_EDIT_SUCCESS: return {
            ...state,
            loading: {
                ...state.loading,
                edit: false
            },
            success: true
        };
        case actionTypes.COMPANY_PROFILE_EDIT_FAIL: return {
            ...state,
            errors: action.payload.error,
            loading: {
                ...state.loading,
                edit: false
            },
            success: false
        };
        case actionTypes.COMPANY_PROFILE_FETCH: return {
            ...state,
            loading: {
                ...state.loading,
                page: action.loading
            }
        };
        case actionTypes.COMPANY_PROFILE_FETCH_SUCCESS: return {
            ...state,
            ...action.payload,
            loading: {
                ...state.loading,
                page: false
            },
            success: true,
            profileExists: true
        };
        case actionTypes.COMPANY_PROFILE_FETCH_FAIL: return {
            ...state,
            errors: action.payload.error,
            loading: {
                ...state.loading,
                page: false
            },
            success: false
        };
        case actionTypes.AUTH_LOGOUT: return initialState;
        default:
            return state;
    }
}
