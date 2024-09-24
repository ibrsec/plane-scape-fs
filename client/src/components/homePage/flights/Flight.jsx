import { IoAirplaneSharp } from "react-icons/io5";

import { PiAirplaneTakeoffBold } from "react-icons/pi";
import { PiAirplaneLandingBold } from "react-icons/pi";
import {  useNavigate } from "react-router-dom";
import useDestinationServices from "../../../services/useDestinationServices";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { flightStatusCodes } from "../../../helpers/flightStatuses";
import {  toastWarnMiddle } from "../../../helpers/toastify";
import { FLIGHT_CLASSES } from "../../../helpers/fligtClassContants"; 
import {
  flightDayCalculation,
  flightHourCalculation,
} from "../../../helpers/timeCalculations";
import useAirlineServices from "../../../services/useAirlineServices";
const Flight = ({
  flight,
  setNewBookingModalOpenState,
  setChoosedFlight,
  newBookingModalOpenState,
  checkDetailsModalOpenState,
  setCheckDetailsOpenState,
  price,
}) => { 
  const { getDestination } = useDestinationServices();
  const { getAirline } = useAirlineServices();
  const { destinations } = useSelector((state) => state.destination);
  const { airlines } = useSelector((state) => state.airline);
  const { accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  //destination airline  requests when flight is changed
  useEffect(() => {
    if(Object.keys(flight).length !== 0){
    getDestination(
      flight?.route?.destinations[flight?.route?.destinations?.length - 1]
    );

    getAirline(flight?.prefixIATA);
  }
  // eslint-disable-next-line
  }, [flight]);


    //filter current flights's destination name
  const destination = destinations?.filter(
    (item) =>
      item?.iata ===
      flight?.route?.destinations[flight?.route?.destinations?.length - 1]
  )[0]?.publicName?.english;

    //filter current flights's airline name
    const airline = airlines?.filter(
      (item) => item?.iata === flight?.prefixIATA
    )[0]?.publicName;

  //  Flight Day
  const flightDay = flightDayCalculation(flight?.scheduleDateTime);

  //flight hour
  const flightHour = flightHourCalculation(flight?.scheduleDateTime);

  // bookk button handling
  const handleBookingButtonClick = (flight) => {
    if (flight?.flightDirection !== "D") {
      toastWarnMiddle(
        " Please choose a departure flight, booking is only available for departure flights."
      );
    } else if (!accessToken) {
      toastWarnMiddle("You must login for booking a flight!.");
      navigate("/login");
    } else {
      setNewBookingModalOpenState(true);
      setChoosedFlight({...flight,airline,destination});
    }
  };

  return (
    <div>
      <div
        className={
          "white-card-wrapper relative " +
          ((!newBookingModalOpenState && !checkDetailsModalOpenState) ? " rounded-bl-none" : " ")
        }
      >
        {/* flight details */}
        <div className=" mb-0 flex items-center justify-between gap-3">
          <p className="font-semibold mb-0">
            {flight?.flightDirection === "D"
              ? "Amsterdam - " + destination
              : destination + " - Amsterdam"}{" "}
          </p>
          <div className="flex items-end gap-2  flex-col-reverse screen-540:flex-row screen-540:items-center ">
            {flight?.publicFlightState?.flightStates && (
              <span className="bg-orange-700 px-3 py-2 rounded-lg text-white  relative group text-[9px] md:text-sm">
                {
                  flightStatusCodes[flight?.publicFlightState?.flightStates[0]]
                    ?.name
                }
                <span className="hidden group-hover:block absolute -top-20 -left-36 max-w-[180px] bg-slate-500 px-3 py-2 rounded-lg ">
                  {
                    flightStatusCodes[
                      flight?.publicFlightState?.flightStates[0]
                    ]?.description
                  }
                </span>
              </span>
            )}
            <span className="bg-green-600 px-3 py-2 rounded-lg text-white text-[9px] md:text-sm">
              {flight?.flightDirection === "D" ? "Department" : "Arrival"}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-3">{flightDay}</p>
        <p className="text-sm text-gray-500 mb-3">{airline}</p>
        {/* flight infos */}
        <div className=" flex xs:items-center gap-3 justify-between mb-5 flex-col xs:flex-row  ">
          {/* departure infos */}
          <div className="flex-1 flex flex-col justify-center items-center xs:items-stretch   ">
            <div className="flex items-center gap-2 text-[#848383] font-[500] ">
              <PiAirplaneTakeoffBold size="20" />
              <span className=" text-xs sm:text-sm leading-normal ">
                Departure
              </span>
            </div>

            <div>
              <span className="font-bold text-md sm:text-lg leading-normal ">
                {flight?.flightDirection === "D" ? flightHour : "- -"}
              </span>
            </div>

            <div className="  text-[#848383] font-[500] ">
              <span className="text-xs sm:text-sm leading-normal ">
                Airport: {flight.prefixICAO}
              </span>
            </div>
          </div>

          {/* line */}
          <div className="flex-1 ">
            <div className="bg-[#c3c0c0] w-3/5 min-w-1 h-[2px] rounded-full mx-auto"></div>
          </div>

          {/* middle infos */}
          <div className="flex-1 flex flex-col justify-center gap-1   ">
            <div className="flex items-center justify-center  ">
              {/* airline logos are fetched from an another external api link */}
              <img
                src={`https://content.airhex.com/content/logos/airlines_${flight?.prefixIATA}_350_100_r.png`}
                alt="logo"
                className="w-24   object-contain"
              />
            </div>

            <div className="flex items-center justify-center">
              <IoAirplaneSharp size="20" className="text-primary-color" />
            </div>

            <div className="  text-[#848383] font-[500] text-xs sm:text-sm leading-normal text-center ">
              (
              {flight?.route?.destinations?.length === 1
                ? "Nonstop"
                : flight?.route?.destinations?.length === 2
                ? "1 Stop"
                : "2+ Stop"}
              )
            </div>
          </div>

          {/* line */}
          <div className="flex-1 ">
            <div className="bg-[#c3c0c0] w-3/5 min-w-1 h-[2px] rounded-full mx-auto"></div>
          </div>

          {/* arrival infos */}
          <div className="flex-1 flex flex-col justify-center  items-center xs:items-stretch ">
            <div className="flex items-center gap-2 text-[#848383] font-[500] ">
              <PiAirplaneLandingBold size="20" />
              <span className=" text-xs sm:text-sm leading-normal ">
                Arrival
              </span>
            </div>

            <div>
              <span className="font-bold text-md sm:text-lg leading-normal ">
                {flight?.flightDirection === "A" ? flightHour : "- -"}
              </span>
            </div>

            <div className="  text-[#848383] font-[500] ">
              <span className="text-xs sm:text-sm leading-normal ">
                Airport:{" "}
                {
                  flight?.route?.destinations[
                    flight?.route?.destinations?.length - 1
                  ]
                }
              </span>
            </div>
          </div>
        </div>

        {/* cardbottom */}
        {/* price */}
        <div className="flex-1 flex flex-col justify-center gap-1">
          <div className=" ">
            <span className="text-primary-color font-bold">
              Price: ${price || FLIGHT_CLASSES.PREMIUM_ECONOMY.price}
            </span>
          </div>

          <div className="  text-[#848383] font-[500] ">
            <span className="text-sm">One Way</span>
          </div>
        </div>

        {/* book flight button */}
        {(!newBookingModalOpenState && !checkDetailsModalOpenState) && (
          <div className="absolute bottom-0 right-0">
            <button
              className="bg-primary-color py-4 xs:py-5 px-5 xs:px-9 text-home-bg font-semibold  hover:bg-home-bg hover:text-primary-color transition-all active:bg-black active:text-home-bg rounded-ss-lg rounded-ee-lg text-sm xs:text-md "
              onClick={() => handleBookingButtonClick(flight)}
            >
              Book Flight
            </button>
          </div>
        )}
      </div>
      {(!newBookingModalOpenState && !checkDetailsModalOpenState) && (
        <div className="">
          <button className="bg-[#E6E0EB] px-5 pt-3 pb-3  rounded-b-lg text-[#672CA5]   underline text-sm" onClick={()=>{
            setCheckDetailsOpenState(true);
            setChoosedFlight(flight);
          }}>
            Check the details
          </button>
        </div>
      )}
    </div>
  );
};

export default Flight;
