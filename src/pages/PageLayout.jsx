import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar/Navbar"
import useGetAuthUserTrips from "../hooks/useGetAuthUserTrips"
const PageLayout = () => {

  useGetAuthUserTrips()
  
  return (
    <div className="h-full ">
      <Navbar/>
        <Outlet/>
    </div>
  )
}
export default PageLayout