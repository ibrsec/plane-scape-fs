import { useSelector } from "react-redux";
import Flight from "./Flight";
import Spinner from "../../Spinner";
import NoFlightsFound from "../../NoFlightsFound";
import NewBookingModal from "../bookingModal/NewBookingModal";
import { useState } from "react";
import CheckDetailsModal from "../checkDetailsModal/CheckDetailsModal";

const Flights = () => {
  const { flights, loading } = useSelector((state) => state.flight); //get flights from global
  

  // new booking and check details modal open states
  const [newBookingModalOpenState,setNewBookingModalOpenState] = useState(false);
  const [checkDetailsModalOpenState,setCheckDetailsOpenState] = useState(false);
  //this state is created for be able to screen the choosed flight on opened modal
  const [choosedFlight,setChoosedFlight] = useState({});

  return ( 
    <div className="flex flex-col gap-5">
      {loading ? (
        <div>
          <Spinner />
          <Spinner />
          <Spinner />
        </div>
      ) : flights?.length === 0 || !flights ? (
        <NoFlightsFound />
      ) : (
        flights?.map((flight, idx) => <Flight key={idx} flight={flight} newBookingModalOpenState={newBookingModalOpenState} setNewBookingModalOpenState={setNewBookingModalOpenState} checkDetailsModalOpenState={checkDetailsModalOpenState} setCheckDetailsOpenState={setCheckDetailsOpenState} setChoosedFlight={setChoosedFlight} />)
      )}
      <NewBookingModal  open={newBookingModalOpenState} setOpen={setNewBookingModalOpenState} setChoosedFlight={setChoosedFlight} choosedFlight={choosedFlight}/>
      <CheckDetailsModal  open={checkDetailsModalOpenState} setOpen={setCheckDetailsOpenState} setChoosedFlight={setChoosedFlight} choosedFlight={choosedFlight}/>
    </div>
  );
};

export default Flights;
