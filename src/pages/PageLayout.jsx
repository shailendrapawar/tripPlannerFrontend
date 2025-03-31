import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar/Navbar"
import useGetAuthUserTrips from "../hooks/useGetAuthUserTrips"
import useGetAllTrips from "../hooks/useGetAllTrips"
import useGetAllConversations from "../hooks/useGetAllConversations"
const PageLayout = () => {

  // useGetAuthUserTrips()
  // useGetAllTrips()
  useGetAllConversations()
  
  return (
    <div className="h-full ">
      <Navbar/>
        <Outlet/>
    </div>
  )
}
export default PageLayout