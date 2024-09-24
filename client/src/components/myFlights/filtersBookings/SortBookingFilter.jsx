import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPageGlobalBooking, setSortGlobalBooking } from '../../../app/features/bookingSlice';

const SortBookingFilter = () => {
    const dispatch = useDispatch();
  const {sortGlobalBooking  } = useSelector(
    (state) => state.booking
  );


  const isInitialRender = useRef(true);
  

  
 //reset the page when sorting is changed
  useEffect(()=> {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      dispatch(setPageGlobalBooking(1));
    }
    
    // eslint-disable-next-line
  },[sortGlobalBooking]) 
 
//sort change handler
  const handleSortChange = (value) => {
    dispatch(setSortGlobalBooking(value));
  };
 



  return (
    <form>
         {/* sort by */}
      <div className="mb-4 flex items-center justify-start gap-1">
        <span className="font-bold text-nowrap ">Sort by:</span>
        <select
          name="sort"
          id="sort"
          className=" focus:outline-none px-3 py-2   rounded-lg cursor-pointer bg-transparent"
          value={sortGlobalBooking}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="+scheduleDate">Flight Date Asc</option>
          <option value="-scheduleDate">Flight Date Desc</option>
          <option value="+scheduleTime">Flight Hour Asc</option>
          <option value="-scheduleTime">Flight Hour Desc</option>
        </select>
      </div>
    </form>
  )
}

export default SortBookingFilter