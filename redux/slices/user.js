import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        quickType2Modal: false,
        quickItem: null,
        adModal: false,
        theme: 0,
        lang: 0,
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
        setTheme: (state, action) => {
            state.theme = action.payload
        },
        setLang: (state, action) => {
            state.lang = action.payload
        },
    },
});

export const { showQuickType2Modal, setQuickItem, showAdModal, setTheme, setLang } = userSlice.actions;

export default userSlice.reducer;
