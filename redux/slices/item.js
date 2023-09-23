import { createSlice } from "@reduxjs/toolkit";

export const item = createSlice({
    name: "item",
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

export const { load } = item.actions;

export default item.reducer;