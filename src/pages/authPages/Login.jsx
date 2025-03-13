import { useDispatch, useSelector } from "react-redux"
import { setAuthUser,setUserNotifications } from "../../store/slice/userSlice"
import logoImg from "../../assets/images/packPals-icon.jpg"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"

const Login = () => {
  const { theme } = useSelector(state => state.theme)

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // ==========form state for login=================
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  
  const handleChange = (e) => {
    // console.log(e.target.name)
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }



  const handleLogin = async () => {
    if (formData.email === "" || formData.password === "") {
      toast.error("Enter all fields")
      return
    }
    if (loading === true) {
      // toast.error("request already in processing")
      return
    }
    setLoading(true)

    
    try {
      axios.defaults.withCredentials = true;
      const isLoggedIn = await axios.post(import.meta.env.VITE_API_URL + "/auth/login", formData, {
        withCredentials: true
      })
      
      if (isLoggedIn) {
        // console.log(isLoggedIn)
        dispatch(setAuthUser(isLoggedIn.data.user))
        toast.success(isLoggedIn.data.msg)
        setTimeout(() => {
          navigate("/user/")
        }, 1000);
      }

    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.msg || "something went wrong")
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="login-body h-screen flex justify-center items-center">

      <section className={`h-[500px] w-[90%] max-w-[500px] flex flex-col justify-center items-center gap-5 rounded-md`} style={{ backgroundColor: theme.pastel }}>
        <img src={logoImg} className="h-35 w-35 rounded-full p-0.5" style={{ backgroundColor: theme.primary }}></img>

        <div className="w-[90%] max-w-80 h-35 flex flex-col gap-2 relative">
          <input type="email" required value={formData.email} onChange={(e) => handleChange(e)} name="email" placeholder="enter email" className="h-10 bg-white pl-1 pr-1 text-sm outline-none"></input>
          <input type="password" required value={formData.password} onChange={(e) => handleChange(e)} name="password" placeholder="enter password" className="h-10 bg-white pl-1 pr-1 text-sm outline-none"></input>

          <button onClick={handleLogin} className=" w-25 h-8 rounded-md self-end absolute bottom-0 cursor-pointer" style={loading ? { backgroundColor: theme.light, cursor: "not-allowed" } : { backgroundColor: theme.primary, color: theme.pastel }}>{loading ? "Loading..." : "Log in"}</button>
        </div>

        <Link to={"/register"} className="text-blue-500 underline text-sm">new user? Register here</Link>
      </section>

    </div>
  )
}
export default Login