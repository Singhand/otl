import { createSlice } from "@reduxjs/toolkit";

export const folder = createSlice({
    name: "folder",
    initialState: {
        folders: []
    },
    reducers: {
        load: (state, action) => {
            console.log('load folder', action.payload);
            state.folders = action.payload;
        },
    },
});

export const { load } = folder.actions;

export default folder.reducer;