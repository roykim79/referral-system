import { FETCH_REFERRALS } from "../actions/types";

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_REFERRALS:
            return action.payload.data || null;
      default:
        return state;
    }
  }