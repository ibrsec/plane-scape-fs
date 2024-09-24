import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { LuChevronFirst } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import {  
  setPageGlobal,
} from "../../app/features/flightSlice";
import { useEffect, useState } from "react";
const Pagination = () => {


  
  const dispatch = useDispatch();
  const {pageGlobal,flights} = useSelector((state) => state.flight);  //get the global page and flights 
  const [page, setPage] = useState(pageGlobal); //local state of the pagination page of the home page


//set the global page when local page is changed
  useEffect(() => {
    dispatch(setPageGlobal(page)); 
    // eslint-disable-next-line 
  }, [page]);

  //set the local page when global page is changed
  useEffect(() => {
    setPage(pageGlobal) 
    // eslint-disable-next-line 
  }, [pageGlobal]);

  return (
    <div>
      <div className="flex items-center justify-center gap-3 mt-10 flex-wrap">
      <button
          className="btn-primary w-26 flex items-center justify-center gap-1 text-nowrap text-sm md:text-md"
          onClick={() => setPage(1)}
        >
          First Page <LuChevronFirst />
        </button>
        <div className="flex items-center gap-1">
        <button
          className="btn-primary w-26 flex items-center justify-center gap-1 text-nowrap  text-sm md:text-md"
          onClick={() => {
            if (page > 1) setPage(page - 1); // if user is not on the first page then decrease the page by 1
          }}
          disabled={page === 1}
        >
          Prev <GrPrevious />
        </button>
        <button
          className="btn-primary w-26 flex items-center justify-center gap-1 text-nowrap  text-sm md:text-md "
          onClick={() => setPage(page + 1)}
          disabled={flights?.length === 0 || !flights} // in schiphol api there is no pagination details, so after request if there is no flights then disable the next button
        >
          Next <GrNext />
        </button>
        </div>
      </div>
      <div className="text-center my-3">Page: {page}</div> {/* // screen the landed page */}
    </div>
  );
};

export default Pagination;
