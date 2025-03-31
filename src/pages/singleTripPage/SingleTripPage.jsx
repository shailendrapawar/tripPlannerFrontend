import { useEffect, useState } from "react"
import sampleTripImg from "../../assets/images/sampleTrip-img.jpg"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../../components/loader/Loader"
import "./singleTrip.css"
import maleAvatar from "../../assets/images/male-avatar.png"
import femaleAvatar from "../../assets/images/female-avatar.png"

// import sampleUserAvatar from "../../assets/images/user-avatar.png"
import { useSelector } from "react-redux"
import { FaLocationDot } from "react-icons/fa6";

import { IoArrowBackCircle } from "react-icons/io5";

const SingleTripPage = () => {

  const { theme } = useSelector(s => s.theme)
  const { tripId } = useParams();

  const navigate = useNavigate()
  // console.log(tripId)

  const [loading, setloading] = useState(true);
  const [tripData, setTripData] = useState({})
  const [destination, setDestination] = useState({})


  useEffect(() => {
    setloading(true)
    const fetchSingleTrip = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL + `/trip/getTrip/${tripId}`, {
          withCredentials: true
        })
        if (res) {
          setTripData(res.data.data)
          setDestination(res.data.data.destination)
          console.log(res.data.data)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setloading(false)
      }
    }
    fetchSingleTrip()

  }, [])

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", });
  };

  const setSampleAvatar=(gender)=>{
    if(gender=="male"){
      return maleAvatar
    }
    return femaleAvatar
  }

  return (
    <div className="h-auto min-h-full flex flex-col items-center justify-center pb-5 relative">

      {loading ? (<Loader value={true} />) : (<section className="w-9/10 max-w-120 mt-5 flex flex-col relative overflow-hidden">

        <span className="absolute h-10 w-15 p-1 rounded-br-md flex justify-center items-center bg-white" onClick={()=>{navigate(-1)}}><IoArrowBackCircle className="w-full h-full" /></span>
        <img src={sampleTripImg} className="w-full h-70 object-cover rounded-md shadow-md shadow-black">
        </img>

        {/* ===========host info=============== */}
        <div className={`flex h-13 items-center justify-start gap-3 mt-4 pl-2 rounded-xs hover:shadow-xs shadow-black active:shadow-none`} style={{ backgroundColor: theme.pastel }}
          onClick={() => navigate(`/user/userPublicProfile/${tripData.host._id}`)}
        >
          <img
            className="w-12 h-12 rounded-full object-contain p-0.5 bg-white"
            src={tripData?.host?.avatar ? `${tripData?.host?.avatar}` : `${setSampleAvatar(tripData?.host?.gender)}`}
            alt="Host"
          />
          <span className=" " style={{ color: theme.dark }}
          >Hosted by {tripData?.host?.name}</span>
        </div>


        {/* ===========trip info================ */}

        <article className="h-auto w-full  mt-2 p-1">

          <h1 style={{ color: theme.dark }} className="font-semibold">{tripData?.title}</h1>
          <span className="text-xs font-semibold" style={{ color: theme.primary }}>{tripData?.category}</span>
          <p style={{ color: theme.dark }} className=" text-xs h-auto max-w-full min-h-10 mt-1">{tripData?.description}</p>

          <div className="mt-3 relative"><span className="text-red-500">Budget: <b>₹{tripData?.budget}</b></span> <span className="absolute right-0 font-extralight " style={{ color: theme.primary }}>{formatDate(tripData.duration.start)}-{formatDate(tripData.duration.start)}</span></div>

          <h3 className="mt-3 font-semibold" style={{ color: theme.dark }}>Activities planned:- </h3>
          <div className="h-auto p-2 text-xs flex flex-col gap-2" style={{ color: theme.dark }}>
            {tripData?.activities?.map((v, i) => {
              return <div className="flex gap-1" key={i}><i className="min-w-12 w-auto font-semibold">Day {v.day}:-</i><span className="">{v.activity}</span></div>
            })}
          </div>
        </article>

        <div className=" h-30 mt-10 flex flex-col">
          <h3 className="text-md mb-1 font-semibold" style={{ color: theme.primary }}>Travel companions</h3>
          <section className="h-[70%] flex items-center pl-1 scrollClass gap-2">
            {tripData?.approvedUser?.map((v, i) => {
              return <TravelCompanion key={i} data={v} />
            })}
          </section>
        </div>

        <div className="mt-1 ">
          {/* <h3 className="text-right"><FaLocationDot/>{tripData.destination.destination}</h3> */}
          <section className=" flex justify-end items-center gap-2 mb-1"> <FaLocationDot className="h-6 w-6" /> <span>{tripData?.destination?.destination}</span></section>

          <div className="h-50">
            <MapContainer center={[destination?.latitude, destination?.longitude]} zoom={13} style={{ height: "100%", width: "100%", borderRadius: "10px", }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[destination?.latitude, destination?.longitude]}>
                <Popup></Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        <button className="h-10 w-25 rounded-md mt-2 self-end" style={{ backgroundColor: theme.primary, color: theme.pastel }}>Request</button>
      </section>)}

    </div>
  )
}
export default SingleTripPage



import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css";
const TravelCompanion = ({ data }) => {

  const setSampleAvatar=(gender)=>{
    if(gender=="male"){
      return maleAvatar
    }
    return femaleAvatar
  }
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/user/userPublicProfile/${data?._id}`)} className="min-h-[90%] min-w-20 flex flex-col items-center rounded-lg shadow-xs shadow-black active:shadow-none" 

    >
      <img src={data?.avatar?`${data?.avatar}`:`${setSampleAvatar(data?.gender)}`} className=" h-14 w-14 object-cover overflow-hidden mt-1 rounded-full bg-gray-100"></img>
      <span className="text-xs w-full text-center overflow-hidden pl-1 pr-1">{data?.name}</span>
    </div>
  )
}