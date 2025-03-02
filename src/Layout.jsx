import "./index.css"
import { Toaster, toast } from "react-hot-toast"
import { Outlet } from "react-router-dom"
const Layout = () => {
  return (
    <>
      <div className="layout-body">
        <Outlet />
        <Toaster />
      </div>
     
    </>
  )
}
export default Layout