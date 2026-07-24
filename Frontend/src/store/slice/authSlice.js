import { createSlice } from "@reduxjs/toolkit";
import { getLocal } from "../../utils/storage";

const savedUser = getLocal("homefix_user");
const savedToken = getLocal("homefix_token");

const initialState = {
  user: savedUser,
  token: savedToken,
  role: savedUser?.role || null,
  isAuthenticated: !!savedToken,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.user?.role || "user";
      state.isAuthenticated = true;
      state.error = null;
    },

    logout(state) {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setCredentials,
  logout,
  setLoading,
  setError,
} = authSlice.actions;

export default authSlice.reducer;