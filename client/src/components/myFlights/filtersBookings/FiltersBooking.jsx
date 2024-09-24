import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAirlineFilterBooking,
  clearDateFilterBooking,
  clearDestinationFilterBooking,
  clearFiltersBooking,
  setAirlineGlobalBooking,
  setDateGlobalBooking,
  setDestinationGlobalBooking,
  setPageGlobalBooking,
} from "../../../app/features/bookingSlice";
import { CiCalendarDate } from "react-icons/ci";
import RadioButton from "../../homePage/filters/RadioButton";
import { MdAirlines } from "react-icons/md";
const FiltersBooking = () => {
  const dispatch = useDispatch();
  const {
    dateGlobalBooking, 
    airlineGlobalBooking,
    destinationGlobalBooking,
  } = useSelector((state) => state.booking);
  

  const isInitialRender = useRef(true);
  //reset the page when any of the filtering fileds is changed
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      dispatch(setPageGlobalBooking(1));
    }
    
    // eslint-disable-next-line
  }, [dateGlobalBooking, airlineGlobalBooking, destinationGlobalBooking]);






  //!DATE SETTINGS  
  const handleDateChange = (value) => {
    dispatch(setDateGlobalBooking(value));
  };

  const [dateMenu, setDateMenu] = useState(false);
  const dateDropdownRef = useRef(null);

  // listen outside clickings with useEffect
  useEffect(() => {
    const handleClickOutside = (event) => {
      // if clecked one is outside of the dropdown, close the drop down
      if (
        dateDropdownRef.current &&
        !dateDropdownRef.current.contains(event.target)
      ) {
        setDateMenu(false);
      }
    };

    //  Listen clicking on the page
    document.addEventListener("mousedown", handleClickOutside);

    // when the Component unmount , clean the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dateDropdownRef]);



  //!AIRLINE SETTINGS
  const handleAirlineChange = (value) => {
    dispatch(setAirlineGlobalBooking(value));
  };

  const [airlineMenu, setAirlineMenu] = useState(false);
  const airlineDropdownRef = useRef(null);

  // listen outside clickings with useEffect
  useEffect(() => {
    const handleClickOutside = (event) => {
      // if clecked one is outside of the dropdown, close the drop down
      if (
        airlineDropdownRef.current &&
        !airlineDropdownRef.current.contains(event.target)
      ) {
        setAirlineMenu(false);
      }
    };

    //  Listen clicking on the page
    document.addEventListener("mousedown", handleClickOutside);

    // when the Component unmount , clean the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [airlineDropdownRef]);




  //! DESTINATION SETTINGS
  const handleDestinationChange = (value) => {
    dispatch(setDestinationGlobalBooking(value));
  };

  const [destinationMenu, setDestinationMenu] = useState(false);
  const destinationDropdownRef = useRef(null);

  // listen outside clickings with useEffect
  useEffect(() => {
    const handleClickOutside = (event) => {
      // if clecked one is outside of the dropdown, close the drop down
      if (
        destinationDropdownRef.current &&
        !destinationDropdownRef.current.contains(event.target)
      ) {
        setDestinationMenu(false);
      }
    };

    //  Listen clicking on the page
    document.addEventListener("mousedown", handleClickOutside);

    // when the Component unmount , clean the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [destinationDropdownRef]);
  

  
  return (
    <>
      <div className="white-card-wrapper rounded-lg  gap-3 flex flex-col sm:flex-row items-center relative pb-32 xs:pb-20 sm:pb-12">
    <p className="text-xs text-gray-400 absolute top-2 left-2 ">Filters:</p>
        <div className="flex items-center gap-3 flex-col xs:flex-row">
          {/* date filter */}
          <div className="relative">
            <button
              id="dropdownNavbarLink"
              data-dropdown-toggle="dropdownNavbar"
              className="flex items-center justify-center w-28 py-2 px-3 text-gray-900 hover:bg-gray-100  hover:text-primary-color   text-sm border-2 border-gray-400 rounded-md "
              onClick={() => setDateMenu(!dateMenu)}
            > 
              Date
            </button>

            {/* Dropdown menu */}
            <div
              ref={dateDropdownRef}
              id="dropdownNavbar"
              className={
                "z-30  font-normal bg-home-bg divide-y divide-gray-100 rounded-lg shadow w-44 absolute " +
                (dateMenu ? "" : " hidden")
              }
            >
              {/* Date Selection */}
              <div className="mb-4 px-4 py-3 ">
                {/* <span className="font-bold">Date Selection</span> */}
                <div className="flex items-center justify-between mb-1 mt-2">
                  <RadioButton
                    name={"dateSelection"}
                    id={new Date().toISOString().split("T")[0]} //today yyyy-mm-dd format
                    label={"Today"}
                    value={dateGlobalBooking}
                    onChange={handleDateChange}
                  />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <RadioButton
                    name={"dateSelection"}
                    id={
                      new Date(Date.now() + 86400000)
                        .toISOString()
                        .split("T")[0]
                    } //tomorrow yyyy-mm-dd format
                    label={"Tomorrow"}
                    value={dateGlobalBooking}
                    onChange={handleDateChange}
                  />
                </div>

                <div className="mt-3 flex flex-col items-start justify-center mb-4">
                  <label
                    htmlFor="dateSelection"
                    className="flex items-center gap-2 text-gray-600 mb-1"
                  >
                    <CiCalendarDate color="black" className="text-xl" />
                    <span className="font-medium">Choose a date</span>
                  </label>
                  <input
                    type="date"
                    className="w-full focus:outline-none px-3 py-2 mb-3 rounded-lg "
                    placeholder="Date"
                    name="dateSelection"
                    id="dateSelection"
                    value={dateGlobalBooking}
                    onChange={(e) => handleDateChange(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* airline search */}
          <div className="relative">
            <button
              id="dropdownNavbarLink"
              data-dropdown-toggle="dropdownNavbar"
              className="flex items-center justify-center w-28 py-2 px-3 text-gray-900 hover:bg-gray-100  hover:text-primary-color   text-sm border-2 border-gray-400 rounded-md "
              onClick={() => setAirlineMenu(!airlineMenu)}
            >
              Airline
            </button>

            {/* Dropdown menu */}
            <div
              ref={airlineDropdownRef}
              id="dropdownNavbar"
              className={
                "z-30  font-normal bg-home-bg divide-y divide-gray-100 rounded-lg shadow w-52 absolute " +
                (airlineMenu ? "" : " hidden")
              }
            >
              {/* Date Selection */}
              <div className="mb-4 px-3 py-3  ">
                <div className="mt-3 flex flex-col items-start justify-center mb-4">
                  <label
                    htmlFor="airlineSearch"
                    className="flex items-center gap-2 text-gray-600 mb-1"
                  >
                    <MdAirlines color="black" className="text-xl" />
                    <span className="font-medium">Search</span>
                  </label>
                  <input
                    type="text"
                    className="w-full focus:outline-none px-3 py-2 mb-3 rounded-lg "
                    placeholder="Search a airline"
                    name="airlineSearch"
                    id="airlineSearch"
                    value={airlineGlobalBooking}
                    onChange={(e) => handleAirlineChange(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex sm:items-center gap-3 flex-col xs:flex-row ">
          {/* destination search */}
          <div className="relative">
            <button
              id="dropdownNavbarLink"
              data-dropdown-toggle="dropdownNavbar"
              className="flex items-center justify-center w-28 py-2 px-3 text-gray-900 hover:bg-gray-100  hover:text-primary-color   text-sm border-2 border-gray-400 rounded-md "
              onClick={() => setDestinationMenu(!destinationMenu)}
            >
              Destination
            </button>

            {/* Dropdown menu */}
            <div
              ref={destinationDropdownRef}
              id="dropdownNavbar"
              className={
                "z-30  font-normal bg-home-bg divide-y divide-gray-100 rounded-lg shadow w-52 absolute " +
                (destinationMenu ? "" : " hidden")
              }
            >
              {/* Date Selection */}
              <div className="mb-4 px-3 py-3  ">
                <div className="mt-3 flex flex-col items-start justify-center mb-4">
                  <label
                    htmlFor="destinationSearch"
                    className="flex items-center gap-2 text-gray-600 mb-1"
                  >
                    <MdAirlines color="black" className="text-xl" />
                    <span className="font-medium">Search</span>
                  </label>
                  <input
                    type="text"
                    className="w-full focus:outline-none px-3 py-2 mb-3 rounded-lg "
                    placeholder="Search a Destination"
                    name="destinationSearch"
                    id="destinationSearch"
                    value={destinationGlobalBooking}
                    onChange={(e) => handleDestinationChange(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <button
              id="dropdownNavbarLink"
              data-dropdown-toggle="dropdownNavbar"
              className="flex items-center justify-center w-28 py-2 px-3 text-gray-900 hover:bg-gray-100  hover:text-primary-color   text-sm border-2 border-gray-400 rounded-md "
              onClick={() => dispatch(clearFiltersBooking())}
            >
              Clear
            </button>
          </div>
        </div>
        {/* filter fields */}
        <div className="absolute bottom-2 left-2 flex items-start sm:items-center gap-2 flex-wrap">
          {
            dateGlobalBooking && <div className="text-nowrap " >
            <span  className="text-xs mr-1">Date:</span>
            <span className="bg-home-bg py-1 px-2 rounded-full text-xs text-nowrap cursor-pointer" onClick={()=>dispatch(clearDateFilterBooking())}>{dateGlobalBooking}{" x"}</span>
            </div>
          }
          {
            airlineGlobalBooking && <div className="text-nowrap " >
            <span  className="text-xs mr-1">Airline:</span>
            <span className="bg-home-bg py-1 px-2 rounded-full text-xs text-nowrap cursor-pointer" onClick={()=>dispatch(clearAirlineFilterBooking())}>{airlineGlobalBooking}{" x"}</span>
            </div>
          }
          {
            destinationGlobalBooking && <div className="text-nowrap "  >
            <span  className="text-xs mr-1">Destination:</span>
            <span className="bg-home-bg py-1 px-2 rounded-full text-xs text-nowrap cursor-pointer" onClick={()=>dispatch(clearDestinationFilterBooking())}>{destinationGlobalBooking}{" x"}</span>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default FiltersBooking;
