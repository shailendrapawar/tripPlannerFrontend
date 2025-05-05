import { useSelector } from "react-redux"
import SearchBar from "../../components/searchBar/SearchBar"
import Todos from "../../components/todo/Todos"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import imgSrc from "../../assets/images/upload-img.jpg"
import { BiSolidImageAdd } from "react-icons/bi"
import MiniLoader from "../../components/miniLoader/MiniLoader"

const PlanTrip = () => {
  const { theme } = useSelector(state => state.theme)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [tripImg, setTripImg] = useState(null)
  const [tripImgUrl, setImgUrl] = useState(imgSrc)
  const tripImgRef = useRef()

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

  const [activities, setActivities] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setTripForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCreateTrip = async () => {
    if(loading) return
    
    if (tripForm.title === "" || tripForm.budget === "" || tripForm.category === "" || 
        tripForm.description === "" || tripForm.endDate === "" || tripForm.startDate === "") {
      toast.error("Enter all fields in the form")
      return
    }
    if (destination.destination === "") {
      toast.error("Select destination")
      return 
    }
    if(!tripImg){
      toast.error("Choose cover photo")
      return 
    }

    setLoading(true)

    const formData = new FormData()
    formData.append("title", tripForm.title)
    formData.append("description", tripForm.description)
    formData.append("tripImg", tripImg)
    formData.append("startDate", tripForm.startDate)
    formData.append("endDate", tripForm.endDate)
    formData.append("destination", JSON.stringify(destination))
    formData.append("budget", tripForm.budget)
    formData.append("activities", JSON.stringify(activities))
    formData.append("category", tripForm.category)

    try {
      axios.defaults.withCredentials = true
      const isCreated = await axios.post(
        import.meta.env.VITE_API_URL + "/trip/createTrip", 
        formData, 
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        }
      )
      
      if (isCreated) {
        toast.success(isCreated.data.msg + ` for ${destination.destination}`)
        setTimeout(() => navigate("/user/userProfile"), 1000)
      }
    } catch(err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div 
      className="min-h-[90vh] py-5 flex justify-center items-start" 
      style={{ backgroundColor: theme.pastel }}
    >
      <section className="w-full max-w-md px-4 flex flex-col gap-4">
        <SearchBar destination={destination} setDestination={setDestination} />

        <div className="flex flex-col items-center gap-3 w-full">
          {/* Image Upload */}
          <div 
            className="relative w-full h-48 rounded-xl overflow-hidden shadow-md cursor-pointer active:shadow-sm"
            onClick={() => tripImgRef?.current?.click()}
          >
            <img 
              src={tripImgUrl} 
              alt="Trip cover" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <BiSolidImageAdd className="text-white text-3xl" />
            </div>
            <input 
              type="file" 
              className="hidden" 
              ref={tripImgRef} 
              onChange={(e) => {
                setTripImg(e.target.files[0])
                setImgUrl(URL.createObjectURL(e.target.files[0]))
              }}
            />
          </div>

          {/* Trip Title */}
          <input
            value={tripForm.title}
            onChange={handleChange}
            name="title"
            placeholder="Enter trip title"
            className="w-full h-10 px-3 text-center bg-white rounded-md border border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          {/* Category and Budget */}
          <div className="w-full flex gap-2">
            <select
              value={tripForm.category}
              onChange={handleChange}
              name="category"
              className="flex-1 h-9 px-2 bg-white rounded border border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            >
              <option value="">Select category</option>
              <option value="adventure">Adventure</option>
              <option value="heritage">Heritage</option>
              <option value="relaxation">Relaxation</option>
              <option value="nature">Nature</option>
              <option value="backpack">Backpack</option>
              <option value="family">Family</option>
            </select>

            <input
              value={tripForm.budget}
              onChange={handleChange}
              name="budget"
              type="number"
              placeholder="Enter budget"
              className="flex-1 h-9 px-2 bg-white rounded border border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-center"
            />
          </div>

          {/* Dates */}
          <div className="w-full flex gap-2 relative">
            <div className="flex-1 relative">
              <span className="absolute -top-2 left-2 px-1 text-xs bg-white text-gray-600">Start date</span>
              <input
                value={tripForm.startDate}
                onChange={handleChange}
                name="startDate"
                type="date"
                className="w-full h-9 px-2 pl-10 bg-white rounded border border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm cursor-pointer"
              />
            </div>
            <div className="flex-1 relative">
              <span className="absolute -top-2 left-2 px-1 text-xs bg-white text-gray-600">End date</span>
              <input
                value={tripForm.endDate}
                onChange={handleChange}
                name="endDate"
                type="date"
                className="w-full h-9 px-2 pl-10 bg-white rounded border border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm cursor-pointer"
              />
            </div>
          </div>

          {/* Description */}
          <textarea
            value={tripForm.description}
            onChange={handleChange}
            name="description"
            placeholder="Enter trip description"
            className="w-full h-20 p-2 text-sm bg-white rounded-md border border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
          />

          <Todos activities={activities} setActivities={setActivities} />

          <button
            onClick={handleCreateTrip}
            className={`w-32 h-10 rounded-md font-medium transition-opacity ${loading ? "opacity-80" : "hover:opacity-90"}`}
            style={{ backgroundColor: theme.primary, color: theme.pastel }}
            disabled={loading}
          >
            {loading ? <MiniLoader size={16} color={theme.pastel} /> : "Create Trip"}
          </button>
        </div>
      </section>
    </div>
  )
}

export default PlanTrip