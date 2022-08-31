import { configureStore } from "@reduxjs/toolkit";
import { boardsApi } from "./api/boardsApi";
import { columnsApi } from "./api/columnsApi";
import { subtasksApi } from "./api/subtasksApi";
import { tasksApi } from "./api/tasksApi";
import boardsReducer from "./boardsSlice";
import navReducer from "./navSlice";

const store = configureStore({
  reducer: {
    nav: navReducer,
    boards: boardsReducer,
    [boardsApi.reducerPath]: boardsApi.reducer,
    [columnsApi.reducerPath]: columnsApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [subtasksApi.reducerPath]: subtasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      boardsApi.middleware,
      columnsApi.middleware,
      tasksApi.middleware,
      subtasksApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
