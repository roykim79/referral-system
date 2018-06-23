import axios from 'axios';
import { FETCH_USER, FETCH_REFERRALS, FETCH_TAGS, FETCH_ORGANIZATIONS, FETCH_ORGS_NAME } from './types';
export const ROOT_URL = 'http://localhost:5000'
//fetch current logged in user
export const fetchUser = () => {
    let response = axios.get(`${ROOT_URL}/api/current_user`);

    return {type: FETCH_USER, payload: response}
}
//fetches all referrals associated with organization sent and recieved. 
// When dashboard.js mounts we call this, then we will filter results client side
export const fetchReferrals = () => {
    let response = axios.get(`${ROOT_URL}/api/referrals`);

    return {type: FETCH_REFERRALS, payload: response}
}
//this will be used to populate the tag search autosuggest/dropdown also will be used to edit tags on ones own organization
//Returned will be array of objects: {id: tag, text: tag}
export const fetchTags = () => {
    let response = axios.get(`${ROOT_URL}/api/tags`);

    return {type: FETCH_TAGS, payload: response}
}
//Used to query organizations once a tag is selected from the dropdown/autosuggest
//page might not be needed now but for expansion purposes. 
export const searchOrganizations = (tag, page) =>{
    let BASE_URL = `${ROOT_URL}/api/organizations?`;
    if(tag) {
        BASE_URL.concat(`tag=${tag}`);
    } 
    if (page) {
        BASE_URL.concat(`page=${page}`);
    }

    let response = axios.get(BASE_URL)

    return {type: FETCH_ORGANIZATIONS, payload: response};
}
//This will fetch all organizations names and Ids, will return array of objects {id: _id, name: name}
//This will be used to populate the autosuggest search while creating a referral.
export const fetchAllOrgs = () => {
    let response = axios.get(`${ROOT_URL}/api/organizations/all`);

    return {type: FETCH_ORGS_NAME, payload: response}
}