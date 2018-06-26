import { MY_ORG } from "../actions/types";

export default function(state = null, action) {
    switch (action.type) {
        case MY_ORG:
            return action.payload.data || null;
      default:
        return state;
    }
  }