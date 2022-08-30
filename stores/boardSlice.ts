import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Board } from "../lib/types";

type BoardState = {
  boards: Board[];
  currentBoard: Board | null;
}

export const boardsSlice = createSlice({
  name: "boards",
  initialState: {currentBoard: null, boards: []} as BoardState,
  reducers: {
    setCurrentBoard(state, action: PayloadAction<Board>) {
      state.currentBoard = action.payload;
    },
    setBoards: (state, action: PayloadAction<Board[]>) => {
      state.boards = action.payload;

      return state
    },
  },
});

// this is for dispatch
export const { setBoards, setCurrentBoard } = boardsSlice.actions;

// this is for configureStore
export default boardsSlice.reducer;
