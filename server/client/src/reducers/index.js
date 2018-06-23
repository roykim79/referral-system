import { combineReducers } from 'redux';
import authReducer from './authReducer'
import referralsReducer from './referralsReducer';
import tagsReducer from './tagsReducer';
import organizationReducer from './organizationReducer';

export default combineReducers({
    auth: authReducer,
    referrals: referralsReducer,
    tags: tagsReducer,
    organizationResults: organizationReducer
});