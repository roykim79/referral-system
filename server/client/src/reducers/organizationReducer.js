import { FETCH_ORGANIZATIONS } from "../actions/types";

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_ORGANIZATIONS:
            return action.payload.data || null;
      default:
        return state;
    }
  }