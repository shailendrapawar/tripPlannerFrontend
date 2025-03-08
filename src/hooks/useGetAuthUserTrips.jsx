import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useEffect, useState } from "react"
import { setUserHostedTrips } from "../store/slice/userSlice"
import toast from "react-hot-toast"

const useGetAuthUserTrips = () => {

    const dispatch=useDispatch()
    const { authUser } = useSelector(state => state.user)
    
    useEffect(() => {
        const getUserTrips = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(import.meta.env.VITE_API_URL + `/trip/getUserHostedTrips`)
                
                if(res){
                //    console.log(res.data.trips)
                   dispatch(setUserHostedTrips(res.data.trips))
                }
            } catch (err) {
                console.log(err)
            }
        }
        getUserTrips();
    }, [])

}
export default useGetAuthUserTrips