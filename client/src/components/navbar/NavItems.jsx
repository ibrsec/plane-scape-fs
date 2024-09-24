import { ImPriceTag } from "react-icons/im";
import { FaEarthAmericas } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import profileImage from "../../assets/profile-placeholder.jpg";
import { useSelector } from "react-redux";
import useAuthServices from "../../services/useAuthServices";
import { TbLogin2 } from "react-icons/tb";
import { FaCashRegister } from "react-icons/fa";
import { MdFlight } from "react-icons/md";

 
const NavItems = () => {
  const { user, accessToken } = useSelector((state) => state.auth); //for checking if the user is loginned
  const { logoutApi } = useAuthServices();
  const location = useLocation(); //for screening active navbar item
  return (
    <>
      <li>
        <Link to="/" className={"flex items-center gap-2  transition-all duration-300 hover:text-primary-color active:text-black   hover:scale-105 py-1 px-2 rounded-md  "+ (location.pathname === '/' ? 'bg-home-bg text-primary-color' : "")}>
          <ImPriceTag color="#4A0096" className=" translate-y-0.5" />
          <span>Flights</span>
        </Link>
      </li>
      <li>
        <Link className="flex items-center gap-2 transition-all duration-300 hover:text-primary-color active:text-black   hover:scale-105 ">
          <FaEarthAmericas color="#4A0096" className=" translate-y-0.5" />
          <span>Discover</span>
        </Link>
      </li>

      {/* my flights */}
      <li>
        <Link to='/myflights' className={"flex items-center gap-1 transition-all duration-300 hover:text-primary-color active:text-black   hover:scale-105 py-1 px-2 rounded-md " + (location.pathname === '/myflights' ? 'bg-home-bg text-primary-color' : "")}>
          <MdFlight color="#4A0096" className=" " size='18'/>
          <span>My Flights</span>
        </Link>
      </li>


      {!accessToken && (
        <li>
          <Link
            to="/login"
            className={"flex items-center gap-2 transition-all duration-300 hover:text-primary-color active:text-black   hover:scale-105 py-1 px-2 rounded-md " + (location.pathname === '/login' ? 'bg-home-bg text-primary-color' : "")}
          >
            <TbLogin2 color="#4A0096" className=" translate-y-0.5" />
            <span>Login</span>
          </Link>
        </li>
      )}

      {!accessToken && (
        <li>
          <Link
            to="/register"
            className={"flex items-center gap-2 transition-all duration-300 hover:text-primary-color active:text-black   hover:scale-105 py-1 px-2 rounded-md " + (location.pathname === '/register' ? 'bg-home-bg text-primary-color' : "")}
          >
            <FaCashRegister color="#4A0096" className=" translate-y-0.5" />
            <span>Register</span>
          </Link>
        </li>
      )}
      {accessToken && (
      <li>
        <div className="flex items-center gap-2 pe-3 group relative">
          <img
            className="w-8 h-8 rounded-full border-2 border-primary-color"
            src={user?.image || profileImage}
            alt="profileImage"
          />
          <span>{user?.fullName}</span>
          
          {accessToken && (
          <button
            className="btn-primary absolute group-hover:inline hidden md:-bottom-8 right-0 z-20"
            onClick={logoutApi}
          >
            Logout
          </button>
          )}
        </div>
      </li>
      )}
    </>
  );
};

export default NavItems;
