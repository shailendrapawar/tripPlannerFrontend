import { useSelector } from "react-redux"

const SingleMessage = ({data}) => {
    // console.log(data)
    const{theme}=useSelector(s=>s.theme)
    const {authUser}=useSelector(s=>s.user)

    const isOwner=authUser._id===data?.senderId;
    // console.log(isOwner)
  return (
    <div className="h-auto bg-green-200 self-start w-auto max-w-1/2 p-1 rounded-md flex flex-col gap-1" 
    style={isOwner?{backgroundColor:theme.dark, color:theme.pastel, alignSelf:"flex-end"}:{backgroundColor:theme.light,alignSelf:"flex-start"}}
    >
        <b className="text-xs w-auto " style={isOwner?{alignSelf:"flex-end"}:{alignSelf:"flex-start"}}>{isOwner?`Me`:`${data?.senderId?.name}`}</b>
        <span className="w-auto h-auto self-start text-xs">{data.message}</span>
    </div>
  )
}
export default SingleMessage