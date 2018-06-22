import { combineReducers } from 'redux';
import authReducer from './authReducer'
import referralsReducer from './referralsReducer';

export default combineReducers({
    auth: authReducer,
    referrals: referralsReducer
});