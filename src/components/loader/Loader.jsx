const Loader = ({value}) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative w-24 h-24">
        {/* Circular Progress Animation */}
        <div className="absolute inset-0 w-full h-full border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>

        {/* Center Text */}
        <div className="absolute inset-0 flex justify-center items-center">
          <span className="text-gray-700 font-bold">Loading</span>
        </div>
      </div>
    </div>
  )
}
export default Loader