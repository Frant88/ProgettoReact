import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice/authSlice";
import { cardReducer } from "./card/slice/cardSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cards: cardReducer
    }
})