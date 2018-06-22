import axios from 'axios';
import { FETCH_USER } from './types';
const ROOT_URL = 'http://localhost:5000'

export const fetchUser = () => {
    const response = axios.get(`${ROOT_URL}/api/current_user`)

    return {type: FETCH_USER, payload: response}
}