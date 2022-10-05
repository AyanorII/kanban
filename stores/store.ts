import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import boardsReducer from "./boardsSlice";
import { authMiddleware } from "./middlewares/auth-middleware";
import navReducer from "./navSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    nav: navReducer,
    boards: boardsReducer,
    user: userReducer,
    api: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiSlice.middleware, authMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
