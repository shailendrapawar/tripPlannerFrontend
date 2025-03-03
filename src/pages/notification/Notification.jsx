import { useSelector } from "react-redux"
import NotificationCard from "../../components/notificationCard/NotificationCard"
import "./notification.css"
const Notification = () => {

  const notification=[
    {
      message:"smaple notiskj dfkjf dfdkj fkdjf kdf d kdf jkd fkjjd kdfdkf d jkkjdifcation message",
      read:false
    },
    {
      message:"smaple notiifcation message",
      read:true
    },
    {
      message:"smaple notiifcation message",
      read:true
    },
    {
      message:"smaple notiifcation message",
      read:false
    },
    {
      message:"smaple notiifcation message",
      read:true
    },
    {
      message:"smaple notiifcation message",
      read:true
    },

    
  ]
  const{theme}=useSelector(state=>state.theme)
  const {authUser} =useSelector(state=>state.user)
  // console.log(authUser?.notifications)
  return (

    <div className="notification-body h-[90%] flex flex-col justify-start items-center gap-1 pt-5 z-0" style={{backgroundColor:theme.pastel}}>
      {
        notification.map((item,i)=>{
          return <NotificationCard data={item} key={i}/>
        })
      }
    </div>
  )
}
export default Notification