import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { LuChevronFirst } from "react-icons/lu";
import { LuChevronLast } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux"; 
import { useEffect, useState } from "react";
import { setPageGlobalBooking } from "../../app/features/bookingSlice";
const PaginationBooking = () => {
  const dispatch = useDispatch();

  //get the page details from global states
  const { pageGlobalBooking, pageDetails } = useSelector(
    (state) => state.booking
  ); 

  //local page state
  const [page, setPage] = useState(pageGlobalBooking);

  //sets the globalpage booking state when local page state is changed
  useEffect(() => {
    dispatch(setPageGlobalBooking(page));
    // eslint-disable-next-line
  }, [page]);

  //sets the local page state when global page booking state is changed
  useEffect(() => {
    setPage(pageGlobalBooking);
    // eslint-disable-next-line
  }, [pageGlobalBooking]);

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
              if (page > 1) setPage(page - 1);
            }}
            disabled={page === 1}
          >
            Prev <GrPrevious />
          </button>
          <button
            className="btn-primary w-26 flex items-center justify-center gap-1 text-nowrap  text-sm md:text-md "
            onClick={() => {
              if (pageDetails?.pages && pageDetails?.pages.next) {
                setPage(page + 1);
              }
            }}
            disabled={!pageDetails?.pages?.next}
          >
            Next <GrNext />
          </button>
        </div>
        <button
          className="btn-primary w-26 flex items-center justify-center gap-1 text-nowrap text-sm md:text-md"
          onClick={() => {
            pageDetails?.pages?.totalPages && setPage(pageDetails?.pages?.totalPages );
          }}
        >
          Last Page <LuChevronLast />
        </button>
      </div>
      <div className="text-center my-3">Page: {page}</div>
      <div className="text-center my-3 flex items-center justify-center gap-1 flex-wrap">
        <span>Total Page: {pageDetails?.pages ? pageDetails?.pages?.totalPages : 1}</span>
        <span>Total Records: {pageDetails?.totalRecords}</span></div>
    </div>
  );
};

export default PaginationBooking;
