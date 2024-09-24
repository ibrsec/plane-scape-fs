import { useEffect, useState } from "react";
import Filters from "./Filters";




const FilterWrapper = ({hiddenFilterState, setHiddenFilter}) => {

   
  
    

  //  filterClass state (setting a filterclass state for different screenr resolutions)
  const [filterClass, setFilterClass] = useState("");

  //window size state
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  // Function to update window size when resized
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
    });
  };

  // useEffect to add event listener on component mount and cleanup on unmount
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  //drawer visibility adjustments!
  useEffect(() => {
    if (windowSize > 1024) {
      setFilterClass(' ');
    } else if(hiddenFilterState){
      setFilterClass(' right-5');
    }else if(!hiddenFilterState){
      setFilterClass(' -right-96');
    }
  }, [hiddenFilterState, windowSize]);
  return (
    <div
    className={
      "lg:col-span-1 fixed lg:static transition-transform  top-10  z-50 overflow-y-auto   " +
      filterClass

      
    }
  >
    <Filters />
  </div>
  )
}

export default FilterWrapper