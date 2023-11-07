import { createAsyncThunk } from "@reduxjs/toolkit";
import { callApi } from "./apiCall";
import { userToken } from "../features/authSlice";

const backendURL = "http://localhost:3001";


export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    const url = `${backendURL}/api/v1/user/login`;
    const data = { email, password };
    
    try {
      const response = await callApi(url, "POST", data);
      if (response.status === 200) {
        const userToken = response.body.token;
        localStorage.setItem("userToken", userToken); 
        return { userToken };
      } else if(response.status === 400){
        return rejectWithValue("Login failed. Please check your login details.");
      
      } else if(response.status === 401){
        return rejectWithValue("Login error.");
      } 
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue("non");
      } else {
        return rejectWithValue("An error occurred while logging in.");
      }
    }
  }
);

// export async function createUser(
//   email,
//   password,
//   firstName,
//   lastName,

//   store
// ) {
//   const url = `${backendURL}/api/v1/user/signup`;
//   const data = { email, password, firstName, lastName };

//   try {
//     const response = await callApi(url, "POST", data);
//     const userToken = await response.json();
//     store.dispatch(userActions.resolved(userToken)); // Dispatch l'action avec le token
//   } catch (error) {
//     store.dispatch(userActions.rejected("Registration failed"));
//   }
// }

export const connectUser = createAsyncThunk(
  "auth/connexion",
  async ({ firstName, lastName }, { rejectWithValue }) => {
    const url = `${backendURL}/api/v1/user/profile`;
    const data = {firstName, lastName}
    try {
      const response = await callApi(url, "POST", data, userToken); 
      
      if (response.status === 200) {
        return response; 
      } else {
        return rejectWithValue(response.message); 
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// export const updateUserProfile = createAsyncThunk(
//   "user/updateUserProfile",
//   // Thunk function
//   async (data, { dispatch, getState }) => {
//     const authToken = selectUser(getState());
//     const url = `${backendURL}/api/v1/user/profile`;

//     try {
//       const response = await callApi(url, "PUT", data, authToken);

//       if (response.status === 401) {
//         dispatch(userActions.rejected("Invalid token"));
//         return;
//       }

//       if (response.status === 200) {
//         const updatedData = await response.json();
//         dispatch(userActions.resolved(updatedData));
//       } else {
//         dispatch(userActions.rejected("An error occurred"));
//       }
//     } catch (error) {
//       dispatch(userActions.rejected("An error occurred"));
//     }
//   }
// );
