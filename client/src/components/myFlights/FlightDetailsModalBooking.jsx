import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useState } from "react";

import { TbListDetails } from "react-icons/tb";

import { IoAirplaneSharp } from "react-icons/io5"; 
import { FLIGHT_CLASSES } from "../../helpers/fligtClassContants";
import { fullTimeForScreenCalculation } from "../../helpers/timeCalculations";
import Booking from "./bookings/Booking";

const FlightDetailsModalBooking = ({
  open,
  setOpen,
  choosedFlight,
}) => {
  // eslint-disable-next-line
  const [selectedClass, setSelectedClass] = useState(
    FLIGHT_CLASSES[choosedFlight?.flightClass]
  );

  //brings the selected flights flight class infos
  useEffect(() => {
    setSelectedClass(FLIGHT_CLASSES[choosedFlight?.flightClass]);
    // eslint-disable-next-line
  }, [open]);

  // a payload obj is created for be able to screening the flight details
  const payload = {
    flightId: choosedFlight?.flightId,
    flightNumber: choosedFlight?.flightNumber,
    flightName: choosedFlight?.flightName,
    flightDirection: choosedFlight?.flightDirection,
    prefixIATA: choosedFlight?.prefixIATA,
    prefixICAO: choosedFlight?.prefixICAO,
    route: choosedFlight?.route,
    scheduleDateTime: choosedFlight?.scheduleDateTime,
    flightClass: choosedFlight?.flightClass,
    price: choosedFlight?.price,
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-auto scroll-smooth rounded-lg bg-gradient-to-r to-home-bg from-box-bg text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8  data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 pb-10"
            // sm:w-full sm:max-w-lg
          >
            <div className=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4  ">
              <div className="sm:flex sm:items-start  min-h-[75vh] w-[80vw] ">
                <div className="sm:flex sm:items-start w-full  h-[75vh]  ">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-transparent sm:mx-0 sm:h-10 sm:w-10  ">
                    <TbListDetails className="text-primary-color" size="45px" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full h-full ">
                    <DialogTitle
                      as="h3"
                      className="text-xl font-bold  leading-6 text-primary-color translate-y-2"
                    >
                      Flight Details
                    </DialogTitle>

                    <div className="mt-10 w-full h-full ">
                      <div className="w-full">
                        <Booking
                          booking={choosedFlight}
                          deleteModalOpen={false}
                          // setDeleteModalOpen={}
                          setIdForDelete={choosedFlight?._id}
                          // setChoosedFlight={}
                          // setFlightDetailsOpenState={}
                          detailsModal={open}
                          
                        />
                      </div>
                      <form className="my-5 flex items-center justify-start flex-col gap-1  ">
                        {/* flightNumber */}
                        <div
                          className={
                            " bg-box-bg w-full md:w-10/12 lg:w-6/12 text-center opacity-70 flex items-center justify-between rounded-md bg-transparent focus:outline-none "
                          }
                        >
                          <label
                            htmlFor="flightNumber"
                            className="p-2 flex items-center gap-2 text-nowrap"
                          >
                            <IoAirplaneSharp className="text-primary-color " />{" "}
                            Fligth Number:
                          </label>
                          <input
                            type="text"
                            className="p-2 pl-3 text-primary-color w-full text-end bg-transparent focus:outline-none    border-home-bg placeholder-primary-color "
                            placeholder="Flight Number"
                            name="flightNumber"
                            id="flightNumber"
                            disabled
                            value={payload.flightNumber}
                          />
                        </div>

                        {/* flightName */}
                        <div className=" bg-box-bg  w-full md:w-10/12 lg:w-6/12 text-center opacity-70 flex items-center justify-between rounded-md bg-transparent focus:outline-none">
                          <label
                            htmlFor="flightName"
                            className="p-2 flex items-center gap-2  text-nowrap"
                          >
                            <IoAirplaneSharp className="text-primary-color" />{" "}
                            Fligth Name:
                          </label>
                          <input
                            type="text"
                            className="p-2 pl-3 text-primary-color w-full text-end bg-transparent focus:outline-none    border-home-bg placeholder-primary-color "
                            placeholder="Flight Number"
                            name="flightName"
                            id="flightName"
                            disabled
                            value={payload.flightName}
                          />
                        </div>
                        {/* flightDirection */}
                        <div className=" bg-box-bg  w-full md:w-10/12 lg:w-6/12 text-center opacity-70 flex items-center justify-between rounded-md bg-transparent focus:outline-none">
                          <label
                            htmlFor="flightDirection"
                            className="p-2 flex items-center gap-2  text-nowrap"
                          >
                            <IoAirplaneSharp className="text-primary-color" />{" "}
                            Fligth Direction:
                          </label>
                          <input
                            type="text"
                            className="p-2 pl-3 text-primary-color w-full text-end bg-transparent focus:outline-none    border-home-bg placeholder-primary-color "
                            placeholder="Flight Number"
                            name="flightDirection"
                            id="flightDirection"
                            disabled
                            value={
                              payload.flightDirection === "A"
                                ? "Arrival"
                                : "Department"
                            }
                          />
                        </div>
                        {/* Destinations (route)*/}
                        <div className=" bg-box-bg  w-full md:w-10/12 lg:w-6/12 text-center opacity-70 flex items-center justify-between rounded-md bg-transparent focus:outline-none">
                          <label
                            htmlFor="route"
                            className="p-2 flex items-center gap-2  text-nowrap"
                          >
                            <IoAirplaneSharp className="text-primary-color" />{" "}
                            Destinations:
                          </label>
                          <input
                            type="text"
                            className="p-2 pl-3 text-primary-color w-full text-end  bg-transparent focus:outline-none    border-home-bg placeholder-primary-color "
                            placeholder="Flight Number"
                            name="route"
                            id="route"
                            disabled
                            value={payload?.route?.join(", ")}
                          />
                        </div>
                        {/* Date */}
                        <div className=" bg-box-bg  w-full md:w-10/12 lg:w-6/12 text-center opacity-70 flex items-center justify-between rounded-md bg-transparent focus:outline-none">
                          <label
                            htmlFor="scheduleDateTime"
                            className="p-2 flex items-center gap-2  text-nowrap"
                          >
                            <IoAirplaneSharp className="text-primary-color" />{" "}
                            Date:
                          </label>
                          <input
                            type="text"
                            className="p-2 pl-3 text-primary-color w-full text-end bg-transparent focus:outline-none    border-home-bg placeholder-primary-color text-wrap text-sm md:tex-md "
                            placeholder="Flight Number"
                            name="scheduleDateTime"
                            id="scheduleDateTime"
                            disabled
                            value={fullTimeForScreenCalculation(
                              payload?.scheduleDateTime
                            )}
                          />
                        </div>
                        {/* Current Date */}
                        <div className=" bg-box-bg  w-full md:w-10/12 lg:w-6/12 text-center opacity-70 flex items-center justify-between rounded-md bg-transparent focus:outline-none">
                          <label
                            htmlFor="currentDate"
                            className="p-2 flex items-center gap-2  text-nowrap"
                          >
                            <IoAirplaneSharp className="text-primary-color" />{" "}
                            Current Date:
                          </label>
                          <input
                            type="text"
                            className="p-2 pl-3 text-primary-color w-full text-end bg-transparent focus:outline-none    border-home-bg placeholder-primary-color text-wrap text-sm md:tex-md "
                            placeholder="Current Date"
                            name="currentDate"
                            id="currentDate"
                            disabled
                            value={fullTimeForScreenCalculation(new Date())}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default FlightDetailsModalBooking;
