import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import Loader from "../../components/loader/Loader"
import userAvatar from "../../assets/images/user-avatar.png"
import TripCard from "../../components/tripCard/TripCard"
import { IoArrowBackCircleSharp } from "react-icons/io5"

const UserPublicProfile = () => {
  const navigate = useNavigate()
  const { theme } = useSelector(s => s.theme)
  const { userId } = useParams()

  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState({})
  const [userRelatedTrips, setUserRelatedTrips] = useState([])
  const [showTrips, setShowTrips] = useState(false)

  const getUserPublicProfile = async () => {
    setLoading(true)
    try {
      const userPublicProfile = await axios.get(
        import.meta.env.VITE_API_URL + `/auth/getUserPublicProfile/${userId}`,
        { withCredentials: true }
      )
      
      if (userPublicProfile) {
        setUserProfile(userPublicProfile.data.userData)
        const relatedTrips = await axios.get(
          import.meta.env.VITE_API_URL + `/trip/getUserRelatedTrips/${userId}`,
          { withCredentials: true }
        )
        if (relatedTrips) {
          setUserRelatedTrips(relatedTrips.data.trips)
        }
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString("en-GB", { 
      day: "numeric", 
      month: "long", 
      year: "numeric" 
    })
  }

  useEffect(() => {
    getUserPublicProfile()
  }, [userId])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col items-center">
      {/* Back Button */}
      <div className="w-full max-w-2xl mb-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <IoArrowBackCircleSharp className="h-8 w-8" />
          <span>Back</span>
        </button>
      </div>

      {/* Profile Card */}
      <div 
        className="w-full max-w-2xl rounded-xl shadow-lg p-6 mb-8"
        style={{ backgroundColor: theme.pastel }}
      >
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <div 
            className="w-32 h-32 rounded-full overflow-hidden border-4 mb-4"
            style={{ borderColor: theme.dark }}
          >
            <img
              src={userProfile.avatar || userAvatar}
              alt="User Avatar"
              className="w-full h-full object-cover bg-white"
            />
          </div>
          
          <h2 
            className="text-3xl font-bold mb-1"
            style={{ color: theme.dark }}
          >
            {userProfile?.name}
          </h2>
          <p className="text-gray-600">{userProfile?.email}</p>
        </div>

        {/* User Details */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          {userProfile?.bio && (
            <p className="text-gray-700 italic text-center mb-4">
              "{userProfile.bio}"
            </p>
          )}
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Gender:</span>
              <span className="capitalize text-gray-600">
                {userProfile?.gender || "Not specified"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Date of Birth:</span>
              <span className="text-gray-600">
                {userProfile?.dob ? formatDate(userProfile.dob) : "Not specified"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Member Since:</span>
              <span className="text-gray-600">
                {formatDate(userProfile?.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Trips Toggle Button */}
        <div className="mt-6 flex justify-center">
          <button 
            className="px-6 py-2 rounded-lg shadow-md hover:opacity-90 transition-opacity font-medium"
            style={{ backgroundColor: theme.primary, color: "white" }}
            onClick={() => setShowTrips(!showTrips)}
          >
            {showTrips ? "Hide Trips" : "Show Trips"}
          </button>
        </div>
      </div>

      {/* Trips Section */}
      {showTrips && (
        <div className="w-full max-w-6xl">
          <h2 
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: theme.dark }}
          >
            {userProfile?.name}'s Trips
          </h2>
          
          {userRelatedTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userRelatedTrips.map((trip) => (
                <TripCard data={trip} key={trip._id} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p style={{ color: theme.primary }}>
                No trips hosted yet
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default UserPublicProfile