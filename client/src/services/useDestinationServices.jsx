import { useDispatch, useSelector } from "react-redux";
import useAxios from "./useAxios";
import {
  destinationFetchFail,
  destinationFetchStart,
  destinationFetchSuccess,
} from "../app/features/destinationSlice";

const useDestinationServices = () => {
  const { axiosPublic } = useAxios();
  const dispatch = useDispatch();
  const destinations = useSelector((state) => state.destination.destinations);

  const getDestination = async (iata) => {
    dispatch(destinationFetchStart());
    try {
      if (destinations?.filter((item) => item?.iata === iata)?.length > 0) {
        // console.log("destination requested before!");
      } else {
        const response = await axiosPublic.get("/destinations/" + iata);
        // console.log("response", response);
        const data = response.data;
        // console.log(data);
        dispatch(destinationFetchSuccess(data?.data));
      }
    } catch (error) {
      dispatch(destinationFetchFail());
        // console.log("destination error", error);
      
    }
  };
  return { getDestination };
};

export default useDestinationServices;
