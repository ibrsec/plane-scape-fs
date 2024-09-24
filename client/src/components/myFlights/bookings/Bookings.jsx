import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../Spinner";
import NoFlightsFound from "../../NoFlightsFound";
import Booking from "./Booking";
import { useEffect, useState } from "react";
import { flightCurrentFlightsClearSlice } from "../../../app/features/flightSlice";
import DeleteModal from "../DeleteModal";
import FlightDetailsModalBooking from "../FlightDetailsModalBooking";

const Bookings = () => {
  const { bookings, loading } = useSelector((state) => state.booking);

  // state for deleting booking confirmation modal open 
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  //for sending the id of the booking will be deleted to the delete modal
  const [idForDelete, setIdForDelete] = useState(null);

  // state for flight details modal open 
  const [flightDetailsModalOpenState, setFlightDetailsOpenState] = useState(false);

  // state for sending the selected flight to the flight details modal
  const [choosedFlight,setChoosedFlight] = useState({});
  
  
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(flightCurrentFlightsClearSlice());
    // eslint-disable-next-line
  },[])
   
   
  return (
    <div className="flex flex-col gap-5">
      {loading ? (
        <div>
          <Spinner />
          <Spinner />
          <Spinner />
        </div>
      ) : bookings?.length === 0 || !bookings ? (
        <NoFlightsFound />
      ) : (
        bookings?.map((booking, idx) => <Booking key={idx} booking={booking} deleteModalOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} setIdForDelete={setIdForDelete} setChoosedFlight={setChoosedFlight} choosedFlight={choosedFlight} flightDetailsModalOpenState={flightDetailsModalOpenState} setFlightDetailsOpenState={setFlightDetailsOpenState}/>)
      )}
      <DeleteModal id={idForDelete} open={deleteModalOpen} setOpen={setDeleteModalOpen} />
      <FlightDetailsModalBooking  open={flightDetailsModalOpenState} setOpen={setFlightDetailsOpenState} setChoosedFlight={setChoosedFlight} choosedFlight={choosedFlight}/>
    </div>
  );
};
 


export default Bookings