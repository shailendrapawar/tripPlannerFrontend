import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar/Navbar"
import useGetAuthUserTrips from "../hooks/useGetAuthUserTrips"
import useGetAllTrips from "../hooks/useGetAllTrips"
import useGetAllConversations from "../hooks/useGetAllConversations"
import {io} from "socket.io-client"
import { useDispatch, useSelector } from "react-redux"
import { setSocket } from "../store/slice/socketSlice"
import { useEffect } from "react"

const PageLayout = () => {

  const dispatch=useDispatch();
  const{authUser}=useSelector(s=>s.user);

  // useGetAuthUserTrips()
  // useGetAllTrips()
  useGetAllConversations()


  useEffect(()=>{
    // ======return if user dosent exist=========
    if(!authUser){
      return
    }

    const socket=io(import.meta.env.VITE_API_URL,{
      query:{
        userId:12345
      }
    })

    if(socket){
      dispatch(setSocket(socket));
    }
    // console.log(socket)

    return ()=>{
      socket.close();
    }
    
  },[])
  
  return (
    <div className="h-full ">
      <Navbar/>
        <Outlet/>
    </div>
  )
}
export default PageLayout