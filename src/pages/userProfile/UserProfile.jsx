import { useSelector } from "react-redux"
import { IoIosRemoveCircle, IoMdAddCircle } from "react-icons/io"
import avatarImg from "../../assets/images/user-avatar.png"
import { useNavigate } from "react-router-dom"

const UserProfile = () => {
    const { authUser } = useSelector(state => state.user)
    const { theme } = useSelector(state => state.theme)
    const userAvatar = authUser?.avatar || avatarImg
    const navigate = useNavigate()

    return (
        <div className="min-h-screen w-full">
            {/* Profile Section */}
            <section 
                className="w-full pt-8 pb-8 px-4"
                style={{ backgroundColor: theme.pastel }}
            >
                <div className="max-w-md mx-auto flex flex-col items-center gap-4">
                    {/* Avatar with Edit Buttons */}
                    <div className="flex flex-col items-center gap-2">
                        <img 
                            src={userAvatar} 
                            alt="User avatar"
                            className="w-32 h-32 rounded-full object-cover border-4 bg-gray-100 p-1"
                            style={{ borderColor: theme.primary }}
                        />
                        <div className="flex gap-4">
                            <IoMdAddCircle 
                                className="h-6 w-6 cursor-pointer hover:opacity-80" 
                                style={{ color: theme.primary }}
                            />
                            <IoIosRemoveCircle 
                                className="h-6 w-6 cursor-pointer hover:opacity-80" 
                                style={{ color: theme.primary }}
                            />
                        </div>
                    </div>

                    {/* User Details */}
                    <div className="w-full space-y-3">
                        <h1 className="text-2xl font-bold text-center">
                            {authUser?.name || "Username"}
                        </h1>

                        {/* Bio */}
                        <div className="bg-white rounded-lg p-3 relative">
                            <span className="absolute -top-2 left-2 px-1 text-xs bg-white text-gray-500">
                                BIO
                            </span>
                            <p className="text-center text-sm">
                                {authUser?.bio || "User bio"}
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="flex gap-3">
                            <div className="bg-white rounded-lg p-3 flex-1 relative">
                                <span className="absolute -top-2 left-2 px-1 text-xs bg-white text-gray-500">
                                    Mobile No
                                </span>
                                <p className="text-center text-sm">
                                    {authUser?.mobileNo || "Not provided"}
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-3 flex-1 relative">
                                <span className="absolute -top-2 left-2 px-1 text-xs bg-white text-gray-500">
                                    Email
                                </span>
                                <p className="text-center text-sm">
                                    {authUser?.email || "user@example.com"}
                                </p>
                            </div>
                        </div>

                        {/* Edit Button */}
                        <button 
                            onClick={() => navigate("/user/editProfile")}
                            className="w-full py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                            style={{ 
                                backgroundColor: theme.primary, 
                                color: "white" 
                            }}
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </section>

            {/* Hosted Trips Section */}
            <section className="w-full py-6 px-4 max-w-4xl mx-auto">
                <h1 
                    className="text-2xl font-bold mb-6 text-center"
                    style={{ color: theme.dark }}
                >
                    Your Hosted Trips
                </h1>
                
                {/* Trip cards would go here */}
                <div className="text-center text-gray-500">
                    No trips hosted yet
                </div>
            </section>
        </div>
    )
}

export default UserProfile