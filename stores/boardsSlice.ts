import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Board, Column } from "../lib/types";

type BoardState = {
  currentBoard: Board | null;
  columns: Column[];
};

const initialState: BoardState = {
  currentBoard: null,
  columns: [],
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
    setCurrentBoardColumn(state, action: PayloadAction<Column[]>) {
      return {
        ...state,
        columns: action.payload,
      };
    }
  },
});

// this is for dispatch
export const { setCurrentBoard, setCurrentBoardColumn } = boardsSlice.actions;

// this is for configureStore
export default boardsSlice.reducer;
