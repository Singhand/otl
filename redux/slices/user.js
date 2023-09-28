import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        quickType2Modal: false,
        quickItem: null,
    },
    reducers: {
        showQuickType2Modal: (state, action) => {
            state.quickType2Modal = action.payload
        },
        setQuickItem: (state, action) => {
            state.quickItem = action.payload
        },
    },
});

export const { showQuickType2Modal, setQuickItem } = userSlice.actions;

export default userSlice.reducer;
