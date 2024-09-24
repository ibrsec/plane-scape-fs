import { useDispatch, useSelector } from "react-redux";
import useAxios from "./useAxios"; 
import { airlineFetchFail, airlineFetchStart, airlineFetchSuccess } from "../app/features/airlineSlice";


const useAirlineServices = () => {
  const { axiosPublic } = useAxios();
  const dispatch = useDispatch();
  const airlines = useSelector((state) => state.airline.airlines);

  const getAirline = async (iata) => {
    dispatch(airlineFetchStart());
    try {
      if (airlines?.filter((item) => item?.iata === iata)?.length > 0) {
        // console.log("airline requested before!");
      } else {
        const response = await axiosPublic.get("/airlines/" + iata);
        // console.log("response", response);
        const data = response.data;
        // console.log(data);
        dispatch(airlineFetchSuccess(data?.data));
      }
    } catch (error) {
      dispatch(airlineFetchFail());
      // toastError(error?.response?.data?.message);
      // console.log('airline error',error);
    }
  };
  return { getAirline };
};

export default useAirlineServices;
