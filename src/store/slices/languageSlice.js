import { createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAGE_KEY = "langConfig";

const defaultState = {
  lang: "ko",
};

const initialState = defaultState;

const langConfigSlice = createSlice({
  name: "langSetting",
  initialState,
  reducers: {
    changeLangSetting: (_, action) => {
      return {
        lang: action.payload,
      };
    },
  },
});

export const { changeLangSetting } = langConfigSlice.actions;
export default langConfigSlice.reducer;
