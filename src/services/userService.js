import { createAsyncThunk } from "@reduxjs/toolkit";
import { callApi } from "./apiCall";
import { userToken } from "../features/userSlice";

const backendURL = "http://localhost:3001";

/**
 * Effectue une demande de connexion utilisateur.
 *
 * @param {Object} credentials - Les informations d'identification de l'utilisateur (email, mot de passe).
 * @param {string} credentials.email - L'adresse e-mail de l'utilisateur.
 * @param {string} credentials.password - Le mot de passe de l'utilisateur.
 * @param {Object} thunkAPI - L'objet fourni par Redux Toolkit pour les thunks asynchrones.
 * @returns {Promise<Object>} - Une promesse avec les données de la réponse de l'API.
 */
export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    const url = `${backendURL}/api/v1/user/login`;
    const data = { email, password };

    try {
      const response = await callApi(url, "POST", data, userToken);

      if (response.status === 400) {
        return rejectWithValue(
          "Login failed. Please check your login details."
        );
      }

      if (response.status === 200) {
        const userToken = response.body.token;
        localStorage.setItem("userToken", userToken);
        return { userToken };
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue("Invalid Fields");
      } else {
        return rejectWithValue("Internal Server Error");
      }
    }
  }
);
/**
 * Effectue une demande de connexion utilisateur.
 *
 * @param {Object} userInformation - Les informations de profil utilisateur à mettre à jour (prénom, nom).
 * @param {string} userInformation.firstName - Le prénom de l'utilisateur.
 * @param {string} userInformation.lastName - Le nom de famille de l'utilisateur.
 * @param {Object} thunkAPI - L'objet fourni par Redux Toolkit pour les thunks asynchrones.
 * @returns {Promise<Object>} - Une promesse avec les données de la réponse de l'API.
 */
export const connectUser = createAsyncThunk(
  "auth/connexion",
  async ({ firstName, lastName }, { rejectWithValue, getState }) => {
    const { userToken } = getState().auth;
    const url = `${backendURL}/api/v1/user/profile`;
    const data = { firstName, lastName };
    try {
      if (userToken) {
        const response = await callApi(url, "POST", data, userToken);

        if (response.status === 200) {
          return response.body;
        } else if (response.status === 400) {
          return rejectWithValue(
            "Login failed. Please check your login details."
          );
        } else if (response.status === 401) {
          return rejectWithValue("User Token Error");
        }
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
/**
 * Met à jour le profil utilisateur.
 *
 * @param {Object} userInformation - Les informations de profil utilisateur à mettre à jour (prénom, nom).
 * @param {string} userInformation.firstName - Le prénom de l'utilisateur.
 * @param {string} userInformation.lastName - Le nom de famille de l'utilisateur.
 * @param {Object} thunkAPI - L'objet fourni par Redux Toolkit pour les thunks asynchrones.
 * @returns {Promise<Object>} - Une promesse avec les données de la réponse de l'API.
 */
export const updateUserProfile = createAsyncThunk(
  "update/updateUserProfile",
  async ({ firstName, lastName }, { rejectWithValue, getState }) => {
    const { userToken } = getState().auth;
    const url = `${backendURL}/api/v1/user/profile`;
    const data = { firstName, lastName };
    try {
      const response = await callApi(url, "PUT", data, userToken);

      if (response.status === 200) {
        return response;
      } else {
        return rejectWithValue("An error occurred");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
