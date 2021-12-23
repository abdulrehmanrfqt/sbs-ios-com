import { CURRENT_PROFILE, LOGOUT, SWITCH_PROFILE } from "../actions/types";

const initialState={};

export default function currentProfile(state=initialState,action){
    switch(action.type){
        case CURRENT_PROFILE:
            return action.payload;
        case LOGOUT:
            return {}
        case SWITCH_PROFILE:
            return {}
        default:
            return state
    }
}