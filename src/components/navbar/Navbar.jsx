import { useLayoutEffect, useRef, useState } from "react";
import { } from "react-dom"
import { RiMenuFold2Fill } from "react-icons/ri";
import { RiMenuFoldFill } from "react-icons/ri";

import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import "./navbar.css"

const Navbar = () => {
    const { theme } = useSelector(state => state.theme)
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate()

    return (
        <nav className=" h-18 flex justify-between items-center pl-5 pr-5 relative cursor-pointer" style={{ backgroundColor: theme.dark }}>
            
            <h1 onClick={() => {
                setVisible(false)
                navigate("/user/")
            }}>PackPals</h1>

    
{/* ================mobile navigation=========================== */}
            <nav className=" mobile-nav z-10">
                {visible ? <RiMenuFoldFill onClick={() => setVisible(!visible)} className=" h-8 w-8" style={{ color: theme.pastel }} /> : <RiMenuFold2Fill onClick={() => setVisible(!visible)} className=" h-8 w-8" style={{ color: theme.pastel }} />}
                <section onClick={() => setVisible(false)} className="absolute top-18 right-0 w-50 h-auto p-2 flex-col justify-center items-center gap-5" style={visible ? { backgroundColor: theme.dark, display: "flex", color: theme.pastel } : { display: "none" }}>
                    <NavLink to={"/user/explore"} className={`w-[70%] text-center`}>EXPLORE</NavLink>
                    <NavLink to={"/user/planTrip"} className={"w-[70%] text-center"}>PLAN TRIP</NavLink>
                    <NavLink to={"/user/myTrips"} className={"w-[70%] text-center"}>My Trips</NavLink>
                    <NavLink to={"/user/notification"} className={"w-[70%] text-center"}>NOTIFY</NavLink>
                    <NavLink to={"/user/userProfile"} className={"w-[70%] text-center"}>USER PROFILE</NavLink>
                </section>
            </nav>


{/* ================web naviagteion========================= */}
            <nav className=" web-nav w-[80%] h-6 flex justify-between" style={{color:theme.pastel}}>
                <section className="w-[80%] flex  justify-evenly" >
                    <NavLink to={"/user/explore"} className={`w-[20%] text-center text-sm`}>EXPLORE</NavLink>
                    <NavLink to={"/user/planTrip"} className={`w-[20%] text-center text-sm`}>PLAN TRIP</NavLink>
                    <NavLink to={"/user/myTrips"} className={"w-[20%] text-center text-sm"}>My Trips</NavLink>
                    <NavLink to={"/user/notification"} className={`w-[20%] text-center text-sm`}>NOTIFY</NavLink>
                </section>

                <FaUserCircle onClick={() => {
                    setVisible(false)
                    navigate("/user/userProfile")
                }} className="h-6 w-6" />
            </nav>

        </nav>
    )
}
export default Navbar