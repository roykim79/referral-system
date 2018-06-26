import { SUBMIT_NOTE, FETCH_DETAIL } from "../actions/types";

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_DETAIL:
            return action.payload.data || null;
        case SUBMIT_NOTE: 
            return action.payload.data || null;
        default:
        return state;
    }
  }