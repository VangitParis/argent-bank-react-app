import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../services/userService";

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

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    resetUser: () => {
      return {
        loading: false,
        userInfo: null,
        userToken: null,
        error: null,
        success: false
      }
    },
    updateEmailToRemember: (state, action) => {
      state.userInfo = action.payload
    },
  
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userToken = action.payload.userToken;
      
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { resetUser, updateEmailToRemember } = userSlice.actions;

export default userSlice.reducer;
