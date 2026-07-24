import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  isLoading: false,
  toastMessage: null,
  sidebarOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    showToast(state, action) {
      state.toastMessage = action.payload; // { type: 'success' | 'error' | 'warning', message: '...' }
    },
    clearToast(state) {
      state.toastMessage = null;
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { toggleTheme, setLoading, showToast, clearToast, toggleSidebar } =
  uiSlice.actions;
export default uiSlice.reducer;
