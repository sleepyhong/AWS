import store from "./store";
import { Data } from "./profilesReducer";

export type Action = {
    type: string,
    payload: Data
}

export const addProfile = (data: Data) => {
    store.dispatch({
        type: "ADD",
        payload: data
    });
};