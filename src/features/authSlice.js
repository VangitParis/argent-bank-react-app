import { createSlice } from "@reduxjs/toolkit";
import { connectUser } from "../services/userService";

// Récupérer le token du local storage
export const userToken = localStorage.getItem("userToken") || null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
};
/**
 * Le slice Redux pour gérer l'authentification de l'utilisateur.
 *
 * @type {import("@reduxjs/toolkit").Slice<initialState, {}, string>}
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Définit le token d'authentification de l'utilisateur.
     *
     * @param {initialState} state - L'état actuel du slice.
     * @param {import("@reduxjs/toolkit").PayloadAction<string>} action - L'action Redux contenant le nouveau token.
     */
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
    /**
     * Réinitialise l'état de l'utilisateur authentifié.
     *
     * @returns {initialState} - L'état initial du slice.
     */
    resetAuthUser: () => {
      return {
        loading: false,
        userInfo: null,
        userToken: null,
        error: null,
        success: false,
      };
    },
  },

  extraReducers: (builder) => {
    // connection  utilisateur
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
