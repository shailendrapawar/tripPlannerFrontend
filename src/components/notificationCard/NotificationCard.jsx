import { useDispatch, useSelector } from "react-redux"
import sampleUserAvatar from "../../assets/images/user-avatar.png"
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios"
import MiniLoader from "../miniLoader/MiniLoader";
import { useState } from "react";
import { removeUserNotification } from "../../store/slice/userSlice";
import { toast } from "react-hot-toast"
import{useNavigate} from "react-router-dom"

const NotificationCard = ({ data }) => {
  // console.log(data)
  const { theme } = useSelector(state => state.theme)
  const { authUser } = useSelector(s => s.user)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const navigate=useNavigate()


  const approveUser = async () => {
    try {
      setLoading(true)
      const isApprove = await axios.post(import.meta.env.VITE_API_URL + `/trip/approveUser/${data.senderId}`, {
        tripId: data.relatedTo,
        userName: authUser.name
      }, {
        withCredentials: true
      })
      if (isApprove) {

        const isNotifyDelete = await axios.post(import.meta.env.VITE_API_URL + `/trip/deleteNotification/${data._id}`, {}, {
          withCredentials: true
        })

        if (isNotifyDelete) {
          dispatch(removeUserNotification(data))
          toast.success(`user request approved`)
        }
      }

    } catch (err) {
      console.log(err)
    }finally{
      setLoading(false)
    }
  }


  const rejectUser = async () => {

    try {
      setLoading(true)
      const isRejected = await axios.post(import.meta.env.VITE_API_URL + `/trip/rejectUser/${data.senderId}`, {
        tripId: data.relatedTo,
        userName: authUser.name
      }, {
        withCredentials: true
      })

      if (isRejected) {

        const isNotifyDelete = await axios.post(import.meta.env.VITE_API_URL + `/trip/deleteNotification/${data._id}`, {}, {
          withCredentials: true
        })

        if (isNotifyDelete) {
          dispatch(removeUserNotification(data))
          toast.success(`user request approved`)
        }
      }

    } catch (err) {
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString("en-GB", { day: "numeric", month: "numeric"});
  };
  const getTime = (timestamp) => new Date(timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  const isApproveRequest = data.type === "join_request"
  // console.log(isApproveRequest)
  return (
    <div className="max-w-120 w-[90%] min-h-18 h-auto bg-white flex pl-2 gap-2 items-center relative cursor-pointer" >
      <span className="h-5 w-10 absolute top-2 right-1">
        <MiniLoader value={loading} />
      </span>
      <img src={sampleUserAvatar} className="w-12 h-12 rounded-full bg-gray-200 p-1"
       onClick={()=>navigate(`/user/userPublicProfile/${data.senderId}`)}
      ></img>

      <div className="h-full  w-[65%] relative">
        <section className="text-xs text-center mt-2 pb-2" style={{ color: theme.dark }}>{data.message}</section>

        <div className="relative h-8 " style={isApproveRequest ? { display: "block" } : { display: "none" }}>
          <button className="absolute bottom-0.5 right-0 w-18 text-xs h-6 rounded-sm bg-red-500 text-white cursor-pointer" onClick={rejectUser}>REJECT</button>
          <button className="absolute bottom-0.5 right-20 w-18 text-xs h-6 rounded-sm bg-blue-500 text-white cursor-pointer" onClick={approveUser}>APPROVE</button>
        </div>
      </div>
      <i className="text-xs absolute right-2 bottom-1" style={{ color: theme.dark }}>{getTime(data?.createdAt)}</i>
    </div>
  )
}
export default NotificationCard