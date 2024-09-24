import { flightStatusCodes } from "../helpers/flightStatuses";

import { IoAirplaneSharp } from "react-icons/io5";
import { PiAirplaneLandingBold } from "react-icons/pi";
import { PiAirplaneTakeoffBold } from "react-icons/pi";

const Spinner = () => {
  return (
    <div className="relative mb-6">
      {/* example flight card - just an flight card example for bluring on the background */}
      <div className="filter blur-sm">
        <div className="white-card-wrapper relative rounded-bl-none">
          {/* flight details */}
          <div className=" mb-0 flex items-center justify-between gap-3">
            <p className="font-semibold mb-0">Amsterdam - Leipzig</p>
            <div className="flex items-center gap-2">
              <span className="bg-orange-700 px-3 py-2 rounded-lg text-white text-sm relative group">
                {flightStatusCodes["SCH"].name}
                <span className="hidden group-hover:block absolute -top-20 w-[300px] bg-slate-500 px-3 py-2 rounded-lg ">
                  {flightStatusCodes["SCH"].description}
                </span>
              </span>

              <span className="bg-green-600 px-3 py-2 rounded-lg text-white text-sm">
                Department Flight
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-3">20 September 2024</p>
          {/* flight infos */}
          <div className=" flex xs:items-center gap-3 justify-between mb-5 flex-col xs:flex-row  ">
            {/* departure infos */}
            <div className="flex-1 flex flex-col justify-center items-center xs:items-stretch   ">
              <div className="flex items-center gap-2 text-[#848383] font-[500] ">
                <PiAirplaneTakeoffBold size="20" />
                <span className=" text-xs sm:text-sm leading-normal ">
                  Departure
                </span>
              </div>

              <div>
                <span className="font-bold text-sm sm:text-md leading-normal ">
                  7:00 AM
                </span>
              </div>

              <div className="  text-[#848383] font-[500] ">
                <span className="text-xs sm:text-sm leading-normal ">
                  Airport: BCS
                </span>
              </div>
            </div>

            {/* line */}
            <div className="flex-1 ">
              <div className="bg-[#c3c0c0] w-3/5 min-w-1 h-[2px] rounded-full mx-auto"></div>
            </div>

            {/* middle infos */}
            <div className="flex-1 flex flex-col justify-center gap-1   ">
              <div className="flex items-center justify-center  ">
                <img
                  src={`https://content.airhex.com/content/logos/airlines_QY_350_100_r.png`}
                  alt="logo"
                  className="w-20 h-8 object-contain"
                />
              </div>

              <div className="flex items-center justify-center">
                <IoAirplaneSharp size="20" className="text-primary-color" />
              </div>

              <div className="  text-[#848383] font-[500] text-xs sm:text-sm leading-normal text-center ">
                (Nonstop)
              </div>
            </div>

            {/* line */}
            <div className="flex-1 ">
              <div className="bg-[#c3c0c0] w-3/5 min-w-1 h-[2px] rounded-full mx-auto"></div>
            </div>

            {/* arrival infos */}
            <div className="flex-1 flex flex-col justify-center  items-center xs:items-stretch ">
              <div className="flex items-center gap-2 text-[#848383] font-[500] ">
                <PiAirplaneLandingBold size="20" />
                <span className=" text-xs sm:text-sm leading-normal ">
                  Arrival
                </span>
              </div>

              <div>
                <span className="font-bold text-sm sm:text-md leading-normal ">
                  - -
                </span>
              </div>

              <div className="  text-[#848383] font-[500] ">
                <span className="text-xs sm:text-sm leading-normal ">
                  Airport: LEJ
                </span>
              </div>
            </div>
          </div>

          {/* cardbottom */}
          {/* price */}
          <div className="flex-1 flex flex-col justify-center gap-1">
            <div className=" ">
              <span className="text-primary-color font-bold">Price: $200</span>
            </div>

            <div className="  text-[#848383] font-[500] ">
              <span className="text-sm">Round Trip</span>
            </div>
          </div>

          {/* book flight button */}
          <div className="absolute bottom-0 right-0">
            <button className="bg-primary-color py-4 xs:py-5 px-5 xs:px-9 text-home-bg font-semibold  hover:bg-home-bg hover:text-primary-color transition-all active:bg-black active:text-home-bg rounded-ss-lg rounded-ee-lg">
              Book Flight
            </button>
          </div>
        </div>
        <div className="pt-2">
          <div className="bg-[#E6E0EB] px-5 pt-3 pb-3 rounded-b-lg text-[#672CA5]   underline text-sm">
            Check the details
          </div>
        </div>
      </div>

      {/* spinners */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 flex items-center gap-2">
        <div
          role="status"
          //   className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
        >
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
        <div
          role="status"
          //   className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
        >
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
        <div
          role="status"
          //   className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
        >
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
        <div
          role="status"
          //   className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
        >
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
