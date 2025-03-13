
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import axios from "axios"
import Loader from "../../components/loader/Loader"
import userAvatar from "../../assets/images/user-avatar.png"
import TripCard from "../../components/tripCard/TripCard"
import {useNavigate} from "react-router-dom"
import { IoArrowBackCircleSharp } from "react-icons/io5";


const UserPublicPorfile = () => {
  const navigate=useNavigate()
  const { theme } = useSelector(s => s.theme)
  const { userId } = useParams()


  const [loading, setloading] = useState(true)
  const [userProfile, setUserProfile] = useState({})
  const [userRelatedTrips, setUserRelatedTrips] = useState([]);

  const [dropDown, setDropDown] = useState(false)


  const getUserPublicProfile = async () => {
    setloading(true)
    try {
      const userPublicProfile = await axios.get(import.meta.env.VITE_API_URL + `/auth/getUserPublicProfile/${userId}`, {
        withCredentials: true
      })
      // console.log(userPublicProfile)
      if (userPublicProfile) {
        setUserProfile(userPublicProfile.data.userData)
        const relatedTrips = await axios.get(import.meta.env.VITE_API_URL + `/trip/getUserRelatedTrips/${userId}`, {
          withCredentials: true
        })
        if (relatedTrips) {
          setUserRelatedTrips(relatedTrips.data.trips)
        }
        console.log(relatedTrips)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setloading(false)
    }
  }



  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  };

  useEffect(() => {
    getUserPublicProfile()
  }, [])

  if (loading) {
    return (
      <Loader />
    )
  }


  return (
    <div className=" h-full flex flex-col items-center p-2 cursor-pointer relative" style={{backgroundColor:theme.pastel}}>
      
      <div className=" shadow-lg rounded-2xl p-6 max-w-lg w-full" style={{backgroundColor:theme.light}}>
        {/* Profile Header */}
        <div className="flex items-center flex-col relative">
        <IoArrowBackCircleSharp className="h-10 w-10 absolute left-0 active:scale-75"
        onClick={()=>navigate(-1)}
        />
          <div className="w-30 h-30  rounded-full overflow-hidden "
            style={{ border: ` 3px solid ${theme.dark}` }}
          >
            <img
              src={userProfile.avatar ? `${userProfile.avatar}` : `${userAvatar}`}
              alt="User Avatar"
              className="w-full h-full object-contain bg-white p-3"
            />
          </div>
          
          <h2 className="text-2xl font-bold mt-4" style={{ color: theme.dark }}>{userProfile?.name}</h2>
          <p className="text-gray-500">{userProfile?.email}</p>
        </div>

        {/* User Details */}
        <div className="mt-6 border-t pt-4">
          <p className="text-gray-700 text-center italic">{userProfile?.bio}</p>
          <div className="mt-4 flex justify-between text-gray-600">
            <p className="font-medium">Gender:</p>
            <p className="capitalize">{userProfile?.gender}</p>
          </div>
          <div className="flex justify-between text-gray-600">
            <p className="font-medium">Date of Birth:</p>
            <p>{formatDate(userProfile.createdAt)}</p>
          </div>
          <div className="flex justify-between text-gray-600">
            <p className="font-medium">Joined:</p>
            <p>{formatDate(userProfile.createdAt)}</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-6 flex justify-center">
          <button className="px-6 py-2 text-white rounded-lg shadow-md transition cursor-pointer" style={{ backgroundColor: theme.primary }}
            onClick={() => setDropDown(!dropDown)}
          >
            {dropDown?"Close list":" Load Trips"}
          </button>
        </div>
      </div>

      <section className="mt-5  min-h-auto  w-full flex-wrap items-center justify-center gap-5" style={dropDown ? { display: "flex" } : { display: "none" }}>

        {userRelatedTrips.length>0?(userRelatedTrips.map((item,i)=>{
          return <TripCard data={item} key={i}/>
        })):(<>heo</>)}
      </section>

    </div>
  )
}
export default UserPublicPorfile