import { FETCH_TAGS } from "../actions/types";

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_TAGS:
            return action.payload.data || null;
      default:
        return state;
    }
  }