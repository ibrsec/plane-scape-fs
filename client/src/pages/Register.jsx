import { FaUser } from "react-icons/fa";

import { FaLock } from "react-icons/fa";
import { MdPersonAdd } from "react-icons/md";

import { PiGenderIntersexBold } from "react-icons/pi";

import { IoIosAirplane } from "react-icons/io";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import { toastDefault } from "../helpers/toastify";
import useAuthServices from "../services/useAuthServices";
import { passwordValidation } from "../helpers/passwordValidation";
import { useSelector } from "react-redux";
import Navbar from "../components/navbar/Navbar";

const Register = () => {
  const { registerApi } = useAuthServices(); //get register api form auth custom hook
  const [passEye, setPassEye] = useState(false); //password visibility state
  const [passError, setPassError] = useState(""); //password error state
  const [inputs, setInputs] = useState({ //inputs local state
    username: "",
    password: "",
    fullName: "",
    email: "",
    gender: "",
  });

  //handling changement of the inputs of the register page
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // password type check use effect
  useEffect(() => {
    if (inputs.password) passwordValidation(inputs.password, setPassError);
  }, [inputs]);

    //handling submit login form
  const handleSubmit = (e) => {
    e.preventDefault();
 
     //check if fields are entered
    if (
      !inputs.username ||
      !inputs.password ||
      !inputs.fullName ||
      !inputs.email ||
      !inputs.gender
    ) {
      toastDefault("All fields are required!");
      return;
    }

    //check if any password type check error is occured!
    if (passError) {
      toastDefault("Invalid password type!");
      return;
    }

 //make the login request with the credentials to the backend
    registerApi(inputs);
    //navigating to the home page is happening in the login api request function

    //reset input fields
    setInputs({
      username: "",
      password: "", 
      fullName: "",
      email: "",
      gender: "",
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
      <div className=" pt-28 pb-10 px-1 bg-gradient-to-r from-home-bg to-box-bg min-h-screen flex items-center justify-center">
        <div className=" p-3 rounded-lg min-w-96">
          <div className=" flex items-center justify-center flex-start gap-3  mb-5">
            <div className="bg-[rgb(74,0,150)] w-8 h-8 rounded-full flex items-center">
              <IoIosAirplane
                color="white"
                size="42"
                className=" -translate-x-1"
              />
            </div>
            <span className="font-bold text-primary-color text-lg">
              PLANE SCAPE
            </span>
          </div>
          <h1 className="text-center text-primary-color text-xl font-bold font-sans ">
            Register Page
          </h1>

          <form
            className="my-5 flex items-center justify-center flex-col gap-6"
            onSubmit={handleSubmit}
          >
            {/* username */}
            <div className=" bg-gradient-to-r from-home-bg to-primary-color  w-11/12 text-center opacity-70 flex items-center justify-start rounded-md ">
              <label htmlFor="username" className="p-2 ">
                <FaUser className="text-purple-500" size="20" />
              </label>
              <input
                type="text"
                autoFocus
                className="pe-2 pl-3 py-4 text-primary-color  bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-primary-color "
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
                <FaLock className="text-purple-500" size="20" />
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
                  size="20px"
                  onClick={() => setPassEye(!passEye)}
                  className="cursor-pointer"
                />
              </div>
            </div>

            {/*//? fullName */}
            <div className=" bg-gradient-to-r from-home-bg to-primary-color  w-11/12 text-center opacity-70 flex items-center justify-start rounded-md">
              <label
                htmlFor="fullName"
                className="p-2 "
                onSubmit={handleSubmit}
              >
                <MdPersonAdd className="text-purple-500" size="20" />
              </label>
              <input
                type="text"
                className="pe-2 pl-3 py-4 text-primary-color  bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-primary-color "
                placeholder="Full Name"
                name="fullName"
                id="fullName"
                value={inputs.fullName}
                onChange={handleChange}
              />
            </div>

            {/*//? email */}
            <div className=" bg-gradient-to-r from-home-bg to-primary-color  w-11/12 text-center opacity-70 flex items-center justify-start rounded-md">
              <label
                htmlFor="email"
                className="p-2 "
                onSubmit={handleSubmit}
              >
                <MdPersonAdd className="text-purple-500" size="20" />
              </label>
              <input
                type="email"
                className="pe-2 pl-3 py-4 text-primary-color  bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-primary-color "
                placeholder="Email"
                name="email"
                id="email"
                value={inputs.email}
                onChange={handleChange}
              />
            </div>

            {/*//? gender */}
            <div className=" bg-gradient-to-r from-home-bg to-primary-color  w-11/12 text-center opacity-70 flex items-center justify-start rounded-md">
              <div className="p-2 " onSubmit={handleSubmit}>
                <PiGenderIntersexBold className="text-purple-500" size="20" />
              </div>
              <div className="pe-2 pl-3 py-4 text-primary-color  bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-primary-color ">
                <label htmlFor="male" className="text-lg">
                  <input
                    type="radio"
                    className="me-2"
                    placeholder="Male"
                    name="gender"
                    id="male"
                    checked={inputs.gender === "male"}
                    onChange={(e) => {
                      setInputs({ ...inputs, gender: e.target.id });
                    }}
                  />
                  Male
                </label>
                <label htmlFor="female" className="ms-3 text-lg">
                  <input
                    type="radio"
                    className="me-2"
                    placeholder="Female"
                    name="gender"
                    id="female"
                    checked={inputs.gender === "female"}
                    onChange={(e) => {
                      setInputs({ ...inputs, gender: e.target.id });
                    }}
                  />
                  Female
                </label>
              </div>
            </div>

            {/* register button */}
            <div className="mt-3 w-11/12">
              <button
                className="bg-primary-color text-white py-4 px-10 w-full text-md font-semibold hover:bg-blue-600 active:bg-blue-500 transition-all rounded-lg"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
          <div>
            <p className="text-center text-md text-black">
              Do you have a account?{" "}
              <Link
                to="/login"
                className="text-primary-color hover:text-lime-900"
              >
                {" "}
                SignIn
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
