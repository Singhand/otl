import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import folder from "./slices/folder";
import item from "./slices/item";
import quick from "./slices/quick";
import history from "./slices/history"

export default configureStore({
    reducer: {
        user: userReducer,
        folder: folder,
        item: item,
        quick: quick,
        history: history,
    },
});