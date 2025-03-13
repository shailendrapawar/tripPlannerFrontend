import { useEffect, useState } from "react"
import useGetAllTrips from "../../hooks/useGetAllTrips";
import { useSelector } from "react-redux";
import SearchBar from "../../components/searchBar/SearchBar";
import TripCard from "../../components/tripCard/TripCard";
import useGetAuthUserTrips from "../../hooks/useGetAuthUserTrips";

const Explore = () => {

  const[destination,setDestination]=useState("")

  const {exploreTrips}=useSelector(s=>s.trip)
  const{theme}=useSelector(s=>s.theme)

  // console.log(exploreTrips)

  // useGetAuthUserTrips()
  useGetAllTrips()

  return (
    <div className=" h-auto min-h-full flex flex-col items-center">

      <div className="h-auto mt-5 flex flex-wrap gap-2 justify-center">
        <SearchBar destination={destination} setDestination={setDestination}/>
        <button className="w-25 h-11 rounded-md" style={{backgroundColor:theme.primary, color:theme.pastel}}>SEARCH</button>
      </div>

      <div className="w-full h-auto  mt-5 flex p-2  flex-col items-center gap-5">

        {exploreTrips.length>0?(
          exploreTrips.map((item,i)=>{
            return <TripCard data={item} key={i} />
          })
        ):(<>No trips to show</>)}

      </div>

    </div>
  )
}
export default Explore