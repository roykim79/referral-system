import { FETCH_ORGS_NAME } from "../actions/types";

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_ORGS_NAME:
            return action.payload.data || null;
      default:
        return state;
    }
  }