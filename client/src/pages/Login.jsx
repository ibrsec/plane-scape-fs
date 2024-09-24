
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import useAuthServices from "../services/useAuthServices";
import { passwordValidation } from "../helpers/passwordValidation";
import { toastDefault } from "../helpers/toastify";
import { useSelector } from "react-redux"; 
import { IoIosAirplane } from "react-icons/io";
import Navbar from "../components/navbar/Navbar";

const Login = () => {
  const { loginApi } = useAuthServices();
  const [passEye, setPassEye] = useState(false); //password visibility state
  const [passError, setPassError] = useState(""); //password warning state
  const [inputs, setInputs] = useState({ //inputs local state
    username: "",
    password: "",
  });

  //inputs handle change 
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  //password type check use effect
  useEffect(() => {
    if (inputs.password) passwordValidation(inputs.password, setPassError);
  }, [inputs]);

  //handling submit login form
  const handleSubmit = (e) => {
    e.preventDefault();

    //check if fields are entered
    if (!inputs.username || !inputs.password) {
      toastDefault("Please enter a username and a password!");
      return;
    }

    //check any password type check error is occured!
    if (passError) {
      toastDefault("Invalid password type!");
      return;
    }

    //make the login request with the credentials to the backend
    loginApi(inputs);
    //navigating to the home page is happening in the login api request function

    //reset input fields
    setInputs({
      username: "",
      password: "",
    });
  };

//get access token from global redux for be able to restrict the entering login page
  const accessToken = useSelector((state) => state.auth.accessToken);

  //if user has already loginned, he cant go to the login page
  return accessToken ? (
    <Navigate to="/" />
  ) : (

    <>
    <div className="fixed top-0 w-full py-7 px-2 max-w-[1200px] left-1/2 -translate-x-1/2 z-50">
    <Navbar />

    </div>
    <div className="pt-28 pb-10 px-1  bg-gradient-to-r from-home-bg to-box-bg min-h-screen flex items-center justify-center">
      <div className=" p-3 rounded-lg min-w-96">
        <div className=" flex items-center justify-center flex-start gap-3  mb-5">
          <div className="bg-[rgb(74,0,150)] w-8 h-8 rounded-full flex items-center">
            <IoIosAirplane
              color="white"
              size="42"
              className=" -translate-x-1"
            />
          </div>
          <span className="font-bold text-primary-color text-lg">PLANE SCAPE</span>
        </div>
        <h1 className="text-center text-primary-color text-xl font-bold font-sans ">
          Login Page
        </h1>

        <form
          className="my-5 flex items-center justify-center flex-col gap-6"
          onSubmit={handleSubmit}
        >
          {/* username */}
          <div className=" bg-gradient-to-r from-home-bg to-primary-color  w-11/12 text-center opacity-70 flex items-center justify-start rounded-md">
            <label htmlFor="username" className="p-2 ">
              <FaUser color="purple" size='20' />
            </label>
            <input
              type="text"
              autoFocus
              className=" pe-2 pl-3 py-4 text-primary-color  bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-primary-color  text-lg"
              placeholder="Username"
              name="username"
              id="username"
              value={inputs.username}
              onChange={handleChange}
            />
          </div>
          {/* password */}
          <div className=" bg-gradient-to-r from-home-bg to-primary-color  w-11/12 text-center opacity-70 flex items-center justify-start rounded-md relative">
            <label htmlFor="password" className="p-2 ">
              <FaLock color="purple" size='20' />
            </label>
            <input
              type={passEye ? "text" : "password"}
              className="pe-2 pl-3 py-4 text-primary-color  bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-primary-color "
              placeholder="Password"
              name="password"
              id="password"
              value={inputs.password}
              onChange={handleChange}
            />
            {passError && (
              <span className=" px-2 text-xs text-red-300 bg-primary-color rounded-xl font-semibold absolute start-0 -bottom-5 ">
                {passError}
              </span>
            )}
            <div className="absolute end-2">
              <FaEye
                color="white"
                size="20"
                onClick={() => setPassEye(!passEye)}
                className="cursor-pointer"
              />
            </div>
          </div>
          {/* login button */}
          <div className="mt-4 w-11/12">
            <button
              className="bg-primary-color text-white  py-4 px-16 w-full text-md font-semibold hover:bg-lime-600 active:bg-lime-500 transition-all rounded-lg"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div>
          <p className="text-center text-md text-black">
            Don't tou have a account?{" "}
            <Link to="/register" className="text-primary-color hover:text-lime-900">
              {" "}
              SignUp
            </Link>
          </p>
          <p className="text-center text-gray-500 pt-5">Demo account username: josh</p>
          <p className="text-center text-gray-500">Demo account password: Aa*12345</p>
        </div>
      </div>
    </div>

    </>

  );
};

export default Login;
