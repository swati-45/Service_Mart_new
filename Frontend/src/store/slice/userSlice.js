import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  addresses: [],
  wallet: { balance: 0 },
  bookings: [], // past and upcoming mini data
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    updateProfile(state, action) {
      state.profile = { ...state.profile, ...action.payload };
    },
    setAddresses(state, action) {
      state.addresses = action.payload;
    },
    setBookings(state, action) {
      state.bookings = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  setProfile,
  updateProfile,
  setAddresses,
  setBookings,
  setLoading,
} = userSlice.actions;
export default userSlice.reducer;
