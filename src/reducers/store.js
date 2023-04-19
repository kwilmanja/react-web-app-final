import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../services/auth-reducer.js";
import followsReducer from "../follows/follows-reducer.js";

const store = configureStore({
                                 reducer: {
                                     auth: authReducer,
                                     follows: followsReducer,
                                 },
                             });

export default store;