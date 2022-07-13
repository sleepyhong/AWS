import { Action } from "./profilesAction";

export interface Data {
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
        default:
            return preState;
    }
}
