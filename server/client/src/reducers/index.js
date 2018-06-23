import { combineReducers } from 'redux';
import authReducer from './authReducer'
import referralsReducer from './referralsReducer';
import tagsReducer from './tagsReducer';
import organizationReducer from './organizationReducer';
import allOrgsReducer from './allOrgsReducer';

export default combineReducers({
    auth: authReducer,
    referrals: referralsReducer,
    tags: tagsReducer,
    organizationSearchResults: organizationReducer,
    allOrgNames: allOrgsReducer
});