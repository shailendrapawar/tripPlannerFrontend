import "./planTrip.css"
import { useSelector } from "react-redux"
import SearchBar from "../../components/searchBar/SearchBar"
import Todos from "../../components/todo/Todos"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import imgSrc from "../../assets/images/upload-img.jpg"

import { BiSolidImageAdd } from "react-icons/bi";
import MiniLoader from "../../components/miniLoader/MiniLoader"


const PlanTrip = () => {
  const { theme } = useSelector(state => state.theme)
  const navigate = useNavigate()

  const[loading,setLoading]=useState(false)

  const [tripImg, setTripImg] = useState(null)
  const [tripImgUrl, setImgUrl] = useState(imgSrc)

  const tripImgRef = useRef();

  const [tripForm, setTripForm] = useState({
    title: "",
    category: "",
    startDate: "",
    endDate: "",
    description: "",
    budget: "",
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
    if(loading){
      return;
    }
    if (tripForm.title === "" || tripForm.budget === "" || tripForm.category === "" || tripForm.description === "" || tripForm.endDate === "" || tripForm.startDate === "") {
      toast.error("enter all field in mid-form");
      return
    }
    if (destination.destination === "") {
      toast.error("select destination");
      return 
    }

    if(tripImg==""){
      toast.error("choose cover photo");
      return 
    }

    setLoading(true)

    const formData=new FormData();
    formData.append("title",tripForm.title)
    formData.append("description", tripForm.description)

    formData.append("tripImg",tripImg)

    formData.append("startDate",tripForm.startDate)
    formData.append("endDate",tripForm.endDate)

    formData.append("destination",JSON.stringify(destination))
    formData.append("budget",tripForm.budget)
    formData.append("activities",JSON.stringify(activities))
    formData.append("category",tripForm.category)

    try {

      axios.defaults.withCredentials = true
      const isCreated = await axios.post(import.meta.env.VITE_API_URL + "/trip/createTrip", formData, {
        headers: {
          "Content-Type": "multipart/form-data",

        }, withCredentials: true
      })
      // console.log(isCreated)
      if (isCreated) {
        toast.success(isCreated.data.msg + ` for ${destination.destination}`)
        setTimeout(() => {
          navigate("/user/userProfile")
        }, 1000);
      }

    } catch (err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className=" min-h-[90%] h-auto pb-5 pt-5 flex justify-center items-center" style={{ backgroundColor: theme.pastel }}>

      <section className="w-[90%] h-[90%] flex-col flex gap-2">

        <SearchBar destination={destination} setDestination={setDestination} />

        <div className="h-auto flex flex-col justify-center items-center gap-2">

          <div className=" h-50 w-[320px] relative rounded-xl overflow-hidden shadow-md active:shadow-xs shadow-black" onClick={() => tripImgRef?.current?.click()}>
            <img src={tripImgUrl} alt="trip pic" className="w-full h-full object-cover " ></img>
            <input type="file" className="w-full hidden " ref={tripImgRef} onChange={(e) => {
              setTripImg(e.target.files[0])
              const url = URL.createObjectURL(e.target.files[0])
              setImgUrl(url)
            }}></input>
          </div>

          <input value={tripForm.title} onChange={(e) => handleChange(e)} name="title" placeholder="enter trip title" className="w-[320px] h-10 text-center bg-white outline-none border-2 rounded-md border-slate-500"></input>

          <div className="w-[320px] flex gap-1 h-6">
            <select value={tripForm.category} onChange={(e) => handleChange(e)} name="category" className="w-[50%] bg-white outline-none text-xs border-1  border-slate-500">
            <option value={""}>select category</option>
              <option value={"adventure"}>Adventure</option>
              <option value={"heritage"}>Heritage</option>
              <option value={"relaxation"}>Relaxation</option>
              <option value={"nature"}>Nature</option>
              <option value={"backpack"}>Backpack</option>
              <option value={"family"}>Family</option>
            </select>

            <input value={tripForm.budget} onChange={(e) => handleChange(e)} name="budget" type="number" placeholder="enter budget" className="w-[50%] bg-white text-xs text-center outline-none border-1 border-slate-500" ></input>
          </div>

          <div className="w-[320px] flex justify-between h-8 relative">
            <i className=" absolute text-[8px] top-1 left-1">Start date</i>
            <input value={tripForm.startDate} onChange={(e) => handleChange(e)} name="startDate" type="date" placeholder="enter start date" className="w-[47%] bg-white outline-none text-xs pl-14  select-none cursor-pointer border-1 border-slate-500"></input>
            <input value={tripForm.endDate} onChange={(e) => handleChange(e)} name="endDate" type="date" placeholder="enter start date" className="w-[47%] bg-white outline-none text-xs pl-14 select-none cursor-pointer border-1 border-slate-500"></input>
            <i className=" absolute text-[8px] top-1 right-29">End date</i>
          </div>

          <textarea value={tripForm.description} onChange={(e) => handleChange(e)} name="description" className=" tripDesc-body w-[320px] h-20 resize-none text-xs p-1 outline-none bg-white border-2 rounded-md border-slate-500" placeholder="enter little description of trip"></textarea>


          <Todos activities={activities} setActivities={setActivities} />

          <button onClick={() => handleCreateTrip()} className="w-30 rounded-md h-10" style={{ backgroundColor: theme.primary, color: theme.pastel }}>{loading?"Creating...":"Create"}</button>

        </div>

      </section>

    </div>
  )
}
export default PlanTrip