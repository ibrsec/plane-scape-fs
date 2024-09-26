import { FLIGHT_CLASSES } from "../../../helpers/fligtClassContants"

 

const FlightClassBooking = ({selectedClass}) => {
  return (
    <div> 
    <div className="flex justify-center items-center p-4 ">
      <div className="grid grid-cols-1  xs:grid-cols-2 md:grid-cols-4 screen-900:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {Object.values(FLIGHT_CLASSES).map((flightClass) => (
          <button
          type="button"
            key={flightClass.label}
            className={`min-h-[120px] min-w-[200px] xs:min-w-[110px]  px-4 py-6 border rounded-lg shadow-md flex flex-col items-center justify-center gap-3 ${
              selectedClass === flightClass.label ? 'bg-white' : 'bg-gray-100'
            } hover:bg-blue-200`}
          >
            <span className="text-nowrap">{selectedClass === flightClass.label ? flightClass.label : ""}</span>
            <span className="text-nowrap">{selectedClass === flightClass.label ? "Price: $:"+(flightClass.price) : ""}</span>
          </button>
        ))}
      </div>

      
    </div>
    </div>
  )
}

export default FlightClassBooking