import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLoading : false,
    user: null,
    
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        loginFailure : (state) => {
            state.isLoading = false;
        },
        registerStart : (state) => {
            state.isLoading = true;
        },
        registerSuccess : (state) => {
            state.isLoading = false;
        },
        registerFailure : (state) => {
            state.isLoading = false;
        },

    }
})

export const { loginStart, loginFailure, loginSuccess, registerFailure, registerStart, registerSuccess  } = authSlice.actions;
export default authSlice.reducer;