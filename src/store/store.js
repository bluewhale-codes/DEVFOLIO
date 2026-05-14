import { configureStore } from "@reduxjs/toolkit";
import panelSlice from "./slice/panelSlice";
import userAuthReducer from "./slice/userAuthSlice"

const store = configureStore({
     reducer:{panelSlice,userAuthReducer}
});


export default store;