import axios from 'axios';
import { FETCH_USER, FETCH_REFERRALS, FETCH_TAGS } from './types';
const ROOT_URL = 'http://localhost:5000'

export const fetchUser = () => {
    let response = axios.get(`${ROOT_URL}/api/current_user`);

    return {type: FETCH_USER, payload: response}
}

export const fetchReferrals = () => {
    let response = axios.get(`${ROOT_URL}/api/referrals`);

    return {type: FETCH_REFERRALS, payload: response}
}

export const fetchTags = () => {
    let response = axios.get(`${ROOT_URL}/api/tags`);

    return {type: FETCH_TAGS, payload: response}
}
