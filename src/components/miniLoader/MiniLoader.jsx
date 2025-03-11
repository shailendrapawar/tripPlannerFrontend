import "./miniLoader.css"
const MiniLoader = ({value}) => {
    return (
        <div className=" justify-center items-center space-x-2 h-5 w-10" style={value?{display:"flex"}:{display:"none"}}>
            <div className="circle-loader"></div>
            <div className="circle-loader animation-delay-150"></div>
            <div className="circle-loader animation-delay-300"></div>
        </div>
    )
}
export default MiniLoader