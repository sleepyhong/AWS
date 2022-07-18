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

export const deleteProfile = (data: Data) => {
    store.dispatch({
        type: "DELETE",
        payload: data
    })
}

export const updateProfile = (data: Data) => {
    store.dispatch({
        type: "UPDATE",
        payload: data
    })
}

export const clearProfiles = () => {
    store.dispatch({
        type: "CLEAR",
        payload: {
            _id: "",
            profile_picture: "",
            name: "",
            email: "",
            phone_number: ""
        }
    })
}