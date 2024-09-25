import { useEffect, useRef, useState } from "react";
import { IoAirplaneSharp } from "react-icons/io5";
import { BiSolidPlaneLand } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  clearDestinationGlobal,
  setDestinationGlobal,
  setPageGlobal,
} from "../../app/features/flightSlice";
import { toastWarn } from "../../helpers/toastify";
const BookFlight = () => {
  const dispatch = useDispatch();
  //get the global filters for home page
  const { destinationGlobal } = useSelector((state) => state.flight);
  const [destination, setDestination] = useState("");

  const isInitialRender = useRef(true);

  // set the page to 1 when global states change, but avoid on initial render
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      dispatch(setPageGlobal(1));
    }
    // eslint-disable-next-line
  }, [destinationGlobal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination) {
      toastWarn("Destination field is empty!");
      return;
    }
    if (destination.length < 3) {
      toastWarn("Destination field must be at least 3 letter! (ICAO CODE)");
      return;
    }
    console.log(destination);

    dispatch(setDestinationGlobal(destination));
    setDestination("");
  };

  return (
    <form className="white-card-wrapper" onSubmit={handleSubmit}>
      {/* book flight header */}
      <div className="flex xs:items-center justify-between gap-3 xs:gap-1 mb-6 flex-wrap flex-col xs:flex-row">
        <div className="flex items-center gap-1">
          <IoAirplaneSharp size="20px" />
          <h4 className="font-semibold   text-sm sm:text-lg  ">
            SEARCH FLIGHT
          </h4>
        </div>
      </div>

      {/* //? inputs */}
      <div className="flex  items-center gap-3 flex-wrap  mb-6  ">
        {/* destination and date inputs */}
        <div className="flex sm:items-center gap-1 flex-1 flex-col sm:flex-row  ">
          <div className=" border rounded-full flex items-center justify-start  flex-1 relative ">
            <label htmlFor="destination" className="pe-2 ps-3 ">
              <BiSolidPlaneLand size="25" className="text-primary-color" />
            </label>
            <input
              type="text"
              className="px-3 py-5 pl-3 text-lg  flex-1  bg-transparent focus:outline-none  "
              placeholder="Destination (ICAO) - 3 letter"
              name="destination"
              id="destination"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
            />
          <p className="text-gray-500 text-[12px] absolute -bottom-5 left-5">* example: RAK or RAK,KYA</p>
            
          </div>
        </div>
      </div>

      {/* submit button */}
      <div className="flex items-center gap-3 flex-wrap">
        <button type="submit" className=" btn-primary     text-nowrap">
          Show flights
        </button>
        {destinationGlobal && (
          <div className="bg-home-bg py-1 px-2 rounded-full text-xs   cursor-pointer text-nowrap"
          onClick={()=> dispatch(clearDestinationGlobal())}
          >
            {destinationGlobal}
            {" x"}
          </div>
        )}
      </div>
    </form>
  );
};

export default BookFlight;
