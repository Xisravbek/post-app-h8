import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    demoId: null,
    isLoading: false,
    isChange: false,
}

const commentSlice = createSlice({
    name :"comment",
    initialState,
    reducers: {
        changeDemoId: (state, action) => {
            state.demoId = action.payload;
        },
        changeComStart: (state) => {
            state.isLoading = true;
        },
        changeComSuccess: (state) => {
            state.isLoading = false;
            state.isChange = !state.isChange;
        },
        changeComFailure: (state) => {
            state.isLoading = false;
        },
    }
})

export const { changeDemoId, changeComStart, changeComSuccess, changeComFailure  } =  commentSlice.actions;
export default commentSlice.reducer;