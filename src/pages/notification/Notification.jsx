import { useSelector } from "react-redux"
import NotificationCard from "../../components/notificationCard/NotificationCard"
import "./notification.css"
const Notification = () => {

  const{userNotifications}=useSelector(s=>s.user);
  console.log(userNotifications)
    
  const{theme}=useSelector(state=>state.theme)
  const {authUser} =useSelector(state=>state.user)
  // console.log(authUser?.notifications)
  return (

    <div className="notification-body h-[90%] flex flex-col justify-start items-center gap-1 pt-5 z-0" style={{backgroundColor:theme.pastel}}>
      {
        userNotifications?.length>0?(userNotifications?.map((item,i)=>{
          return <NotificationCard data={item} key={i}/>
        })):(<span className="" style={{color:theme.dark}}>Yout notifications will appear here</span>)
      }
    </div>
  )
}
export default Notification