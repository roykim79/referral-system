import { SUBMIT_NOTE, FETCH_DETAIL, EMPTY_DETAIL , UPDATE_DETAIL } from "../actions/types";

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_DETAIL:

            return action.payload.data || null;
        case SUBMIT_NOTE:

            return action.payload.data || null;

        case UPDATE_DETAIL:

            return action.payload.data || null;


        case EMPTY_DETAIL:

            return null;
        default:
            return state;
    }
}
