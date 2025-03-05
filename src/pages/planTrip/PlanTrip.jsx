import { useSelector } from "react-redux"
import SearchBar from "../../components/searchBar/SearchBar"
import Todos from "../../components/todo/Todos"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import {useNavigate} from "react-router-dom"

const PlanTrip = () => {
  const { theme } = useSelector(state => state.theme)
  const navigate=useNavigate()
  const [tripForm, setTripForm] = useState({
    title: "",
    category: "",
    startDate: "",
    endDate: "",
    description: "",
    budget: ""

  })
  const [destination, setDestination] = useState({
    destination: "",
    latitude: "",
    longitutde: ""
  })
  const [activities, setActivities] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target

    setTripForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCreateTrip = async () => {
    if (tripForm.title === "" || tripForm.budget === "" || tripForm.category === "" || tripForm.description === "" || tripForm.endDate === "" || tripForm.startDate === "") {
      toast.error("enter all field in mid-form");
      return
    }
    if (destination.destination === "") {
      toast.error("select destination");
    }

    const reqData = {
      title: tripForm.title,
      description: tripForm.description,

      startDate: tripForm.startDate,
      endDate: tripForm.endDate,

      destination: destination,
      budget: tripForm.budget,
      activities: activities,
      category: tripForm.category
    }

    try {
      axios.defaults.withCredentials = true
      const isCreated = await axios.post(import.meta.env.VITE_API_URL + "/trip/createTrip", reqData, {
        headers: {
          "Content-Type": "application/json",

        }, withCredentials: true
      })
      // console.log(isCreated)
      if (isCreated) {
        toast.success(isCreated.data.msg + ` for ${destination.destination}`)
        setTimeout(() => {
          navigate("/user/userProfile")
        }, 1000);
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className=" min-h-[90%] h-auto pb-5 pt-5 flex justify-center items-center" style={{ backgroundColor: theme.pastel }}>

      <section className="w-[90%] h-[90%] flex-col flex gap-2">

        <SearchBar destination={destination} setDestination={setDestination} />

        <div className="h-auto flex flex-col justify-center items-center gap-2">
          <input value={tripForm.title} onChange={(e) => handleChange(e)} name="title" placeholder="enter trip title" className="w-[320px] h-10 text-center bg-white outline-none"></input>

          <div className="w-[320px] flex gap-1 h-6">
            <select value={tripForm.category} onChange={(e) => handleChange(e)} name="category" className="w-[50%] bg-white outline-none text-xs">
              <option value={"adventure"}>Adventure</option>
              <option value={"heritage"}>Heritage</option>
              <option value={"relaxation"}>Relaxation</option>
              <option value={"nature"}>Nature</option>
              <option value={"backpack"}>Backpack</option>
              <option value={"family"}>Family</option>
            </select>

            <input value={tripForm.budget} onChange={(e) => handleChange(e)} name="budget" type="number" placeholder="enter budget" className="w-[50%] bg-white text-xs text-center outline-none" ></input>
          </div>

          <div className="w-[320px] flex justify-between h-8 relative">
            <i className=" absolute text-[8px] top-1 left-1">Start date</i>
            <input value={tripForm.startDate} onChange={(e) => handleChange(e)} name="startDate" type="date" placeholder="enter start date" className="w-[47%] bg-white outline-none text-xs pl-14  select-none cursor-pointer"></input>
            <input value={tripForm.endDate} onChange={(e) => handleChange(e)} name="endDate" type="date" placeholder="enter start date" className="w-[47%] bg-white outline-none text-xs pl-14 select-none cursor-pointer"></input>
            <i className=" absolute text-[8px] top-1 right-29">End date</i>
          </div>

          <textarea value={tripForm.description} onChange={(e) => handleChange(e)} name="description" className="w-[320px] h-20 resize-none text-xs p-1 outline-none bg-white" placeholder="enter little description of trip"></textarea>


          <Todos activities={activities} setActivities={setActivities} />

          <button onClick={() => handleCreateTrip()} className="w-30 rounded-md h-10" style={{ backgroundColor: theme.primary, color: theme.pastel }}>create</button>

        </div>

      </section>

    </div>
  )
}
export default PlanTrip