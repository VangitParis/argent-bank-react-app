import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/userSlice";
import authReducer from "../features/authSlice";
import updateReducer from '../features/updateSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    update: updateReducer,
   
  },

});
