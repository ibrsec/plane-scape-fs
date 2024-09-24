import { useDispatch, useSelector } from "react-redux";
import useAxios from "./useAxios"; 
import { bookingAvgFareFetchSuccess, bookingFetchFail, bookingFetchStart, bookingFetchSuccess, bookingFetchSuccessWithoutPayload, bookingPageDetailFetchSuccess } from "../app/features/bookingSlice";
import { toastError, toastSuccess } from "../helpers/toastify";
import { useNavigate } from "react-router-dom";

const useBookingServices = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sortGlobalBooking, pageGlobalBooking, dateGlobalBooking, airlineGlobalBooking, destinationGlobalBooking  } = useSelector(
    (state) => state.booking
  );

  const createBookingApi = async (payload) => {
    

    dispatch(bookingFetchStart());
    try {
      const response = await axiosToken.post("/bookings", payload);
      // console.log("response", response);
      const data = response.data;
      // console.log(data);
      dispatch(bookingFetchSuccessWithoutPayload());
      toastSuccess(data?.message)
      navigate('/myflights');
    } catch (error) {
      dispatch(bookingFetchFail());
      toastError(error?.response?.data?.message)
      console.log("create booking api error:", error);
    }
  };

  const deleteBookingApi = async (id) => {
    

    dispatch(bookingFetchStart());
    try {
      const response = await axiosToken.delete("/bookings/"+id);
      // console.log("response delete", response);
      const data = response.data;
      // console.log(data);
      dispatch(bookingFetchSuccessWithoutPayload());
      toastSuccess(data?.message || "Booking is deleted!") 
      getBookings();
    } catch (error) {
      dispatch(bookingFetchFail());
      toastError(error?.response?.data?.message || "Booking deleting is failed!")
      console.log("delete booking api error:", error);
    }
  };


  const getBookings = async () => { 
    const params = {};
    params.page = pageGlobalBooking; 
    let queryString = "";
    
    // sort settings
    if (sortGlobalBooking) {
      //full date sorting
      if(sortGlobalBooking === '+scheduleDate') queryString = 'sort[scheduleDateTime]=asc';
      if(sortGlobalBooking === '-scheduleDate') queryString = 'sort[scheduleDateTime]=desc'; 
      
      //hour sorting
      if(sortGlobalBooking === '+scheduleTime') queryString = 'sort[scheduleTime]=asc'; 
      if(sortGlobalBooking === '-scheduleTime') queryString = 'sort[scheduleTime]=desc'; 
 
    }

    //date filter
    //filter[date]=yyyy-MM-dd
    if(dateGlobalBooking){
      queryString = queryString ? `${queryString}&filter[scheduleDate]=${dateGlobalBooking}` : `filter[scheduleDate]=${dateGlobalBooking}`;
    }

    //airline search
    //search[airline]=airlineName
    if(airlineGlobalBooking){
      queryString = queryString ? `${queryString}&search[airline]=${airlineGlobalBooking}` : `search[airline]=${airlineGlobalBooking}`;
    }

    //destination search
    //search[destination]=destinationName
    if(destinationGlobalBooking){
      queryString = queryString ? `${queryString}&search[destination]=${destinationGlobalBooking}` : `search[destination]=${destinationGlobalBooking}`;
    }

    
    
    dispatch(bookingFetchStart());
    try {
      const response = await axiosToken.get("/bookings?"+queryString, {
        params
      });
      // console.log("response", response);
      const data = response.data;
      // console.log(data);
      dispatch(bookingFetchSuccess(data?.data));
      dispatch(bookingPageDetailFetchSuccess(data?.details))
      dispatch(bookingAvgFareFetchSuccess(data?.avgFare))
    } catch (error) {
      dispatch(bookingFetchFail());
      toastError(error?.response?.data?.message)
      console.log('get booking s error', error);
    }
  };




  return { createBookingApi, getBookings,deleteBookingApi };
};

export default useBookingServices;
