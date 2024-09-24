import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react"; 
import { useEffect, useState } from "react"; 
import { toastDefault, toastWarn } from "../../../helpers/toastify"; 

import { PiBookmarkSimpleDuotone } from "react-icons/pi";
import { IoAirplaneSharp } from "react-icons/io5";
import Flight from "../flights/Flight";
import useBookingServices from "../../../services/useBookingServices";
import FlightClassSelector from "./FlightClassSelector";
import { FLIGHT_CLASSES } from "../../../helpers/fligtClassContants";
import { fullTimeForScreenCalculation } from "../../../helpers/timeCalculations";

const NewBookingModal = ({
  open,
  setOpen,
  choosedFlight,
  setChoosedFlight,
}) => { //destructing
  const [selectedClass, setSelectedClass] = useState(
    FLIGHT_CLASSES.PREMIUM_ECONOMY
  ); //when user is openden the new book flight modal, default class will be the premium economy

  //when modal is opened, set the selected class modal(everytime,  if it is changed at the previous opened modal then it will be reset with this use effect)
  useEffect(() => {
    setSelectedClass(FLIGHT_CLASSES.PREMIUM_ECONOMY);
  }, [open]);

  //when selected class changes, update the payload of the booking
  useEffect(() => {
    payload.flightClass = selectedClass?.label;
    payload.price = selectedClass?.price;
    // eslint-disable-next-line
  }, [selectedClass]);

  const { createBookingApi } = useBookingServices(); //get the createBookinApi request from booking custom hook


  //user can change just the class and price, other ones dont need ant handle change 
  const payload = {
    flightId: choosedFlight?.id || "",
    flightNumber: choosedFlight?.flightNumber || "",
    flightName: choosedFlight?.flightName || "",
    flightDirection: choosedFlight?.flightDirection || "",
    prefixIATA: choosedFlight?.prefixIATA || "",
    prefixICAO: choosedFlight?.prefixICAO || "",
    route: choosedFlight?.route?.destinations || [],
    scheduleDateTime: choosedFlight?.scheduleDateTime || "",
    flightClass: selectedClass?.label || "",
    price: selectedClass?.price || "",
    airline: choosedFlight?.airline || (choosedFlight?.prefixIATA+"(airlineCode)") || "",
    destination: choosedFlight?.destination || (choosedFlight?.route?.destinations[choosedFlight?.route?.destinations.length -1]+"(destinationIATA)") ||"",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //if flight is a arrival flight chackeing
    if (payload.flightDirection !== "D") {
      toastWarn("Booking is only allowed for departing flights!");
      return;
    }

    //if the flight already departed check
    if (new Date(payload.scheduleDateTime) < new Date()) {
      toastDefault("Booking a flight for past dates is not allowed!");
      return;
    }
 
    //make the create new booking request
    createBookingApi(payload);

    //reset the choosen flight info for after new book modal openings
    setChoosedFlight({});

    //close the modal
    setOpen(false);
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
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-transparent sm:mx-0 sm:h-10 sm:w-10 ">
                    <PiBookmarkSimpleDuotone
                      className="text-primary-color"
                      size="45px"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full h-full ">
                    <DialogTitle
                      as="h3"
                      className="text-xl font-bold  leading-6 text-primary-color translate-y-2"
                    >
                      Book the Flight
                    </DialogTitle>

                    <div className="mt-10 w-full h-full ">
                      <div className="w-full">
                        <Flight
                          flight={choosedFlight}
                          newBookingModalOpenState={open}
                          price={selectedClass?.price}
                        />
                      </div>
                      <form
                        className="my-5 flex items-center justify-start flex-col gap-1  "
                        onSubmit={handleSubmit}
                      >
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
                              payload.scheduleDateTime
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


                        {/* post flight check and for render book elements */}
                        {
                          new Date(payload.scheduleDateTime) < new Date() ?
                          <div className="text-red-500 bg-red-100 p-4 rounded-lg mt-10">
                          <p className="text-lg font-medium">
                            This flight has already departed. Booking is not possible for past flights.
                          </p>
                        </div>
                          :
                          <>
                          {/* Flight Class component */}
                        <FlightClassSelector
                          selectedClass={selectedClass}
                          setSelectedClass={setSelectedClass}
                        />

                        {/* modal buttons */}
                        <div className="mt-3 mb-20 justify-center flex items-center gap-2">
                          <button
                            type="button" 
                            onClick={() => {
                              setChoosedFlight({});
                              setOpen(false);
                            }}
                            className="btn-primary w-[150px] bg-home-bg text-primary-color hover:bg-primary-color hover:text-home-bg"
                          >
                            Cancel
                          </button>
                          <button
                            className="btn-primary w-[150px]"
                            type="submit"
                          >
                            Create
                          </button>
                        </div>

                          </>
                        }

                        
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

export default NewBookingModal;
