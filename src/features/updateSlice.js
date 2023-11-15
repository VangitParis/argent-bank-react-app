import { createSlice } from "@reduxjs/toolkit";
import { updateUserProfile } from "../services/userService";


const initialState = {
  loading: false,
  userUpdateInfo: null,
  userToken: null,
  error: null,
  success: false,
};

const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    resetUpdateUser: () => {
      return { ...initialState };
    },
  },
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

export const { resetUpdateUser } = updateSlice.actions;

export default updateSlice.reducer;
