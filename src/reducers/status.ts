import { StatusActionTypes } from "../actions/status";
import { ActionType } from "../types/actionType";
import { StatusTypes } from "../types/statusTypes";

const initialState: StatusTypes = {
    busy: false,
}

const Status = (state = initialState, action: ActionType) => {
    const { type } = action;
    switch(type) {
        case StatusActionTypes.IS_BUSY: {
            return {state, ...{ busy: true }};
        }
        case StatusActionTypes.IS_NOT_BUSY: {
            return { state, ...{ busy: false } };
        }
        default: return state;
    }
}

export default Status;
