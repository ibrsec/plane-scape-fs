import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  avgFare: 0,
  sortGlobalBooking: "",
  dateGlobalBooking: "",
  airlineGlobalBooking: "",
  destinationGlobalBooking: "",
  pageGlobalBooking: 1,
  pageDetails: {},
  loading: false,
  error: false,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    bookingFetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    bookingFetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    bookingFetchSuccess: (state, { payload }) => {
      state.loading = false;
      state.bookings = payload;
    },
    bookingAvgFareFetchSuccess: (state, { payload }) => {
      state.avgFare = payload;
    },
    bookingPageDetailFetchSuccess: (state, { payload }) => {
      state.loading = false;
      state.pageDetails = payload;
    },

    bookingFetchSuccessWithoutPayload: (state) => {
      state.loading = false;
    },
    bookingLogoutSuccess: (state) => {
      state.bookings = [];
      state.sortGlobalBooking = "";
      state.pageGlobalBooking = 1;
    },
    setSortGlobalBooking: (state, { payload }) => {
      state.sortGlobalBooking = payload;
    },
    setPageGlobalBooking: (state, { payload }) => {
      state.pageGlobalBooking = payload;
    },
    setDateGlobalBooking: (state, { payload }) => {
      state.dateGlobalBooking = payload;
    },
    setAirlineGlobalBooking: (state, { payload }) => {
      state.airlineGlobalBooking = payload;
    },
    setDestinationGlobalBooking: (state, { payload }) => {
      state.destinationGlobalBooking = payload;
    },
    resetPageGlobalBooking: (state) => {
      state.pageGlobalBooking = 1;
    },
    clearFiltersBooking: (state) => {
      state.sortGlobalBooking = "";
      state.pageGlobalBooking = 1;
      state.dateGlobalBooking = "";
      state.airlineGlobalBooking = "";
      state.destinationGlobalBooking = "";
    },
    clearDateFilterBooking: (state) => {
      state.dateGlobalBooking = "";
    },
    clearAirlineFilterBooking: (state) => {
      state.airlineGlobalBooking = "";
    },
    clearDestinationFilterBooking: (state) => {
      state.destinationGlobalBooking = "";
    },
    clearBookingSliceLogout: (state) => {
      state.bookings = [];
      state.avgFare = 0;
      state.sortGlobalBooking = "";
      state.dateGlobalBooking = "";
      state.airlineGlobalBooking = "";
      state.destinationGlobalBooking = "";
      state.pageGlobalBooking = 1;
      state.pageDetails = {};
    },
  },
});

export const {
  bookingFetchStart,
  bookingFetchFail,
  bookingFetchSuccess,
  bookingFetchSuccessWithoutPayload,
  bookingLogoutSuccess,
  setSortGlobalBooking,
  clearFiltersBooking,
  setPageGlobalBooking,
  setDateGlobalBooking,
  setAirlineGlobalBooking,
  setDestinationGlobalBooking,
  resetPageGlobalBooking,
  bookingPageDetailFetchSuccess,
  clearBookingSliceLogout,
  bookingAvgFareFetchSuccess,
  clearDateFilterBooking,
  clearAirlineFilterBooking,
  clearDestinationFilterBooking,
} = bookingSlice.actions;
export default bookingSlice.reducer;
