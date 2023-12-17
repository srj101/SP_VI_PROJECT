import { createSlice } from "@reduxjs/toolkit";
const postSlice = createSlice({
  name: "post",
  initialState: {
    post: null,
  },
  reducers: {
    selectPost: (state, action) => {
      state.post = action.payload.post;
    },
    resetSelectPost: (state) => {
      state.post = null;
    },
  },
});

export const { selectPost, resetSelectPost } = postSlice.actions;
export default postSlice.reducer;
