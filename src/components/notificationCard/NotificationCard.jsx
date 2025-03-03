import { useSelector } from "react-redux"

const NotificationCard = ({data}) => {
  const{theme}=useSelector(state=>state.theme)
  return (
    <div className="max-w-150 w-[90%] h-20 min-h-20 bg-white flex pl-2 gap-2 items-center relative">
      <img className="w-17 h-17 rounded-full bg-gray-200"></img>
      <span className="text-sm w-50" style={{color:theme.dark}}>{data.message}</span>
      <i className="text-xs absolute right-2 bottom-1" style={{color:theme.dark}}>23:50</i>
    </div>
  )
}
export default NotificationCard