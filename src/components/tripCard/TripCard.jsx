import { useSelector } from "react-redux"
import sampleImgSrc from "../../assets/images/sampleTrip-img.jpg"
import smapleAvatarSrc from "../../assets/images/user-avatar.png"
import { useNavigate } from "react-router-dom"
const TripCard = ({ data }) => {

  console.log(data)
  const { theme } = useSelector(s => s.theme)

  const navigate = useNavigate()


  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  };


  return (

    <div className="w-[100%] max-w-[600px] min-w-[300px] rounded-2xl overflow-hidden shadow-lg bg-white cursor-pointer">
      {/* Trip Image */}
      <img
        className="w-full h-48 object-cover"
        src={data.tripImg ? `${data.tripImg}` : `${sampleImgSrc}`}
        alt="Trip Destination"
      />

      {/* Trip Details */}
      <div className="p-4 relative">
        <h2 className="text-lg w-[70%] font-semibold" style={{ color: theme.dark }}>{data.title}</h2>
        <p className="text-gray-600 text-xs mt-1" style={{ color: theme.primary }}>📅 {formatDate(data.duration.start)} - {formatDate(data.duration.end)}</p>
        <p className=" text-sm mt-2  h-10  text-ellipsis overflow-hidden break-words" style={{ color: theme.primary }}>
          {data.description}
        </p>
        <b className="absolute top-4 right-4 text-red-500">₹ {data.budget}</b>

        {/* Host Info */}
        <div className={`flex h-13 items-center justify-start gap-3 mt-4 pl-2 rounded-xs hover:shadow-xs shadow-black active:shadow-none`} style={{ backgroundColor: theme.pastel }}
          onClick={() => navigate(`/user/userPublicProfile/${data.host._id}`)}

        >
          <img
            className="w-10 h-10 rounded-full object-contain p-1 bg-white"
            src={data.tripImg ? `${data.tripImg}` : `${smapleAvatarSrc}`}
            alt="Host"
          />
          <span className=" " style={{ color: theme.dark }}
          >Hosted by {data.host.name}</span>
        </div>

        <div className="h-10 mt-4 flex justify-end">
          <button className="w-25 h-full  py-2 rounded-lg transition shadow-md shadow-black active:shadow-none" style={{ backgroundColor: theme.primary, color: theme.pastel }}>
            REQUEST
          </button>
        </div>


      </div>
    </div>
  )
}
export default TripCard