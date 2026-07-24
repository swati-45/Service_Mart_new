import { createSlice } from "@reduxjs/toolkit";
import { getLocal as getSession } from "../../utils/storage";

const savedProgress = getSession("homefix_booking_progress") || {};

const initialState = {
  currentBooking: savedProgress.currentBooking || null,
  selectedSlot: savedProgress.selectedSlot || null,
  step: savedProgress.step || 1,
  address: savedProgress.address || null,
  loading: false,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking(state, action) {
      state.currentBooking = { ...state.currentBooking, ...action.payload };
    },
    setStep(state, action) {
      state.step = action.payload;
    },
    setSlot(state, action) {
      state.selectedSlot = action.payload;
    },
    setAddress(state, action) {
      state.address = action.payload;
    },
    clearBooking(state) {
      state.currentBooking = null;
      state.selectedSlot = null;
      state.step = 1;
      state.address = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  setBooking,
  setStep,
  setSlot,
  setAddress,
  clearBooking,
  setLoading,
} = bookingSlice.actions;
export default bookingSlice.reducer;
