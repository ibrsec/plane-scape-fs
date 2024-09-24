


 
import RadioButton from "./RadioButton";
import { CiCalendarDate } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters, 
  setDateGlobal,
  setDirectionGlobal,
  setPageGlobal,
  setSortGlobal, 
} from "../../../app/features/flightSlice";
import { useEffect, useRef } from "react";
const Filters = () => {
  const dispatch = useDispatch();
  //get the global filters for home page
  const { dateGlobal, sortGlobal, directionGlobal } = useSelector(
    (state) => state.flight
  );

  const isInitialRender = useRef(true);

  // set the page to 1 when global states change, but avoid on initial render
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      dispatch(setPageGlobal(1));
    }
    // eslint-disable-next-line
  }, [dateGlobal, sortGlobal, directionGlobal]);



  //handle changes
  
  const handleDateChange = (value) => {
    dispatch(setDateGlobal(value));
  };


  const handleSortChange = (value) => {
    dispatch(setSortGlobal(value));
  };

  const handleDirectionChange = (value) => {
    dispatch(setDirectionGlobal(value));
  };


 
 

  return (
    <div className="py-3 ps-5 pe-2">
      {/* sort by */}
      <div className="mb-4">
        <span className="font-bold ">Sort by:</span>
        <select
          name="sort"
          id="sort"
          className="w-full focus:outline-none px-3 py-2 mt-3  rounded-lg cursor-pointer"
          value={sortGlobal}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="+scheduleDate">Flight Date Asc</option>
          <option value="-scheduleDate">Flight Date Desc</option>
          <option value="+scheduleTime">Flight Hour Asc</option>
          <option value="-scheduleTime">Flight Hour Desc</option>
        </select>
      </div>

      {/* Date Selection */}
      <div className="mb-4">
        <span className="font-bold">Date Selection</span>
        <div className="flex items-center justify-between mb-1 mt-2">
          <RadioButton
            name={"dateSelection"}
            id={new Date().toISOString().split("T")[0]} //today yyyy-mm-dd format
            label={"Today"}
            value={dateGlobal}
            onChange={handleDateChange}
          />
        </div>
        <div className="flex items-center justify-between mb-1">
          <RadioButton
            name={"dateSelection"}
            id={new Date(Date.now() + 86400000).toISOString().split("T")[0]} //tomorrow yyyy-mm-dd format
            label={"Tomorrow"}
            value={dateGlobal}
            onChange={handleDateChange}
          />
        </div>
        
        <div className="flex flex-col items-start justify-center mb-4">
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
            value={dateGlobal}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>
      </div>

      {/* Flight Direction */}
      <div className="mb-4">
        <span className="font-bold">Flight Direction</span>
        <div className="flex items-center  mb-1 mt-2">
          <RadioButton
            name={"direction"}
            id={"D"}
            // defaultChecked={false}
            label={"Department"}
            value={directionGlobal}
            onChange={handleDirectionChange}
          />
        </div>
        <div className="flex items-center  mb-1 mt-2">
          <RadioButton
            name={"direction"}
            id={"A"}
            // defaultChecked={false}
            label={"Arrival"}
            value={directionGlobal}
            onChange={handleDirectionChange}
          />
        </div>
      </div>



      {/* clear button */}
      <div className="flex items-center justify-center border">
        <button
          className="btn-primary flex items-center gap-1"
          onClick={() => dispatch(clearFilters())}
        >
          ❌ Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
