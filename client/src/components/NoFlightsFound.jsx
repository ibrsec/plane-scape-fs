const NoFlightsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-transparent  p-6 mb-14">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-primary-color mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      > 
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12h18M9 5l7 7-7 7"
        />
      </svg>
      <h3 className="text-lg font-semibold text-primary-color">
        No Flights Found
      </h3>
      <p className="text-gray-500 mt-2 text-center">
        It seems there are no available flights for the selected date or
        criteria or page.
      </p>
    </div>
  );
};

export default NoFlightsFound;
