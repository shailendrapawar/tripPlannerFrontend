import { useSelector } from "react-redux"
import logoImg from "../../assets/images/packPals-icon.jpg"
import { Link } from "react-router-dom"
const Login = () => {
  const{theme}=useSelector(state=>state.theme)
console.log(theme)
  return (
    <div className="login-body h-screen flex justify-center items-center">

      <section className={`h-[500px] w-[90%] max-w-[500px] flex flex-col justify-center items-center gap-5 rounded-md`} style={{backgroundColor:theme.pastel}}>
        <img src={logoImg} className="h-35 w-35 rounded-full p-0.5" style={{backgroundColor:theme.primary}}></img>

        <div className="w-[90%] max-w-80 h-55 flex flex-col gap-2 relative">
          <input type="text" placeholder="enter name" className="h-10 bg-white pl-1 pr-1 text-sm outline-none"></input>
          <input type="text" placeholder="enter email" className="h-10 bg-white pl-1 pr-1 text-sm outline-none"></input>
          <input type="text" placeholder="enter password" className="h-10 bg-white pl-1 pr-1 text-sm outline-none"></input>

          <section className="flex justify-evenly h-6 ">
            <select className="w-30 rounded-xl text-center text-xs cursor-pointer outline-none" style={{backgroundColor:theme.primary, color:theme.pastel}}>
              <option>select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input type="date" className="text-xs w-30 pl-2 pr-2 rounded-xl text-sm outline-none cursor-pointer " style={{backgroundColor:theme.primary,color:theme.pastel}}></input>
          </section>

          <button className=" w-25 h-8 rounded-md self-end absolute bottom-0" style={{backgroundColor:theme.primary,color:theme.pastel}}>Register</button>

        </div>

        <Link to={"/register"} className="text-blue-500 underline text-sm">new user? Register here</Link>
      </section>
      
    </div>
  )
}
export default Login