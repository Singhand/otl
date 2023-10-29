import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        quickType2Modal: false,
        quickItem: null,
        adModal: false,
        theme: 0,
        lang: 0,
        helpFirst1: false,
        helpFirst2: false,
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
        setHelpFirst1: (state, action) => {
            state.helpFirst1 = action.payload
        },
        setHelpFirst2: (state, action) => {
            state.helpFirst2 = action.payload
        },
    },
});

export const { showQuickType2Modal, setQuickItem, showAdModal, setTheme, setLang, setHelpFirst1, setHelpFirst2 } = userSlice.actions;

export default userSlice.reducer;
