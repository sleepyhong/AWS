import { createStore } from "redux";
import { profilesReducer } from "./profilesReducer";

const store = createStore(profilesReducer);

export default store;