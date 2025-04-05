import { useDispatch, useSelector } from "react-redux"
import sampleImgSrc from "../../assets/images/sampleTrip-img.jpg"

import maleAvatar from "../../assets/images/male-avatar.png"
import femaleAvatar from "../../assets/images/female-avatar.png"

import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios"
import { updateExploreTripCard } from "../../store/slice/tripSlice"

import { FaExternalLinkAlt } from "react-icons/fa";

const TripCard = ({ data }) => {

  // console.log(data)
  const { theme } = useSelector(s => s.theme)
  const { authUser } = useSelector(s => s.user)
  const dispatch = useDispatch()

  const navigate = useNavigate()


  const alreadyRequested= (data?.requestedUsers?.includes(authUser?._id))
  const alreadyApporved=(data?.approvedUser.includes(authUser?._id))

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  };

  const requestForTrip = async () => {
    try {
      
      if (alreadyRequested) {
        toast.error("already requested ")
        return
      }
      if(alreadyApporved){
        toast.error("you are already approved")
        return
      }
      

      const isRequested = await axios.post(import.meta.env.VITE_API_URL + `/trip/requestForTrip/${data._id}/${authUser.name}`, {
        withCredentials: true
      })
      console.log(isRequested)
      if (isRequested) {
        toast.success(isRequested.data.msg)
        dispatch(updateExploreTripCard(isRequested.data.data))
      }

    } catch (err) {
      console.log(err)
    }
  }

  
    const setSampleAvatar=(gender)=>{
      if(gender=="male"){
        return maleAvatar
      }
      return femaleAvatar
    }


  return (

    <div className="w-[100%] max-w-[600px] min-w-[300px] rounded-2xl overflow-hidden shadow-xs shadow-black bg-white cursor-pointer " >
      {/* Trip Image */}
      <img
        className="w-full h-48 object-cover"
        src={data.tripImg ? `${data.tripImg.url}` : `${sampleImgSrc}`}
        alt="Trip Destination"
      />

      {/* Trip Details */}
      <div className="p-4 relative">
        <h2 className="text-lg w-[70%] font-semibold" style={{ color: theme.dark }}>{data.title}</h2>
        <p className="text-gray-600 text-[15px] mt-1" style={{ color: theme.primary }}>📅 {formatDate(data.duration.start)} - {formatDate(data.duration.end)}</p>
        <p className=" text-sm mt-2  h-10  text-ellipsis overflow-hidden break-words" style={{ color: theme.primary }}>
          {data.description}
        </p>
        <b className="absolute top-4 right-4 text-red-500">₹ {data.budget}</b>

        {/* Host Info */}
        <div className={`flex h-13 items-center justify-start gap-3 mt-4 pl-2 rounded-xs hover:shadow-xs shadow-black active:shadow-none`} style={{ backgroundColor: theme.pastel }}
          onClick={() => navigate(`/user/userPublicProfile/${data.host._id}`)}

        >
          <img
            className="w-12 h-12 rounded-full object-contain p-0.5 bg-white"
            src={data?.host?.avatar ? `${data?.host?.avatar}` : `${setSampleAvatar(data?.host?.gender)}`}
            alt="Host"
          />
          <span className=" " style={{ color: theme.dark }}
          >Hosted by {data?.host?.name}</span>
        </div>

        <div className="h-10 mt-4 flex justify-between">

        {/* <FaExternalLinkAlt className="self-start w-10 h-10" style={{color:theme.primary}} /> */}

        <span className="h-10 w-10 rounded hover:shadow-xs active:shadow-none shadow-black" style={{background:theme.pastel}}>
                  <FaExternalLinkAlt className="self-start w-full h-full p-2" style={{color:theme.primary}}     onClick={()=>navigate(`/user/singleTripPage/${data._id}`)}/>
        </span>


          {alreadyApporved?(
            <button className="w-25 h-full  py-2 rounded-lg text-sm transition shadow-md shadow-black active:shadow-none" style={{ backgroundColor: theme.primary, color: theme.pastel }}>
              Enter Group
            </button>
          ):(<button className="w-25 h-full  py-2 rounded-lg transition shadow-md shadow-black active:shadow-none" style={{ backgroundColor: theme.primary, color: theme.pastel }}
            onClick={() => requestForTrip()}
          >
            {alreadyRequested?"REQUESTED":"REQUEST"}
          </button>)}
        </div>


      </div>
    </div>
  )
}
export default TripCard