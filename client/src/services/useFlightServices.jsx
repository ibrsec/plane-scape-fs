import { useDispatch, useSelector } from "react-redux";
import useAxios from "./useAxios";
import {
  flightFetchCurrentFlightSuccess,
  flightFetchFail,
  flightFetchStart,
  flightFetchSuccess,
} from "../app/features/flightSlice";
import { toastError } from "../helpers/toastify";

const useFlightServices = () => {
  const { axiosPublic } = useAxios();
  const dispatch = useDispatch();
  const {
    dateGlobal,
    sortGlobal,
    directionGlobal,
    pageGlobal,
    destinationGlobal,
  } = useSelector((state) => state.flight);

  const getFlights = async () => {
    const params = {};
    if (pageGlobal) params.page = pageGlobal;
    if (dateGlobal) params.date = dateGlobal;
    // if (stopGlobal) params.stop = stopGlobal;
    if (sortGlobal) params.sort = sortGlobal;
    if (directionGlobal) params.direction = directionGlobal;
    if (destinationGlobal) params.route = destinationGlobal;

    dispatch(flightFetchStart());
    try {
      const response = await axiosPublic.get("/flights", {
        params,
      });
      const data = response.data;
      // console.log(data);
      dispatch(flightFetchSuccess(data?.data?.flights));
    } catch (error) {
      dispatch(flightFetchFail());
      toastError(error?.response?.data?.message);
      console.log(" get flight error", error);
    }
  };

  const getCurrentFlight = async (flightId) => {
    // console.log('flightId', flightId, typeof flightId)
    dispatch(flightFetchStart());
    try {
      if (!flightId) {
        // console.log('flightId is not exist!');
      } else {
        const response = await axiosPublic.get("/flights/" + flightId);

        const data = response.data;
        // console.log(data);
        dispatch(flightFetchCurrentFlightSuccess(data?.data));
      }
    } catch (error) {
      dispatch(flightFetchFail());
      toastError(error?.response?.data?.message);
      console.log("getCurrentFlight error", error);
    }
  };
  return { getFlights, getCurrentFlight };
};

export default useFlightServices;
