import { configureStore } from "@reduxjs/toolkit";
import panelSlice from "./slice/panelSlice";
const store = configureStore({
     reducer:{panelSlice}
});

export default store;