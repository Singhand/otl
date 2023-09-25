import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        quickType2Modal: false,
        quickItem: null,
    },
    reducers: {
        modifyByValue: (state, action) => {
            console.log(action);
            // state.money += action.payload.value;
            state.money += 1;
        },
    },
});

export const { modifyByValue } = userSlice.actions;

export default userSlice.reducer;
