import Flights from "../components/homePage/flights/Flights";
import BookFlight from "../components/homePage/BookFlight";
import Navbar from "../components/navbar/Navbar";

import OtherJobCard from "../components/homePage/OtherJobCard";
import carRental from "../assets/carrental.jpg";
import hotelImage from "../assets/hotel.jpg";
import travelImage from "../assets/travel.png";
import { IoCarSportOutline } from "react-icons/io5";
import { FaHotel } from "react-icons/fa";
import { FaUmbrellaBeach } from "react-icons/fa6";
import { useEffect, useState } from "react";
import useFlightServices from "../services/useFlightServices";
import {  useSelector } from "react-redux";
import Pagination from "../components/homePage/Pagination";
import HiddenFilterButton from "../components/homePage/filters/hiddenFIlters/HiddenFilterButton"; 
import FilterWrapper from "../components/homePage/filters/FilterWrapper";
import Drawer from "../components/Drawer";
import { MdOutlineFilterAlt } from "react-icons/md";
// import { clearFlightSliceLogout } from "../app/features/flightSlice";

const HomePage = () => {
  const { getFlights } = useFlightServices(); //get getFlights from flight custom hook
  const { dateGlobal, sortGlobal, stopGlobal, directionGlobal, pageGlobal } = useSelector((state) => state.flight); //get the global filter states
  // const dispatch = useDispatch(); 

  // get flights request(when home page is on mounted or when the global filters are changed)
  useEffect(() => {
    getFlights();

    //clear the flight slice if the home page component is unmounted
    // return () => {
    //   dispatch(clearFlightSliceLogout());
    // }
    // eslint-disable-next-line
  }, [dateGlobal, sortGlobal, stopGlobal, directionGlobal, pageGlobal]); 
  

  // hidden filter state
  const [hiddenFilterState, setHiddenFilter] = useState(false);




  
  return (
    <div className="bg-gradient-to-r from-home-bg to-box-bg min-h-screen  p-2 ">
      <div className="bg-box-bg min-h-[80%] lg:w-10/12 rounded-3xl mx-auto mt-16 lg:mt-32 py-8 px-4 shadow-2xl">
        <Navbar />

        {/* //?  Home page content  */}
        <section className="flex   flex-col 2xl:flex-row py-5 gap-6">
          {/*  */}
          <div className="flex-1">
            {/* Book Flight */}
            {/* <BookFlight /> */}

            <Pagination />
            {/* Flights and filters */}
            <div className="mt-3 grid grid-cols-4 relative">
              {/* flights */}
              <div className="col-span-4 lg:col-span-3 mt-7 lg:mt-0">
                <Flights />
              </div>

              {/* filters */}
              <FilterWrapper
                setHiddenFilter={setHiddenFilter}
                hiddenFilterState={hiddenFilterState}
              />

              {/* filter button under lg screen */}
              <div className="absolute  lg:hidden -top-9 right-1">
                <HiddenFilterButton setHiddenFilter={setHiddenFilter} />
                <Drawer
                  openState={hiddenFilterState}
                  setOpenState={setHiddenFilter}
                  header={"Filters"}
                  headerIcon={ <MdOutlineFilterAlt size='20'/> }
                />
              </div>
            </div>
          </div>

          {/* //? Other Jobs */}
          <div className="2xl:w-[350px] border flex flex-col md:flex-row 2xl:flex-col gap-5">
            {/* Car rental, hotels, travel packages */}
            {/* cards */}
            <OtherJobCard
              label={"CAR RENTALS"}
              icon={<IoCarSportOutline size="34" />}
              img={carRental}
              color={"orange"}
            />
            <OtherJobCard
              label={"HOTELS"}
              icon={<FaHotel size="34" />}
              img={hotelImage}
              color={"#003198"}
            />
            <OtherJobCard
              label={"TRAVEL PACKAGES"}
              icon={<FaUmbrellaBeach size="34" />}
              img={travelImage}
              color={"green"}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;




  //*filter a component yap homePage i temizle
  //*filter degisince, pagination reset
  //* - ayni draweri menu icinde yap, yap
  //* - tek drwaer yapip ikisi icinde kullandim
  //* - noflights found komponent yapilacak bg si transparent yapilacak
  //* - book fligtha apiyi uygulucan
  //* - book icin backend yazilip, book buttonu uygulanacak(modalla)
  //* - sonra booked flights sayfasi yapilacak
  //* - githuba sadece client gitmis ayarlanacak
  //todo - animation think-check
  //bakcende basliyoruz
  //* flights ve destination icin swagger tamam
  //* user token authentication mw, tamam
  //* permissions tamam
  //* - auth Controller route
  //* - be auth tamam -> fe auth yazilacak
  //* - be ye price eklenecek, bekli bide  class busines economic vs
  
  //* - filter cursor
  //* - login ve register input larini biraz genislet yazi fontuda buyusun iconda
  //* - filters buttonu telefonda uste binmis duzelt
  //* - flight card kuculunce status,book flight butonu, 
  //* -> flight status sm ekran
  //* logout z index ayaralanacak
  //* - fe de ki dateleri asil date den new date cevirip saat vs koy.
  //*check detailse modal yap
  //*past date i modal icinde yap buttonlari sil uyari koy
  
  //cancel - filterlara own clear koy
  //cancel - modallarin basliklarni sabitle

  //*booking kismi ni napcaz!!
  //* - en son logoutla stateleri bosalt
  //* temizlik yorum check
  //push deploy
  //readme

  //* flight statuslar small resolitionlarda takiliyor oynyor

  //*email ekle
  //