import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccessToken } from "../lib/types";
interface UserState {
  accessToken: string;
  email: string;
  photo?: string;
  isLoading: boolean;
}

const initialState: UserState = {
  accessToken: "",
  email: "",
  photo: "",
  isLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken: (
      state,
      action: PayloadAction<UserState["accessToken"]>
    ) => {
      window.localStorage.setItem("accessToken", action.payload);
      return {
        ...state,
        accessToken: action.payload,
        isLoading: false,
      };
    },

    resetAccessToken: (state, action) => {
      window.localStorage.removeItem("accessToken");
      return {
        ...state,
        accessToken: "",
        isLoading: false,
      };
    },

    logout: (state, action) => {
      window.localStorage.removeItem("accessToken");
      return {
        ...state,
        accessToken: "null",
        isLoading: true,
      }
    }
  },
});

export const { setAccessToken, resetAccessToken } = userSlice.actions;
export default userSlice.reducer;
