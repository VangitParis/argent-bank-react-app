import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../services/userService";

// Initialisation de userToken dans le local storage
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
/**
 * Le slice Redux pour gérer les informations de l'utilisateur.
 *
 * @type {import("@reduxjs/toolkit").Slice<initialState, {}, string>}
 */
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
    /**
     * Met à jour l'e-mail à mémoriser dans les informations de l'utilisateur.
     *
     * @param {initialState} state - L'état actuel du slice utilisateur.
     * @param {import("@reduxjs/toolkit").PayloadAction<string>} action - L'action Redux contenant le nouvel e-mail.
     */
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
