import { createSlice } from '@reduxjs/toolkit';

//initial global states for airlineSlice
const initialState = {
    airlines : [],
    loading:false,
    error:false
}
//slices of airline global states
const airlineSlice = createSlice({
    name: 'airline',
    initialState ,
    reducers: {
        airlineFetchStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        airlineFetchFail: state => {
            state.loading = false; state.error = true;
        },
        airlineFetchSuccess: (state, {payload}) => {
            state.loading = false;
            state.airlines.push(payload);
        },
        clearAirlineSliceLogout: state => {
            state.airlines = [];
        }
    },
})


//export slice and reducers
export const {airlineFetchStart, airlineFetchFail, airlineFetchSuccess, clearAirlineSliceLogout} = airlineSlice.actions;
export default airlineSlice.reducer;