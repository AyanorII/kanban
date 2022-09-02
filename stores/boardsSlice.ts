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
    setCurrentBoard(state, action: PayloadAction<Board>) {
      return {
        ...state,
        currentBoard: action.payload,
      };
    },
  },
});

// this is for dispatch
export const { setCurrentBoard } = boardsSlice.actions;

// this is for configureStore
export default boardsSlice.reducer;
