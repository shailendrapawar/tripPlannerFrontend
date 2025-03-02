import { Outlet } from "react-router-dom"

const PageLayout = () => {
  return (
    <div className="h-full ">
        <Outlet/>
    </div>
  )
}
export default PageLayout