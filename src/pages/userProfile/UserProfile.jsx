import { useSelector } from "react-redux"
import { IoIosRemoveCircle } from "react-icons/io";
import { IoMdAddCircle } from "react-icons/io";
import avatarImg from "../../assets/images/user-avatar.png"
import  "./userProfile.css"
import { Link, Outlet, useNavigate } from "react-router-dom";

const UserProfile = () => {

    const { authUser } = useSelector(state => state.user)
    const{theme}=useSelector(state=>state.theme)
    const userAvatar = authUser?.avatar || avatarImg
    console.log(authUser)

    const navigate=useNavigate()
    // const postPageRef=useRef()
    
    return (
        <div className="userProfile-body h-auto">

            <section className="h-auto user-data" style={{backgroundColor:theme.pastel}}>
                <div className=" flex flex-col justify-center items-center gap-0 p-8 " >

                    <img src={userAvatar} className="w-30 h-30 rounded-full bg-slate-200 p-1.5" style={{border:`3px solid ${theme.primary}`}}></img>
                    <div className="w-20 flex justify-between">
                        <IoMdAddCircle className="h-6 w-6" />
                        <IoIosRemoveCircle className="h-6 w-6" />
                    </div>
                </div>


                <div className="user-details p-2 gap-2 flex flex-col" >
                    <h1 className="h-8 text-lg font-bold text-center">{authUser?.name || "username"}</h1>

                    <div className="bg-white  text-center text-xs p-2 relative h-10"> <span className="absolute top-0.5 left-1 text-[8px] text-slate-500">BIO:</span>~ {authUser?.bio || "user bio"}</div>
                    <section className="flex gap-1 text-xs">
                        <div className="bg-white w-[50%] h-10 flex items-center justify-center relative"><span className="absolute top-0.5 left-1 text-[8px] text-slate-500">Mobile No:</span> {authUser?.mobileNo||"user mobile number"}</div>
                        <div className="bg-white w-[50%] h-10 flex items-center justify-center relative"> <span className="absolute top-0.5 left-1 text-[8px] text-slate-500">Email:</span>{authUser?.email||"user email"}</div>
                    </section>
                    <div className="h-8 flex justify-center">
                        <button onClick={()=>navigate("/user/editProfile")} className="h-8 w-25 rounded text-sm cursor-pointer" style={{background:theme.primary,color:"white"}}>Edit -Profile</button> 
                    </div>
                </div>
            </section>


            <section className="user-review flex justify-center" style={{backgroundColor:theme.pastel}}>
                <div className="w-[90%] max-w-[600px]">
                    
                </div>
            </section>


            

        </div>
    )
}
export default UserProfile