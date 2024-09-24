import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
  currentFlights: [],
  dateGlobal: new Date().toISOString().split("T")[0],
  sortGlobal: "",
  directionGlobal: "",
  pageGlobal: 1,
  loading: false,
  error: false,
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    flightFetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    flightFetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    flightFetchSuccess: (state, { payload }) => {
      state.loading = false;
      state.flights = payload;
    },
    flightFetchCurrentFlightSuccess: (state, { payload }) => {
      state.loading = false;

      // delete the current requested flight if it is exist on currentFlights
      state.currentFlights = state.currentFlights?.filter(
        (item) => item?.id !== payload?.id
      );
      //add new current flight
      state.currentFlights.push(payload);
    },
    flightCurrentFlightsClearSlice: (state) => {
      state.currentFlights = [];
    },
    setDateGlobal: (state, { payload }) => {
      state.dateGlobal = payload;
    },
    // setStopsGlobal: (state, { payload }) => {
    //   state.stopGlobal = payload;
    // },
    setSortGlobal: (state, { payload }) => {
      state.sortGlobal = payload;
    },
    setDirectionGlobal: (state, { payload }) => {
      state.directionGlobal = payload;
    },
    setPageGlobal: (state, { payload }) => {
      state.pageGlobal = payload;
    },
    resetPageGlobal: (state) => {
      state.pageGlobal = 1;
    },
    clearFilters: (state) => {
      state.dateGlobal = "";
      state.sortGlobal = "";
      // state.stopGlobal = "";
      state.directionGlobal = "";
    },
    clearFlightSliceLogout: (state) => {
      state.flights = [];
      state.currentFlights = [];
      state.dateGlobal = new Date().toISOString().split("T")[0];
      state.sortGlobal = "";
      state.directionGlobal = "";
      state.pageGlobal = 1;
    },
  },
});

export const {
  flightFetchStart,
  flightFetchFail,
  flightFetchSuccess,
  flightFetchCurrentFlightSuccess,
  setDateGlobal,
  setSortGlobal,
  clearFilters,
  setDirectionGlobal,
  setPageGlobal,
  resetPageGlobal,
  flightCurrentFlightsClearSlice,
  clearFlightSliceLogout,
} = flightSlice.actions;
export default flightSlice.reducer;
