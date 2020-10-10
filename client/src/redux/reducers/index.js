import { combineReducers } from 'redux';
import authReducer from './authentication/authReducer';
import profileReducer from './students/profileReducer';
import jobReducer from './company/jobReducer'
import companyProfileReducer from './company/profileReducer'
import uiReducer from './ui/uiReducer'
import adminReducer from './admin/adminReducer';

export default combineReducers({
    auth: authReducer,
    profile: profileReducer,
    job: jobReducer,
    company_profile: companyProfileReducer,
    ui: uiReducer,
    admin: adminReducer
});
