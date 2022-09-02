import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import boardsReducer from "./boardsSlice";
import navReducer from "./navSlice";

const store = configureStore({
  reducer: {
    nav: navReducer,
    boards: boardsReducer,

    api: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiSlice.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
