import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import userReducer from "./slice/userSlice";
import bookingReducer from "./slice/bookingSlice";
import servicesReducer from "./slice/servicesSlice";
import uiReducer from "./slice/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    booking: bookingReducer,
    services: servicesReducer,
    ui: uiReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
