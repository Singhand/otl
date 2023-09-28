import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/user";
import folder from "./slices/folder";
import item from "./slices/item";
import quick from "./slices/quick";
import history from "./slices/history"

export default configureStore({
    reducer: {
        user,
        folder,
        item,
        quick,
        history,
    },
});