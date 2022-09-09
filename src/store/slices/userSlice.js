import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (_, action) => {
      return {
        isLoggedIn: true,
      };
    },

    logout: (_) => {
      return { ...initialState };
    },
    setReward: (_, action) => {
      return {
        ..._,
        reward: action.payload,
      };
    },
  },
});

export const { login, logout, setReward } = userSlice.actions;

export default userSlice.reducer;
