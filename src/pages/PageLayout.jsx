import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar/Navbar"

const PageLayout = () => {
  return (
    <div className="h-full ">
      <Navbar/>
        <Outlet/>
    </div>
  )
}
export default PageLayout