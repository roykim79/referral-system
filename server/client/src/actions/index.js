import axios from 'axios';
import { FETCH_USER, FETCH_REFERRALS, FETCH_TAGS, FETCH_ORGANIZATIONS, FETCH_ORGS_NAME, SUBMIT_NOTE, FETCH_DETAIL, MY_ORG, EMPTY_DETAIL } from './types';
//fetch current logged in user
export const fetchUser = () => {
    let response = axios.get(`/api/current_user`);

    return {type: FETCH_USER, payload: response}
}
//fetches all referrals associated with organization sent and recieved. 
// When dashboard.js mounts we call this, then we will filter results client side
export const fetchReferrals = (type) => {
    let response = axios.get(`/api/referrals/${type}`);

    return {type: FETCH_REFERRALS, payload: response}
}
//this will be used to populate the tag search autosuggest/dropdown also will be used to edit tags on ones own organization
//Returned will be array of objects: {id: tag, text: tag}
export const fetchTags = () => {
    let response = axios.get(`/api/tags`);

    console.log(response)

    return {type: FETCH_TAGS, payload: response}
}
//Used to query organizations once a tag is selected from the dropdown/autosuggest
//page might not be needed now but for expansion purposes.
export const searchOrganizations = (tag, page) =>{
    let BASE_URL = `/api/organizations?`;
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
    let response = axios.get(`/api/organizations/all`);

    return {type: FETCH_ORGS_NAME, payload: response}
}
export const submitNote = (referralId, note) => {
    let response = axios.post(`/api/referrals/${referralId}/notes`, note);

    return {type: SUBMIT_NOTE, payload: response}
}

export const fetchDetail = (referralId) => {
    let response = axios.get(`/api/referrals/${referralId}`);

    return {type: FETCH_DETAIL, payload: response}
}

export const fetchMyOrg = () => {
    let response = axios.get('/api/my_organization');

    return {type: MY_ORG, payload: response};
}

export const unMountState = () => {
  return {type: EMPTY_DETAIL};
}
