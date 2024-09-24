import Navbar from "../components/navbar/Navbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import FiltersBooking from "../components/myFlights/filtersBookings/FiltersBooking";
import SortBookingFilter from "../components/myFlights/filtersBookings/SortBookingFilter";
import useBookingServices from "../services/useBookingServices";
import PaginationBooking from "../components/myFlights/PaginationBooking";
import Bookings from "../components/myFlights/bookings/Bookings";
import AvgFare from "../components/myFlights/AvgFare";

const MyFlights = () => {
  const { getBookings } = useBookingServices(); //get request method from the booking custom hook
  const { sortGlobalBooking, pageGlobalBooking, dateGlobalBooking, airlineGlobalBooking, destinationGlobalBooking } = useSelector(
    (state) => state.booking
  ); //get the global filters states for boking page

  // get flights request(when my flights page is on mounted or when the global filters are changed)
  useEffect(() => {
    getBookings();
    // eslint-disable-next-line
  }, [sortGlobalBooking, pageGlobalBooking, dateGlobalBooking, airlineGlobalBooking, destinationGlobalBooking]);


  return (
    <div className="bg-gradient-to-r from-home-bg to-box-bg min-h-screen  p-2 ">
      <div className="bg-box-bg min-h-[80%] lg:w-10/12 rounded-3xl mx-auto mt-16 lg:mt-32 py-8 px-4 shadow-2xl">
        <Navbar />

        {/* //?  My flights content  */}
        <section className="flex   flex-col 2xl:flex-row py-5 gap-6">
          {/*  */}
          <div className="flex-1">
            {/* filters nav */}
            <FiltersBooking />

            <PaginationBooking />

            <div className=" flex items-center gap-2 justify-between">
              {/* sort filter */}
              <SortBookingFilter />
              <AvgFare />
            </div>
            {/* Flights and filters */}
            <div className="mt-3  relative">
              {/* flights */}
              <div className=" mt-7 lg:mt-0">
                <Bookings />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyFlights;




  //*fazla sorgu yapmasin flight lar icin undefined sotgu yapiyor
  //*- cache koydum,
  //*flight status
  //* check detailsi Sil
  //* -  flight Status u myFlightsa koycaz
  //* filter nav - airline kod, destination kod,  tarih,
  //*  airline ve destination backendede eklenirse burdan filteri isimleri ile yapilabilir.
  // * - delete button eklenecek
  //* - delete butonu eminmisin
  //* - flight detail ciin modal acacazmi ? actik