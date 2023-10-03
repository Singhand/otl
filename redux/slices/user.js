import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        quickType2Modal: false,
        quickItem: null,
        adModal: false,
    },
    reducers: {
        showQuickType2Modal: (state, action) => {
            state.quickType2Modal = action.payload
        },
        setQuickItem: (state, action) => {
            state.quickItem = action.payload
        },
        showAdModal: (state, action) => {
            state.adModal = action.payload
        },
    },
});

export const { showQuickType2Modal, setQuickItem, showAdModal } = userSlice.actions;

export default userSlice.reducer;
