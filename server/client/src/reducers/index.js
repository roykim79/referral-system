import { combineReducers } from 'redux';
import authReducer from './authReducer'
import referralsReducer from './referralsReducer';
import tagsReducer from './tagsReducer';

export default combineReducers({
    auth: authReducer,
    referrals: referralsReducer,
    tags: tagsReducer
});