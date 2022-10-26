import { createSlice } from "@reduxjs/toolkit";
interface UserState {
  accessToken: string;
  user: {
    email: string;
    photo?: string;
    name?: string;
  };
  isLoading: boolean;
}

const initialState: UserState = {
  accessToken: "",
  user: {
    email: "",
    photo: "",
    name: "",
  },
  isLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      window.localStorage.setItem("accessToken", action.payload);

      const isInAuthPage =
        window.location.pathname === "/login" ||
        window.location.pathname === "/signup";

      if (isInAuthPage) {
        window.location.href = "/";
      }

      return {
        ...state,
        accessToken: action.payload,
        isLoading: false,
      };
    },

    setUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },

    logout: (state) => {
      window.localStorage.clear();
      window.location.href = "/login";

      return state;
    },
  },
});

export const { setAccessToken, setUser, logout } = userSlice.actions;
export default userSlice.reducer;
