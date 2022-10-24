import { createSlice } from "@reduxjs/toolkit";
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
    setAccessToken: (state, action) => {
      window.localStorage.setItem("accessToken", action.payload);

      const isInAuthPage = window.location.pathname === "/login";
      if (isInAuthPage) {
        window.location.href = "/";
      }

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
      window.localStorage.clear();
      window.location.href = "/login";

      return state;
    },
  },
});

export const { setAccessToken, resetAccessToken, logout } = userSlice.actions;
export default userSlice.reducer;
