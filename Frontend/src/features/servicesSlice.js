import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  categories: [],
  selected: null,
  filters: { category: "", priceRange: "", rating: 0, availability: "" },
  loading: false,
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices(state, action) {
      state.list = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setSelected(state, action) {
      state.selected = action.payload;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  setServices,
  setCategories,
  setSelected,
  setFilters,
  setLoading,
} = servicesSlice.actions;
export default servicesSlice.reducer;
