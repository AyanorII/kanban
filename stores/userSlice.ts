import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

    logout: (state) => {
      window.localStorage.removeItem("currentBoard");
      window.localStorage.removeItem("accessToken");
      window.location.href = "/login";

      return state;
    },
  },
});

export const { setAccessToken, resetAccessToken, logout } = userSlice.actions;
export default userSlice.reducer;
