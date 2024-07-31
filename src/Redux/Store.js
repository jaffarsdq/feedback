import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/AuthSlice";
import FeedbackSlice from "./Slices/FeedbackSlice";
import notificationSlice from "./Slices/notificationSlice";

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        feedback: FeedbackSlice,
        notification: notificationSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
    devTools: true,
});

export default store;
