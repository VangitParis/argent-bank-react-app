import { createSlice } from "@reduxjs/toolkit";
import { updateUserProfile } from "../services/userService";

// initialize userToken from local storage
export const userTokenUpdated= localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userUpdateInfo: null,
  userTokenUpdated,
  error: null,
  success: false,
};

const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // connect user
    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userToken = action.payload.userToken;
      state.userUpdateInfo = action.payload.body;

    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default updateSlice.reducer;
