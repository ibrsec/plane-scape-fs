
import useDestinationServices from "../../../services/useDestinationServices";
import { useEffect } from "react";
import { flightStatusCodes } from "../../../helpers/flightStatuses"; 
import {
  flightDayCalculation,
  flightHourCalculation,
} from "../../../helpers/timeCalculations";
import useFlightServices from "../../../services/useFlightServices";
import { useSelector } from "react-redux";
import useAirlineServices from "../../../services/useAirlineServices";
import { FaChevronDown } from "react-icons/fa6";
import FlightClassBooking from "./FlightClassBooking";
const Booking = ({
  booking, 
  setDeleteModalOpen,
  setIdForDelete,
  setChoosedFlight,
  setFlightDetailsOpenState,
  detailsModal,
}) => {

  // get api requests form custom hooks
  const { getDestination } = useDestinationServices();
  const { getCurrentFlight } = useFlightServices();
  const { getAirline } = useAirlineServices();

  // get states from global store
  const { destinations } = useSelector((state) => state.destination);
  const { currentFlights } = useSelector((state) => state.flight); 
  const { airlines } = useSelector((state) => state.airline);
 

  //destination requests
  //current flight requests(for be able to see the updated infos of the flights)
  useEffect(() => {
    booking && getDestination(booking?.route[booking?.route?.length - 1]);
    booking && getCurrentFlight(booking?.flightId);
    booking && getAirline(booking?.prefixIATA);
    // eslint-disable-next-line
  }, [booking]);

 

  //filter current booking's destination
  const destination = destinations?.filter(
    (item) => item?.iata === booking?.route[booking?.route?.length - 1]
  )[0]?.publicName?.english;

  //filter current booking's airline name
  const airline = airlines?.filter(
    (item) => item?.iata === booking?.prefixIATA
  )[0]?.publicName;

  //filter current flight of the booking
  const currentFlight = currentFlights?.filter(
    (item) => item?.id === booking?.flightId
  )[0];

  //  Flight Day calculation
  const flightDay = flightDayCalculation(currentFlight?.scheduleDateTime);

  //Flight hour calculation
  const flightHour = flightHourCalculation(currentFlight?.scheduleDateTime);


  return (
    <div>
      <div className={"white-card-wrapper relative pb-20 "}>
        {/* flight status */}
        <div className="flex items-end justify-end gap-2  flex-col-reverse screen-540:flex-row screen-540:items-center ">
          {currentFlight?.publicFlightState?.flightStates && (
            <span className="bg-orange-700 px-3 py-2 rounded-lg text-white  relative group text-[11px] md:text-sm">
              {
                flightStatusCodes[
                  currentFlight?.publicFlightState?.flightStates[0]
                ]?.name
              }
              <span className="hidden group-hover:block absolute -top-20 -left-36 max-w-[180px] bg-slate-500 px-3 py-2 rounded-lg ">
                {
                  flightStatusCodes[
                    currentFlight?.publicFlightState?.flightStates[0]
                  ]?.description
                }
              </span>
            </span>
          )}
        </div>
screen-540
        {/* booking details */}
        <div className=" mb-0 flex flex-col screen-900:flex-row items-center screen-900:items-start  lg:items-center justify-between gap-3">
          {/* booking card left */}
          <div className=" flex items-start justify-start gap-5 flex-1">
            <div className="flex-shrink-0">
              {/* airline logos are fetched from an another external api link */}
              <img
                src={`https://content.airhex.com/content/logos/airlines_${booking?.prefixIATA}_350_350_s.png`}
                alt="logo"
                className="w-14 h-14 rounded-full p-1 border  object-contain"
              />
            </div>

            {/* book infos  */}
            <div className=" pt-3 text-gray-500 flex-1  ">
              {/* time */}
              <div className=" text-lg md:text-[20px] lg:text-[21] xl:text-2xl flex  items-center gap-1 flex-wrap sm:flex-nowrap ">
                <span className="text-nowrap">{flightHour} </span>
                <span className="hidden sm:inline">—</span>

                <span className="text-nowrap"> {flightDay}</span>
              </div>
              {/* destination */}
              <div className=" text-md md:text-[17px] lg:text-md xl:text-lg flex  items-center gap-1 flex-wrap sm:flex-nowrap text-primary-color">
                <span className="xs:text-nowrap ">
                <span className="text-[12px] text-gray-400">dest: </span>
                {destination || booking?.destination} 
                </span>
              </div>

              {/* other infos */}
              <div className="flex items-start justify-between gap-8 mt-6 lg:pe-8 flex-wrap">
                {/* airline info */}
                <div className="flex flex-col items-start md:flex-1 ">
                  <div className="font-semibold text-sm md:text-md ">

                <span className="text-[12px] text-gray-400">airline: </span>
                    {airline || booking?.airline}({booking?.prefixIATA})
                  </div>
                  {!detailsModal && (
                    <div
                      className="flex items-center gap-1 group cursor-pointer"
                      onClick={() => {
                        setChoosedFlight(booking);
                        setFlightDetailsOpenState(true);
                      }}
                    >
                      <button className="text-blue-400 group-hover:text-primary-color transition-all text-xs md:text-sm text-nowrap">
                        Flight Details
                      </button>
                      <FaChevronDown className="text-blue-400 group-hover:text-primary-color transition-all text-sm" />
                    </div>
                  )}
                </div>

                {/* stop info */}
                <div className=" flex flex-col items-start">
                  <span className="font-semibold text-sm md:text-md">
                    {booking?.route?.length === 1
                      ? "Nonstop"
                      : booking?.route?.length === 2
                      ? "1 Stop"
                      : "2+ Stop"}
                  </span>
                  <span className=" text-xs md:text-sm`">
                    {booking?.flightNumber}(flight number)
                  </span>
                </div>

                {/* Route fligt name */}
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-sm md:text-md">
                    {booking?.prefixICAO}-
                    {booking?.route[booking?.route.length - 1]}
                  </span>
                  <span>{booking?.flightName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* booking card right */}
          <div className=" flex-1 ">
            <FlightClassBooking selectedClass={booking?.flightClass} />
          </div>
        </div>
        {!detailsModal && (
          <div className="absolute bottom-0 right-0">
            <button
              className="bg-primary-color py-4 xs:py-5 px-5 xs:px-9 text-home-bg font-semibold  hover:bg-home-bg hover:text-primary-color transition-all active:bg-black active:text-home-bg rounded-ss-lg rounded-ee-lg text-sm xs:text-md "
              onClick={() => {
                setIdForDelete(booking?._id);
                setDeleteModalOpen(true);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
