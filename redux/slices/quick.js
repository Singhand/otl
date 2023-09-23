import { createSlice } from "@reduxjs/toolkit";

export const quick = createSlice({
    name: "quick",
    initialState: {
        items: {}
    },
    reducers: {
        load: (state, action) => {
            console.log('load', action.payload);
            state.items[`${action.payload.id}`] = action.payload.items;
        },
    },
});

export const { load } = quick.actions;

export default quick.reducer;