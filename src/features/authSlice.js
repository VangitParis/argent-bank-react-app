import { createSlice } from "@reduxjs/toolkit";
import { connectUser } from "../services/userService";

// get userToken from local storage
export const userToken = localStorage.getItem("userToken") || null;

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
  reducers: {
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },

    resetAuthUser: () => {
      return { ...initialState };
    },
  },

  extraReducers: (builder) => {
    // connect user
    builder.addCase(connectUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(connectUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userInfo = action.payload;
    });
    builder.addCase(connectUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setUserToken, resetAuthUser } = authSlice.actions;

export default authSlice.reducer;
