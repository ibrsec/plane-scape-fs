 

const HiddenFilterButton = ({setHiddenFilter}) => {
  //opens the filter menu on small screens
  return (
    <button className="btn-primary" onClick={()=>setHiddenFilter(true)}>Filters</button>
  )
}

export default HiddenFilterButton