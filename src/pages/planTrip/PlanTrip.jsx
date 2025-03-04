import { useSelector } from "react-redux"
import SearchBar from "../../components/searchBar/SearchBar"
import Todos from "../../components/todo/Todos"
import { useEffect, useState } from "react"
const PlanTrip = () => {
  const {theme}=useSelector(state=>state.theme)

  const [tripForm,setTripForm]=useState({
    title:"",
    category:"",
    startData:"",
    endDate:"",
    description:"",
    budget:""

  })

  const[location,setLocation]=useState({
    location:"",
    latitude:"",
    longitutde:""
  })

  const [activities,setActivities]=useState([]);

  useEffect(()=>{
    console.log(location)
  },[location])

  return (
    <div className="h-[90%] flex justify-center items-center" style={{backgroundColor:theme.pastel}}>

      <section className="w-[90%] h-[90%] flex-col flex gap-2">

        <SearchBar location={location} setLocation={setLocation}/>

        <div className="h-auto flex flex-col justify-center items-center gap-2">
          <input placeholder="enter trip title" className="w-[320px] h-10 text-center bg-white outline-none"></input>

          <div className="w-[320px] flex gap-1 h-6">
            <select className="w-[50%] bg-white outline-none text-xs">
              <option>Adventure</option>
              <option>Heritage</option>
              <option>Relaxation</option>
              <option>Nature</option>
              <option>Adventure</option>
              <option>Family</option>
            </select>

            <input type="number" placeholder="enter budget" className="w-[50%] bg-white text-xs text-center outline-none" ></input>
          </div>

          <div className="w-[320px] flex gap-1 h-8 relative">
            <i className=" absolute text-[8px] top-1 left-1">Start date</i>
            <input type="date" placeholder="enter start date" className="w-[50%] bg-white outline-none text-xs pl-15  select-none cursor-pointer"></input>
            <input type="date" placeholder="enter start date" className="w-[50%] bg-white outline-none text-xs pl-15 "></input>
            <i className=" absolute text-[8px] top-1 right-30">End date</i>
          </div>
          <textarea className="w-[320px] h-20 resize-none text-xs p-1 outline-none bg-white" placeholder="enter little description of trip"></textarea>


          <Todos activities={activities} setActivities={setActivities}  />



        </div>



        
      </section>

    </div>
  )
}
export default PlanTrip