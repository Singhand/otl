import { createSlice } from "@reduxjs/toolkit";

export const history = createSlice({
    name: "history",
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

export const { load } = history.actions;

export default history.reducer;