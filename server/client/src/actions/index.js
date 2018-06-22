import axios from 'axios';
import { FETCH_USER, FETCH_REFERRALS } from './types';
const ROOT_URL = 'http://localhost:5000'

export const fetchUser = () => {
    const response = axios.get(`${ROOT_URL}/api/current_user`);

    return {type: FETCH_USER, payload: response}
}

export const fetchReferrals = () => {
    const response = axios.get(`${ROOT_URL}/api/referrals`);

    return {type: FETCH_REFERRALS, payload: response}
}