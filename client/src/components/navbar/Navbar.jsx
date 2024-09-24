import { IoIosAirplane } from "react-icons/io";

import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import Drawer from "../Drawer";
import { useState } from "react";
import { BiSolidFoodMenu } from "react-icons/bi";
import NavItems from "./NavItems"; 


const Navbar = () => {

  //hamburger menu open state for small screens
  const [hamburgerMenuOpenState, setHamburgerMenuOpenState] = useState(false);
 
  return (
    <div className="flex items-center justify-between">
      <Link to="/" className=" flex items-center flex-start gap-3">
        <div className="bg-[rgb(74,0,150)] w-8 h-8 rounded-full flex items-center">
          <IoIosAirplane color="white" size="37" className=" -translate-x-1" />
        </div>
        <span className="font-semibold">PLANE SCAPE</span>
      </Link>

      <ul className="hidden md:flex  items-center gap-4">
        <NavItems />
      </ul>

      <div
        className="hamburger md:hidden bg-primary-color px-3 py-2 rounded-lg hover:bg-[white] group cursor-pointer border border-transparent hover:border-primary-color active:bg-black transition-all"
        onClick={() => setHamburgerMenuOpenState(true)}
      >
        <GiHamburgerMenu className="text-white group-hover:text-primary-color group-active:text-white" />
      </div>

      {
        <div className="md:hidden absolute">
          <Drawer
            openState={hamburgerMenuOpenState}
            setOpenState={setHamburgerMenuOpenState}
            header={"Menu"}
            headerIcon={<BiSolidFoodMenu size="20" />}
            contentComponent={
              <ul className="flex flex-col  justify-center gap-4 mt-6">
              <NavItems />
            </ul>
          
          }
          />
        </div>
      }
    </div>
  );
};

export default Navbar;
