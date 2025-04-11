import { useState } from "react"

const EditProfile = () => {
  const [userData,setUserData]=useState({
    name:"",
    email:"",
    bio:""
  })
  return (
    <div className="h-[90%] bg-green-200 flex items-center justify-center">

      <section className="w-full h-100 max-w-150 bg-white">
        
        <input type="text" value={userData.name}></input>
        <input type="text" value={userData.bio}></input>

      </section>

    </div>
  )
}
export default EditProfile