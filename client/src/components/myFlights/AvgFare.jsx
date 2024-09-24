import { useSelector } from "react-redux"
import { BsInfoCircle } from "react-icons/bs";

const AvgFare = () => {
  // get the average fare from the global booking slice
    const avgFare = useSelector(state => state.booking.avgFare)

    //avg fare is calculating in backend and coms us with the bookings response
  return (
    <div className="flex items-center gap-1  font-semibold text-gray-600">
        <BsInfoCircle className="text-blue-500 font-bold text-[20px]" />
        <span>Avg Fare: </span>
        <span>${avgFare}</span>
    </div>
  )
}

export default AvgFare