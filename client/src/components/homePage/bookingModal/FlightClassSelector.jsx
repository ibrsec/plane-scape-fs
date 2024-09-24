 
import { FLIGHT_CLASSES } from '../../../helpers/fligtClassContants';



const FlightClassSelector = ({selectedClass, setSelectedClass}) => {

  //set the selected class state when any class is selected
  const handleSelect = (flightClass) => {
    setSelectedClass(flightClass);
    // console.log(selectedClass);
  };

  return (
    <div> 
    <div className="flex justify-center items-center p-4">
      <div className="grid grid-cols-1 screen-540:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {Object.values(FLIGHT_CLASSES).map((flightClass) => (
          <button
          type="button"
            key={flightClass.label}
            onClick={() => handleSelect(flightClass)}
            className={`px-4 py-6 border rounded-lg shadow-md flex flex-col items-center justify-center gap-3 ${
              selectedClass?.label === flightClass.label ? 'bg-blue-500 text-white' : 'bg-white'
            } hover:bg-blue-200`}
          >
            <span>{flightClass.label}</span>
            <span>Price: ${flightClass.price}</span>
          </button>
        ))}
      </div>

      
    </div>
    </div>
  );
};

export default FlightClassSelector;
