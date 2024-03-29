import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NavState = {
  open: boolean;
  drawerWidth: number;
};

const initialState: NavState = {
  open: false,
  drawerWidth: 240,
};

export const navSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    toggleNav: (state, action: PayloadAction<void>) => {
      return {
        ...state,
        open: !state.open,
      };
    },
  },
});

// this is for dispatch
export const { toggleNav } = navSlice.actions;

// this is for configureStore
export default navSlice.reducer;
