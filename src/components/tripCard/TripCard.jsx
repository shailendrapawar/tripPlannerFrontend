import { useDispatch, useSelector } from "react-redux"
import sampleImgSrc from "../../assets/images/sampleTrip-img.jpg"
import maleAvatar from "../../assets/images/male-avatar.png"
import femaleAvatar from "../../assets/images/female-avatar.png"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios"
import { updateExploreTripCard } from "../../store/slice/tripSlice"
import { FaExternalLinkAlt, FaUserCheck, FaClock } from "react-icons/fa"

const TripCard = ({ data }) => {
  const { theme } = useSelector(s => s.theme)
  const { authUser } = useSelector(s => s.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const alreadyRequested = data?.requestedUsers?.includes(authUser?._id)
  const alreadyApproved = data?.approvedUser.includes(authUser?._id)

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString("en-GB", { 
      day: "numeric", 
      month: "short", 
      year: "numeric" 
    })
  }

  const requestForTrip = async () => {
    try {
      if (alreadyRequested) {
        toast.error("You've already requested to join this trip")
        return
      }
      if (alreadyApproved) {
        toast.error("You're already approved for this trip")
        return
      }
      
      const isRequested = await axios.post(
        import.meta.env.VITE_API_URL + `/trip/requestForTrip/${data._id}/${authUser.name}`,
        { withCredentials: true }
      )
      
      if (isRequested) {
        toast.success(isRequested.data.msg)
        dispatch(updateExploreTripCard(isRequested.data.data))
      }
    } catch (err) {
      console.log(err)
      toast.error("Failed to send request")
    }
  }

  const setSampleAvatar = (gender) => {
    return gender === "male" ? maleAvatar : femaleAvatar
  }

  return (
    <div className="w-full max-w-[400px] min-w-[280px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white cursor-pointer border border-gray-100">
      {/* Trip Image with Overlay */}
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={data.tripImg ? `${data.tripImg.url}` : `${sampleImgSrc}`}
          alt="Trip Destination"
        />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <h2 className="text-xl font-bold text-white">{data.title}</h2>
          <span className="bg-white/90 px-2 py-1 rounded-md text-sm font-semibold" style={{ color: theme.dark }}>
            ₹{data.budget}
          </span>
        </div>
      </div>

      {/* Trip Details */}
      <div className="p-4">
        {/* Date and Status */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-sm">
            <span className="flex items-center" style={{ color: theme.primary }}>
              <FaClock className="mr-1" />
              {formatDate(data.duration.start)} - {formatDate(data.duration.end)}
            </span>
          </div>
          
          {alreadyApproved && (
            <span className="flex items-center text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              <FaUserCheck className="mr-1" /> Approved
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2" style={{ color: theme.primary }}>
          {data.description}
        </p>

        {/* Host Info */}
        <div 
          className={`flex items-center gap-3 p-2 rounded-lg transition hover:bg-opacity-80 mb-4`} 
          style={{ backgroundColor: theme.pastel }}
          onClick={() => navigate(`/user/userPublicProfile/${data.host._id}`)}
        >
          <div className="relative">
            <img
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
              src={data?.host?.avatar ? `${data?.host?.avatar}` : `${setSampleAvatar(data?.host?.gender)}`}
              alt="Host"
            />
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: theme.dark }}>
              Hosted by {data?.host?.name}
            </p>
            <p className="text-xs text-gray-500">{data?.host?.gender || ''}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition"
            onClick={() => navigate(`/user/singleTripPage/${data._id}`)}
            aria-label="View trip details"
          >
            <FaExternalLinkAlt style={{ color: theme.primary }} />
          </button>
          
          {alreadyApproved ? (
            <button 
              className="flex-1 ml-4 py-2 px-4 rounded-lg text-sm font-medium transition hover:opacity-90 active:scale-95"
              style={{ 
                backgroundColor: theme.primary, 
                color: theme.pastel,
                boxShadow: `0 2px 4px ${theme.primary}40`
              }}
              onClick={() => navigate(`/user/singleTripPage/${data._id}`)}
            >
              Enter Group
            </button>
          ) : (
            <button 
              className="flex-1 ml-4 py-2 px-4 rounded-lg text-sm font-medium transition hover:opacity-90 active:scale-95"
              style={{ 
                backgroundColor: alreadyRequested ? '#6b7280' : theme.primary, 
                color: theme.pastel,
                boxShadow: alreadyRequested ? 'none' : `0 2px 4px ${theme.primary}40`
              }}
              onClick={requestForTrip}
              disabled={alreadyRequested}
            >
              {alreadyRequested ? "Request Sent" : "Join Trip"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TripCard