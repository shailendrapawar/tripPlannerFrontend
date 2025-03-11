import { useSelector } from "react-redux"
import sampleUserAvatar from "../../assets/images/user-avatar.png"
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

const NotificationCard = ({ data }) => {
  console.log(data)
  const { theme } = useSelector(state => state.theme)
  return (
    <div className="max-w-120 w-[90%] min-h-18 bg-white flex pl-2 gap-2 items-center relative">
      <img src={sampleUserAvatar} className="w-12 h-12 rounded-full bg-gray-200 p-1"></img>
      <div className="h-15 w-[65%] relative">
              <section className="text-xs text-center mt-2" style={{ color: theme.dark }}>{data.message}</section>
              <button className="absolute bottom-0 right-20 w-18 text-xs h-6 rounded-sm bg-red-500 text-white">REJECT</button>
              <button className="absolute bottom-0 right-0 w-18 text-xs h-6 rounded-sm bg-blue-500 text-white">APPROVE</button>
      </div>
      <i className="text-xs absolute right-2 bottom-1" style={{ color: theme.dark }}>23:50</i>
    </div>
  )
}
export default NotificationCard