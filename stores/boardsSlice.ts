import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Board } from "../lib/types";

type BoardState = {
  currentBoard: Board | null;
};

const initialState: BoardState = {
  currentBoard: null,
};

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setCurrentBoard(state, action: PayloadAction<Board | null>) {
      window.localStorage.setItem(
        "currentBoard",
        JSON.stringify(action.payload)
      );
      return {
        ...state,
        currentBoard: action.payload,
      };
    },
    resetCurrentBoard(state, _action) {
      window.localStorage.removeItem("currentBoard");

      return {
        ...state,
        currentBoard: null,
      };
    },
  },
});

// this is for dispatch
export const { setCurrentBoard, resetCurrentBoard } = boardsSlice.actions;

// this is for configureStore
export default boardsSlice.reducer;
