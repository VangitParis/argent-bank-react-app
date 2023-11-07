import { createSlice } from "@reduxjs/toolkit";
import { connectUser } from "../services/userService";

// initialize userToken from local storage
export const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // connect user
    builder.addCase(connectUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(connectUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userToken = action.payload.userToken;
      state.userInfo = action.payload.body;

    });
    builder.addCase(connectUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
