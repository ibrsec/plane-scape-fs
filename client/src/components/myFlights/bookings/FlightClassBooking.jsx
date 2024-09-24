import { FLIGHT_CLASSES } from "../../../helpers/fligtClassContants"

 

const FlightClassBooking = ({selectedClass}) => {
  return (
    <div> 
    <div className="flex justify-center items-center p-4 ">
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Object.values(FLIGHT_CLASSES).map((flightClass) => (
          <button
          type="button"
            key={flightClass.label}
            className={`min-h-[120px] px-4 py-6 border rounded-lg shadow-md flex flex-col items-center justify-center gap-3 ${
              selectedClass === flightClass.label ? 'bg-white' : 'bg-gray-100'
            } hover:bg-blue-200`}
          >
            <span>{selectedClass === flightClass.label ? flightClass.label : ""}</span>
            <span>{selectedClass === flightClass.label ? "Price: $:"+(flightClass.price) : ""}</span>
          </button>
        ))}
      </div>

      
    </div>
    </div>
  )
}

export default FlightClassBooking