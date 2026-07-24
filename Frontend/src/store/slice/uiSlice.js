import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  toastMessage: null,
  sidebarOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
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

export const { setLoading, showToast, clearToast, toggleSidebar } =
  uiSlice.actions;
export default uiSlice.reducer;
