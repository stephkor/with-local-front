import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState extends User {
  isLoggedIn: boolean;
}

const initialState: UserState = {
  username: "",
  role: "USER",
  isLoggedIn: false,
};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (_, action: PayloadAction<User>) => {
      return {
        isLoggedIn: true,
        ...action.payload,
      };
    },
    logout: () => {
      return { ...initialState };
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
