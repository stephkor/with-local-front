import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  postId: "",
  category: "",
  value: "",
  likeCount: 0,
  commentCount: 0,
  isLiked: false,
  createdAt: "",
  images: [],
};

const initialState = defaultState;

const contentSlice = createSlice({
  name: "contentInfo",
  initialState,
  reducers: {
    setContentInfo: (state, action) => {
      return {
        content: {
          ...action.payload,
        },
      };
    },
  },
});

export const { setContentInfo } = contentSlice.actions;
export default contentSlice.reducer;
