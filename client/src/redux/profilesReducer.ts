import { Action } from "./profilesAction";

export interface Data {
    _id: string,
    profile_picture: string,
    name: string,
    email: string,
    phone_number: string
}

export function profilesReducer(preState: Data[] = [], action: Action) {
    Object.freeze(preState);

    switch (action.type) {
        case "ADD":
            return [...preState, action.payload];
        case "DELETE":
            const stateAfterDelete = [...preState];
            for (let i = 0; i < stateAfterDelete.length; i++) {
                if (stateAfterDelete[i]._id === action.payload._id) {
                    stateAfterDelete.splice(i, i + 1);
                    break;
                }
            }
            return stateAfterDelete;
        default:
            return preState;
    }
}
