import { useSelector } from "react-redux"
import imgSrc from "../../assets/images/sampleTrip-img.jpg"
import { MdGroup } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";

import { FaCircle } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { useState } from "react";

const MyTripsCard = ({ data }) => {

  const { theme } = useSelector(s => s.theme)
  const [showStats, setShowStats] = useState(false);

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <div className="myTrip-card-body w-[95%] max-w-150 h-90  rounded-md overflow-hidden relative" style={{ backgroundColor: theme.pastel, }}>
      <div className="h-full" style={showStats?{display:"none"}:{display:"block"}}>
        <img src={imgSrc} className="myTrip-card-img h-[50%] w-full bg-slate-200 object-cover"></img>

        <section className="pl-3 pr-3 h-[50%] relative flex items-center flex-col gap-1 justify-evenly">
          <span className="w-15 items-center justify-between flex absolute top-2 right-2 text-sm">{data.status ? "Active:" : "Close"} <FaCircle className={data.status ? "text-green-500" : "text-red-500"} /></span>

          <div className="w-auto self-start flex flex-col" style={{ color: theme.dark }}>
            <span className="text-lg" style={{ color: theme.dark }}>{data.title}</span>
            <span className="text-xs m-0">{data.destination.destination}</span>
          </div>


          <div className="flex justify-between text-sm w-full pl-2 " style={{ color: theme.primary }}>
            <span className=" text-xs flex justify-evenly items-center gap-2"><CiCalendarDate className=" scale-200" />{formatDate(data.duration.start)} - {formatDate(data.duration.end)} </span>
            <span className="flex  items-center w-10 justify-evenly"><MdGroup className=" scale-150" />{data.approvedUser.length}</span>
          </div>

          <div className=" max-h-14 h-auto p-0.5 w-full overflow-clip text-[12px] font-light">{data.description}</div>

          {/* <div className="flex h-6 w-full justify-between">
            <button className=" h-full w-20 rounded-md bg-blue-500 text-white text-sm">EDIT</button>
            <button className=" h-full w-20 rounded-md bg-red-500 text-white text-sm">DELETE</button>
          </div> */}

          <button className="w-full h-10 rounded-md text-white" style={{ backgroundColor: theme.primary, }} onClick={()=>setShowStats(true)}>See Stats</button>
        </section>
      </div>

      {/* =============show stats section============================= */}

      <div className="h-full w-full bg-amber-200">
        satts
      </div>

      <span className=" h-10 w-10 flex justify-center items-center bg-white absolute top-0 left-0"
      onClick={()=>setShowStats(false)}
      style={showStats?{display:"flex"}:{display:"none"}}
      >
        <FaArrowCircleRight className="h-6 w-6 rotate-180" />
      </span>

    </div>
  )
}
export default MyTripsCard