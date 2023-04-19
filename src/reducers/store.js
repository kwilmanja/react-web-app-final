import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../services/auth-reducer";

const store = configureStore({
                                 reducer: {
                                     auth: authReducer,
                                 },
                             });

export default store;