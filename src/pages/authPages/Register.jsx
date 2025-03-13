import { useSelector } from "react-redux"
import logoImg from "../../assets/images/packPals-icon.jpg"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"


const Register = () => {
  const{theme}=useSelector(state=>state.theme)

  const[loading,setLoading]=useState(false)
  const navigate=useNavigate()
  //=======handling form data==================
  const [formData,setFormdata]=useState({
    name:"",
    email:"",
    password:"",
    gender:"",
    dob:""
  })
  const handleChange=(e)=>{
    const{name,value}=e.target
    // console.log(name)
    setFormdata((prev)=>(
      {
        ...prev,
        [name]:value
      }
    ))
  }



  //=======handle login====================
  const handleRegister=async()=>{
    if(formData.name===""||formData.email===""||formData.password===""|| formData.gender==""|| formData.dob==""){
      toast.error("Enter all fields")
      return 
    }
    if(loading===true){
      return
    }
    setLoading(true)

    try{
      const isRegister=await axios.post(import.meta.env.VITE_API_URL+"/auth/register",formData,{
        withCredentials:true
      })
      
      if(isRegister){
        toast.success(isRegister.data.msg)
        setTimeout(() => {
          navigate("/")
        }, 1000);
      }
      
    }catch(err){
      console.log(err)
      toast.error(err?.response?.data?.msg||"something went wrong")
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="register-body h-screen flex justify-center items-center">

      <section className={`h-[500px] w-[90%] max-w-[500px] flex flex-col justify-center items-center gap-5 rounded-md`} style={{backgroundColor:theme.pastel}}>
        <img src={logoImg} className="h-35 w-35 rounded-full p-0.5" style={{backgroundColor:theme.primary}}></img>

        <div className="w-[90%] max-w-80 h-55 flex flex-col gap-2 relative">
          <input type="text" value={formData.name} onChange={(e)=>handleChange(e)} name="name" placeholder="enter name" className="h-10 bg-white pl-1 pr-1 text-sm outline-none"></input>
          <input type="email" value={formData.email} onChange={(e)=>handleChange(e)} name="email" placeholder="enter email" className="h-10 bg-white pl-1 pr-1 text-sm outline-none"></input>
          <input type="password" value={formData.password} onChange={(e)=>handleChange(e)} name="password" placeholder="enter password" className="h-10 bg-white pl-1 pr-1 text-sm outline-none"></input>

          

          <section className="flex justify-evenly h-6 ">
            <select value={formData.gender} onChange={(e)=>handleChange(e)} name="gender" className="w-30 rounded-xl text-center text-xs cursor-pointer outline-none" style={{backgroundColor:theme.primary, color:theme.pastel}}>
              <option value={""}>select gender</option>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
              <option value={"other"}>Other</option>
            </select>

            <input type="date" value={formData.dob} onChange={(e)=>handleChange(e)} name="dob" className="text-xs w-30 pl-2 pr-2 rounded-xl text-sm outline-none cursor-pointer " style={{backgroundColor:theme.primary,color:theme.pastel}}></input>
          </section>

          <button onClick={()=>handleRegister()} className=" w-25 h-8 rounded-md self-end absolute bottom-0" style={loading?{backgroundColor:theme.light,cursor:"not-allowed"}:{backgroundColor:theme.primary,color:theme.pastel}}>{loading?"Loading...":"Register"}</button>
        </div>
        <Link to={"/"} className="text-blue-500 underline text-sm">already a user? Login here</Link>
      </section>
      
    </div>
  )
}
export default Register