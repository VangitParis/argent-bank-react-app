import { createAsyncThunk } from "@reduxjs/toolkit";
import { callApi } from "./apiCall";
import { userToken } from "../features/userSlice";
// import { userTokenUpdated } from "../features/updateSlice";

const backendURL = "http://localhost:3001";

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
      if (response.status === 500) {
        return rejectWithValue("Internal Server Error");
      }
      if (response.status === 200) {
        const userToken = response.body.token;
        localStorage.setItem("userToken", userToken);
        return { userToken };
      }
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.data.message) {
        return rejectWithValue("Invalid Fields");
      } else {
        return rejectWithValue("An error occurred while logging in.");
      }
    }
  }
);

export const connectUser = createAsyncThunk(
  "auth/connexion",
  async ({ firstName, lastName }, { rejectWithValue, getState }) => {
    const { userToken } = getState().auth; // Accéder au userToken dans le state
    const url = `${backendURL}/api/v1/user/profile`;
    const data = { firstName, lastName };
    try {
      if (userToken) {
        const response = await callApi(url, "POST", data, userToken);
        console.log(response);

        if (response.status === 200) {
          console.log("Token récupéré depuis la page profile: ", userToken);
        } else if (response.status === 400) {
          return rejectWithValue(
            "Login failed. Please check your login details."
          );
        } else if (response.status === 401) {
          console.log("Problème de Token === ", userToken);
          return rejectWithValue(
            "!!!!!!!!!!!!!!!!!!!!!!! userToken is NULL !!!!!!!!!!!!!!!!!!!!!!!"
          );
        }

        return response.body;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


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
