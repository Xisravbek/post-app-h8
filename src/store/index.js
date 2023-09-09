import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slice/authSlice";
import postSlice from "./slice/postSlice";
import commentSlice from "./slice/commentSlice";

export const store = configureStore({
    reducer: {
        authSlice,
        postSlice,
        commentSlice,
    }
})