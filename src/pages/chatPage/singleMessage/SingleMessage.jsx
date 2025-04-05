import { useSelector } from "react-redux"
import getSenderColor from "../../../utils/randomColor"


const SingleMessage = ({data}) => {
    const{theme}=useSelector(s=>s.theme)
    const {authUser}=useSelector(s=>s.user)

    const isOwner=authUser._id===data?.senderId;

  return (

    <div className={`h-auto self-start min-w-15 w-auto max-w-1/2  pt-1.5 pb-1.5 rounded-t-3xl pl-3 pr-3 ${isOwner?"rounded-bl-3xl":"rounded-br-3xl "} flex flex-col relative`}
    style={isOwner?{backgroundColor:theme.dark, color:theme.pastel, alignSelf:"flex-end"}:{border:`2px solid ${theme.dark}`,alignSelf:"flex-start"}}
    >
        <b className="text-xs font-mono w-auto " style={isOwner?{alignSelf:"flex-end" ,}:{alignSelf:"flex-start",color:getSenderColor(data?.senderName)}}>{isOwner?`Me`:`${data?.senderName||"User"}`}</b>
        <span className={`w-auto h-auto self-start text-xs`} style={isOwner?{alignSelf:"flex-end"}:{alignSelf:"flex-start"}}>{data.message}</span>
    </div>



  )
}
export default SingleMessage