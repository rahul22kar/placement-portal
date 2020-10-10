import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    profileExists: false,
    loading: {
        profile: false,
        edit: false,
        tabs: false,
        page: false
    },
    approval_status: -1,
    active_status: false,
    success: false,
    profileData: {},
    jobs: [],
    errors: {},
    announcements: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case actionTypes.STUDENT_PROFILE_CREATE: return {
            ...state,
            success: false,
            loading: {
                ...state.loading,
                page: action.loading
            }
        };
        case actionTypes.STUDENT_PROFILE_CREATE_SUCCESS: return {
            ...state,
            loading: {
                ...state.loading,
                page: false
            },
            success: true
        };
        case actionTypes.STUDENT_PROFILE_CREATE_FAIL: return {
            ...state,
            errors: action.payload.error,
            loading: {
                ...state.loading,
                page: false
            },
            success: false
        };
        case actionTypes.STUDENT_PROFILE_EDIT: return {
            ...state,
            success: false,
            loading: {
                ...state.loading,
                edit: action.loading
            }
        };
        case actionTypes.STUDENT_PROFILE_EDIT_SUCCESS: return {
            ...state,
            loading: {
                ...state.loading,
                edit: false
            },
            success: true
        };
        case actionTypes.STUDENT_PROFILE_EDIT_FAIL: return {
            ...state,
            errors: action.payload.error,
            loading: {
                ...state.loading,
                edit: false
            },
            success: false
        };
        case actionTypes.STUDENT_PROFILE_FETCH: return {
            ...state,
            success: false,
            loading: {
                ...state.loading,
                page: action.loading
            }
        };
        case actionTypes.STUDENT_PROFILE_FETCH_SUCCESS: return {
            ...state,
            ...action.payload,
            loading: {
                ...state.loading,
                page: false
            },
            success: true,
            profileExists: true
        };
        case actionTypes.STUDENT_PROFILE_FETCH_FAIL: return {
            ...state,
            errors: action.payload.error,
            loading: {
                ...state.loading,
                page: false
            },
            success: false
        };
        case actionTypes.STUDENT_PROFILE_ADD_EXPERIENCE: return {
            ...state,
            success: false,
            loading: {
                ...state.loading,
                page: action.loading
            }
        };
        case actionTypes.STUDENT_PROFILE_ADD_EXPERIENCE_SUCCESS: return {
            ...state,
            loading: {
                ...state.loading,
                page: false
            },
            success: true
        };
        case actionTypes.STUDENT_PROFILE_ADD_EXPERIENCE_FAIL: return {
            ...state,
            loading: {
                ...state.loading,
                page: false
            },
            errors: action.payload.error,
            success: false
        };
        case actionTypes.STUDENT_PROFILE_EDIT_EXPERIENCE: return {
            ...state,
            success: false,
            loading: {
                ...state.loading,
                tab: action.loading,
                edit: action.loading
            }
        };
        case actionTypes.STUDENT_PROFILE_EDIT_EXPERIENCE_SUCCESS: return {
            ...state,
            loading: {
                ...state.loading,
                tab: false,
                edit: false
            },
            success: true
        };
        case actionTypes.STUDENT_PROFILE_EDIT_EXPERIENCE_FAIL: return {
            ...state,
            loading: {
                ...state.loading,
                tab: false,
                edit: false
            },
            errors: action.payload.error,
            success: false
        };
        case actionTypes.STUDENT_PROFILE_REMOVE_EXPERIENCE: return {
            ...state,
            success: false,
            loading: {
                ...state.loading,
                tab: action.loading
            }
        };
        case actionTypes.STUDENT_PROFILE_REMOVE_EXPERIENCE_SUCCESS: return {
            ...state,
            loading: {
                ...state.loading,
                tab: false
            },
            success: true
        };
        case actionTypes.STUDENT_PROFILE_REMOVE_EXPERIENCE_FAIL: return {
            ...state,
            loading: {
                ...state.loading,
                tab: false
            },
            errors: action.payload.error,
            success: false
        };
        case actionTypes.STUDENT_PROFILE_ADD_PROJECT: return {
            ...state,
            success: false,
            loading: {
                ...state.loading,
                page: action.loading
            }
        };
        case actionTypes.STUDENT_PROFILE_ADD_PROJECT_SUCCESS: return {
            ...state,
            loading: {
                ...state.loading,
                page: false
            },
            success: true
        };
        case actionTypes.STUDENT_PROFILE_ADD_PROJECT_FAIL: return {
            ...state,
            loading: {
                ...state.loading,
                page: false
            },
            errors: action.payload.error,
            success: false
        };
        case actionTypes.STUDENT_PROFILE_EDIT_PROJECT: return {
            ...state,
            success: false,
            loading: {
                ...state.loading,
                tab: action.loading,
                edit: action.loading
            }
        };
        case actionTypes.STUDENT_PROFILE_EDIT_PROJECT_SUCCESS: return {
            ...state,
            loading: {
                ...state.loading,
                tab: false,
                edit: false
            },
            success: true
        };
        case actionTypes.STUDENT_PROFILE_EDIT_PROJECT_FAIL: return {
            ...state,
            loading: {
                ...state.loading,
                tab: false,
                edit: false
            },
            errors: action.payload.error,
            success: false
        };
        case actionTypes.STUDENT_PROFILE_REMOVE_PROJECT: return {
            ...state,
            success: false,
            loading: {
                ...state.loading,
                tab: action.loading
            }
        };
        case actionTypes.STUDENT_PROFILE_REMOVE_PROJECT_SUCCESS: return {
            ...state,
            loading: {
                ...state.loading,
                tab: false
            },
            success: true
        };
        case actionTypes.STUDENT_PROFILE_REMOVE_PROJECT_FAIL: return {
            ...state,
            loading: {
                ...state.loading,
                tab: false
            },
            errors: action.payload.error,
            success: false
        };
        case actionTypes.STUDENT_CREATE_QUERY: return {
            ...state,
            success: false,
            loading: {
                ...state.loading,
                tabs: action.loading
            }
        };
        case actionTypes.STUDENT_CREATE_QUERY_SUCCESS: return {
            ...state,
            loading: {
                ...state.loading,
                tabs: false
            },
            success: true
        };
        case actionTypes.STUDENT_CREATE_QUERY_FAIL: return {
            ...state,
            loading: {
                ...state.loading,
                tabs: false
            },
            errors: action.payload.error,
            success: false
        };
        case actionTypes.STUDENT_REPORT_BUG: return {
            ...state,
            success: false,
            loading: {
                ...state.loading,
                tabs: action.loading
            }
        };
        case actionTypes.STUDENT_REPORT_BUG_SUCCESS: return {
            ...state,
            loading: {
                ...state.loading,
                tabs: false
            },
            success: true
        };
        case actionTypes.STUDENT_REPORT_BUG_FAIL: return {
            ...state,
            loading: {
                ...state.loading,
                tabs: false
            },
            errors: action.payload.error,
            success: false
        };
        case actionTypes.STUDENT_FETCH_ANNOUNCEMENTS: return {
            ...state,
            loading: {
                ...state.loading,
                tabs: action.loading
            }
        };
        case actionTypes.STUDENT_FETCH_ANNOUNCEMENTS_SUCCESS: return {
            ...state,
            loading: {
                ...state.loading,
                tabs: false
            },
            announcements: action.payload.data,
            success: true
        };
        case actionTypes.STUDENT_FETCH_ANNOUNCEMENTS_FAIL: return {
            ...state,
            loading: {
                ...state.loading,
                tabs: false
            },
            errors: action.payload.error,
            success: false
        };
        case actionTypes.STUDENT_RESET_PASSWORD: return {
            ...state,
            success: false,
            loading: {
                ...state.loading,
                tabs: action.loading
            }
        };
        case actionTypes.STUDENT_RESET_PASSWORD_FAIL: return {
            ...state,
            loading: {
                ...state.loading,
                tabs: false
            },
            errors: action.payload.error,
            success: false
        };
        case actionTypes.STUDENT_RESET_PASSWORD_SUCCESS: return {
            ...state,
            loading: {
                ...state.loading,
                tabs: false
            },
            errors: {},
            success: true
        };
        case actionTypes.STUDENT_GET_JOBS: return {
            ...state,
            success: false,
            loading: {
                ...state.loading,
                profile: action.loading
            }
        };
        case actionTypes.STUDENT_GET_JOBS_FAIL: return {
            ...state,
            loading: {
                ...state.loading,
                profile: false
            },
            errors: action.payload.error,
            success: false
        };
        case actionTypes.STUDENT_GET_JOBS_SUCCESS: return {
            ...state,
            loading: {
                ...state.loading,
                profile: false
            },
            jobs: action.payload.data,
            errors: {},
            success: true
        };
        case actionTypes.AUTH_LOGOUT: return initialState;
        default:
            return state;
    }
}
