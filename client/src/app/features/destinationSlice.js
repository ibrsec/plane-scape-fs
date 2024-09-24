import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    destinations : [],
    loading:false,
    error:false
}

const destinationSlice = createSlice({
    name: 'destination',
    initialState ,
    reducers: {
        destinationFetchStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        destinationFetchFail: state => {
            state.loading = false; state.error = true;
        },
        destinationFetchSuccess: (state, {payload}) => {
            state.loading = false;
            state.destinations.push(payload);
        },
        clearDestinationSliceLogout: state => {
            state.destinations = [];
        }
    },
})


export const {destinationFetchStart, destinationFetchFail, destinationFetchSuccess, clearDestinationSliceLogout} = destinationSlice.actions;
export default destinationSlice.reducer;